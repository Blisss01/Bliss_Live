
const WORKER_URL = "https://bliss-blog-api.blisschocolate01.workers.dev/";

const loginScreen = document.getElementById("login-screen");
const dashboard = document.getElementById("dashboard");
const passwordInput = document.getElementById("password");
const loginMessage = document.getElementById("login-message");

let adminPassword = "";

async function apiRequest(payload) {
  const response = await fetch(WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(payload)
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || "Something went wrong.");
  }

  return result;
}

// Secure login: password is verified by Cloudflare Worker.
document.getElementById("login-btn").addEventListener("click", async () => {
  const password = passwordInput.value.trim();

  if (!password) {
    loginMessage.textContent = "Please enter your password.";
    return;
  }

  const loginButton = document.getElementById("login-btn");
  loginButton.disabled = true;
  loginMessage.textContent = "Verifying password...";

  try {
    await apiRequest({
      action: "login",
      password
    });

    adminPassword = password;
    loginScreen.hidden = true;
    dashboard.hidden = false;
    loginMessage.textContent = "";

  } catch (error) {
    adminPassword = "";
    loginMessage.textContent = "Login failed: " + error.message;

  } finally {
    loginButton.disabled = false;
  }
});

// Logout
document.getElementById("logout-btn").addEventListener("click", () => {
  adminPassword = "";
  dashboard.hidden = true;
  loginScreen.hidden = false;
  passwordInput.value = "";
  document.getElementById("blog-form").reset();
  document.getElementById("status-message").textContent = "";
});

// Automatic URL slug
const titleInput = document.getElementById("title");
const slugInput = document.getElementById("slug");

titleInput.addEventListener("input", () => {
  slugInput.value = titleInput.value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
});

// Blog data
function getBlogData(status) {
  return {
    title: titleInput.value.trim(),
    slug: slugInput.value.trim(),
    category: document.getElementById("category").value,
    excerpt: document.getElementById("excerpt").value.trim(),
    content: document.getElementById("content").value.trim(),
    seoTitle: document.getElementById("seo-title").value.trim(),
    metaDescription: document.getElementById("meta-description").value.trim(),
    status,
    publishedAt: new Date().toISOString()
  };
}

// Publish or save draft
async function publishBlog(status) {
  const form = document.getElementById("blog-form");
  const message = document.getElementById("status-message");
  const publishButton = document.getElementById("publish-btn");
  const draftButton = document.getElementById("draft-btn");

  if (!form.reportValidity()) return;

  const file = document.getElementById("image").files[0];

  if (!file) {
    message.textContent = "Please select a featured image.";
    return;
  }

  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    message.textContent = "Only JPG, PNG and WebP images are supported.";
    return;
  }

  if (file.size > 4 * 1024 * 1024) {
    message.textContent = "Image must be smaller than 4 MB.";
    return;
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slugInput.value)) {
    message.textContent = "Use a valid URL slug.";
    return;
  }

  publishButton.disabled = true;
  draftButton.disabled = true;
  message.textContent = status === "published"
    ? "Publishing... Please wait."
    : "Saving draft... Please wait.";

  try {
    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = () => reject(new Error("Could not read image."));
      reader.readAsDataURL(file);
    });

    await apiRequest({
      password: adminPassword,
      action: "publish",
      blog: getBlogData(status),
      image: {
        name: file.name,
        type: file.type,
        data: base64
      }
    });

    message.textContent = status === "published"
      ? "Blog sent to GitHub! Website deployment will start automatically."
      : "Draft saved to GitHub!";

    form.reset();

  } catch (error) {
    message.textContent = "Error: " + error.message;

  } finally {
    publishButton.disabled = false;
    draftButton.disabled = false;
  }
}

// Publish button
document.getElementById("blog-form").addEventListener("submit", event => {
  event.preventDefault();
  publishBlog("published");
});

// Save draft button
document.getElementById("draft-btn").addEventListener("click", () => {
  publishBlog("draft");
});
