
async function loadArticle() {
  const params = new URLSearchParams(location.search);
  const slug = params.get("slug");

  const container = document.getElementById("article");

  try {
    const response = await fetch("blog-data.json");
    if (!response.ok) throw new Error("Data unavailable");

    const blogs = await response.json();
    const blog = blogs.find(item =>
      item.slug === slug && item.status === "published"
    );

    if (!blog) {
      container.innerHTML = "<h2>Article not found</h2><a href='blog.html'>Back to blogs</a>";
      return;
    }

    document.title = blog.seoTitle || blog.title;
    document.querySelector('meta[name="description"]').content =
      blog.metaDescription || blog.excerpt;

    const heading = document.createElement("h1");
    heading.textContent = blog.title;
    heading.style.cssText = "font-family:Georgia;font-size:clamp(32px,5vw,52px);margin:25px 0;";

    const category = document.createElement("p");
    category.textContent = blog.category;
    category.style.color = "#a45c47";

    const image = document.createElement("img");
    image.src = blog.image;
    image.alt = blog.title;
    image.style.cssText = "width:100%;max-height:500px;object-fit:cover;border-radius:12px;margin:20px 0;";

    const content = document.createElement("div");
    content.style.cssText = "max-width:800px;margin:30px auto;font-size:17px;line-height:1.9;";

    // Content is stored as plain text with paragraphs separated by blank lines.
    blog.content.split(/\n\s*\n/).forEach(paragraph => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      p.style.marginBottom = "20px";
      content.appendChild(p);
    });

    container.replaceChildren(category, heading, image, content);

  } catch (error) {
    container.textContent = "Unable to load this article.";
    console.error(error);
  }
}

loadArticle();
