
const WORKER_URL = "https://bliss-blog-api.blisschocolate01.workers.dev/";

const loginScreen = document.getElementById("login-screen");
const dashboard = document.getElementById("dashboard");
const passwordInput = document.getElementById("password");
const loginMessage = document.getElementById("login-message");

const form = document.getElementById("blog-form");
const titleInput = document.getElementById("title");
const slugInput = document.getElementById("slug");
const imageInput = document.getElementById("image");

let adminPassword = "";
let editingSlug = null;
let editingImage = "";
let editingDate = "";

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

// Escape blog text before displaying it.
function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

// LOGIN
document.getElementById("login-btn").addEventListener("click", async () => {
  const password = passwordInput.value.trim();

  if (!password) {
    loginMessage.textContent = "Please enter your password.";
    return;
  }

  const button = document.getElementById("login-btn");
  button.disabled = true;
  loginMessage.textContent = "Verifying...";

  try {
    await apiRequest({ action: "login", password });

    adminPassword = password;
    loginScreen.hidden = true;
    dashboard.hidden = false;
    loginMessage.textContent = "";

    await loadBlogs();

  } catch (error) {
    loginMessage.textContent = "Login failed: " + error.message;
  } finally {
    button.disabled = false;
  }
});

// LOGOUT
document.getElementById("logout-btn").addEventListener("click", () => {
  adminPassword = "";
  dashboard.hidden = true;
  loginScreen.hidden = false;
  passwordInput.value = "";
  resetForm();
});

// AUTO SLUG
titleInput.addEventListener("input", () => {
  if (editingSlug) return;

  slugInput.value = titleInput.value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
});

// LOAD ALL BLOGS
async function loadBlogs() {
  const list = document.getElementById("blogs-list");
  const message = document.getElementById("manage-message");

  list.innerHTML = "<p>Loading blogs...</p>";
  message.textContent = "";

  try {
    const result = await apiRequest({
      action: "list",
      password: adminPassword
    });

    const blogs = result.blogs || [];

    if (blogs.length === 0) {
      list.innerHTML = "<p>No blogs found. Create your first blog!</p>";
      return;
    }

    list.innerHTML = blogs.map(blog => `
      <div class="blog-item" style="border:1px solid #ddd;padding:15px;margin:12px 0;border-radius:8px;">
        <h3>${escapeHTML(blog.title)}</h3>
        <p>Category: ${escapeHTML(blog.category)}</p>
        <p>Status: <strong>${escapeHTML(blog.status)}</strong></p>
        <p>Slug: ${escapeHTML(blog.slug)}</p>
        <button type="button" data-edit="${escapeHTML(blog.slug)}">Edit</button>
        <button type="button" data-delete="${escapeHTML(blog.slug)}" class="secondary">Delete</button>
      </div>
    `).join("");

    // Attach edit and delete actions.
    list.querySelectorAll("[data-edit]").forEach(button => {
      button.addEventListener("click", () => {
        const blog = blogs.find(item => item.slug === button.dataset.edit);
        if (blog) editBlog(blog);
      });
    });

    list.querySelectorAll("[data-delete]").forEach(button => {
      button.addEventListener("click", () => {
        deleteBlog(button.dataset.delete);
      });
    });

  } catch (error) {
    list.innerHTML = "<p>Could not load blogs.</p>";
    message.textContent = "Error: " + error.message;
  }
}

// REFRESH
document.getElementById("refresh-blogs-btn").addEventListener("click", loadBlogs);

// EDIT BLOG
function editBlog(blog) {
  editingSlug = blog.slug;
  editingImage = blog.image || "";
  editingDate = blog.publishedAt || "";

  document.getElementById("form-heading").textContent = "Edit Blog";

  titleInput.value = blog.title || "";
  slugInput.value = blog.slug || "";
  slugInput.readOnly = true;

  document.getElementById("category").value = blog.category || "";
  document.getElementById("excerpt").value = blog.excerpt || "";
  document.getElementById("content").value = blog.content || "";
  document.getElementById("seo-title").value = blog.seoTitle || "";
  document.getElementById("meta-description").value = blog.metaDescription || "";

  imageInput.value = "";
  imageInput.required = false;

  document.getElementById("status-message").textContent =
    "Editing blog. Select a new image only if you want to replace the old one.";

  document.getElementById("publish-btn").textContent =
    blog.status === "published" ? "Update Blog" : "Publish Blog";

  document.getElementById("draft-btn").textContent = "Save Draft";

  form.scrollIntoView({ behavior: "smooth" });
}

// RESET FORM
function resetForm() {
  form.reset();

  editingSlug = null;
  editingImage = "";
  editingDate = "";

  slugInput.readOnly = false;
  imageInput.required = true;

  document.getElementById("form-heading").textContent = "Create New Blog";
  document.getElementById("publish-btn").textContent = "Publish Blog";
  document.getElementById("draft-btn").textContent = "Save Draft";
  document.getElementById("status-message").textContent = "";
}

// DELETE BLOG
async function deleteBlog(slug) {
  if (!confirm("Are you sure you want to delete this blog?")) return;

  const message = document.getElementById("manage-message");
  message.textContent = "Deleting blog...";

  try {
    await apiRequest({
      action: "delete",
      password: adminPassword,
      slug
    });

    message.textContent = "Blog deleted successfully!";
    if (editingSlug === slug) resetForm();

    await loadBlogs();

  } catch (error) {
    message.textContent = "Delete failed: " + error.message;
  }
}

// BLOG DATA
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
    publishedAt: editingDate || new Date().toISOString(),
    image: editingImage
  };
}

// PUBLISH OR UPDATE
async function publishBlog(status) {
  const message = document.getElementById("status-message");
  const publishButton = document.getElementById("publish-btn");
  const draftButton = document.getElementById("draft-btn");

  if (!form.reportValidity()) return;

  const file = imageInput.files[0];

  if (!editingSlug && !file) {
    message.textContent = "Please select a featured image.";
    return;
  }

  if (file && !["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    message.textContent = "Only JPG, PNG and WebP images are supported.";
    return;
  }

  if (file && file.size > 4 * 1024 * 1024) {
    message.textContent = "Image must be smaller than 4 MB.";
    return;
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slugInput.value)) {
    message.textContent = "Use a valid URL slug.";
    return;
  }

  publishButton.disabled = true;
  draftButton.disabled = true;
  message.textContent = status === "published" ? "Publishing..." : "Saving draft...";

  try {
    let image = null;

    if (file) {
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = () => reject(new Error("Could not read image."));
        reader.readAsDataURL(file);
      });

      image = {
        name: file.name,
        type: file.type,
        data: base64
      };
    }

    await apiRequest({
      password: adminPassword,
      action: "publish",
      blog: getBlogData(status),
      image
    });

    message.textContent = "Blog saved successfully!";
    resetForm();
    await loadBlogs();

  } catch (error) {
    message.textContent = "Error: " + error.message;
  } finally {
    publishButton.disabled = false;
    draftButton.disabled = false;
  }
}

// FORM SUBMIT
form.addEventListener("submit", event => {
  event.preventDefault();
  publishBlog("published");
});

// SAVE DRAFT
document.getElementById("draft-btn").addEventListener("click", () => {
  publishBlog("draft");
});
