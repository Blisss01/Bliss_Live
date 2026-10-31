
const categories = [
  "All",
  "Chocolate Gifts",
  "Chocolate Recipes",
  "Chocolate Benefits",
  "Birthday & Anniversary",
  "Chocolate Guides",
  "Festival Specials"
];

let blogs = [];
let selectedCategory = "All";

const categoryContainer = document.getElementById("categories");
const blogGrid = document.getElementById("blog-grid");

function renderCategories() {
  categoryContainer.innerHTML = "";

  categories.forEach(category => {
    const count = category === "All"
      ? blogs.length
      : blogs.filter(b => b.category === category).length;

    const button = document.createElement("button");
    button.className = "category-btn";
    button.textContent = `${category === "All" ? "All Blogs" : category} (${count})`;

    if (category === selectedCategory) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      selectedCategory = category;
      renderCategories();
      renderBlogs();
    });

    categoryContainer.appendChild(button);
  });
}

function renderBlogs() {
  const filtered = selectedCategory === "All"
    ? blogs
    : blogs.filter(b => b.category === selectedCategory);

  document.getElementById("blog-count").textContent =
    `${filtered.length} Articles`;

  document.getElementById("empty").hidden = filtered.length !== 0;

  blogGrid.innerHTML = "";

  filtered.forEach(blog => {
    const card = document.createElement("article");
    card.className = "blog-card";

    const image = document.createElement("img");
    image.src = blog.image;
    image.alt = blog.title;
    image.loading = "lazy";

    const content = document.createElement("div");
    content.className = "card-content";

    const category = document.createElement("span");
    category.className = "card-category";
    category.textContent = blog.category;

    const title = document.createElement("h3");
    title.textContent = blog.title;

    const excerpt = document.createElement("p");
    excerpt.textContent = blog.excerpt;

    const link = document.createElement("a");
    link.className = "read-more";
    link.textContent = "Read Article →";
    link.href = `article.html?slug=${encodeURIComponent(blog.slug)}`;

    content.append(category, title, excerpt, link);
    card.append(image, content);
    blogGrid.appendChild(card);
  });
}

async function loadBlogs() {
  try {
    const response = await fetch("blog-data.json");

    if (!response.ok) throw new Error("Unable to load blogs");

    blogs = await response.json();
    blogs = blogs.filter(blog => blog.status === "published");

    renderCategories();
    renderBlogs();
  } catch (error) {
    blogGrid.innerHTML = "<p>Unable to load articles. Please try again later.</p>";
    console.error(error);
  }
}

loadBlogs();
