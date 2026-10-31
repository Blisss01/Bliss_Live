
async function loadArticle() {
  const params = new URLSearchParams(location.search);
  const slug = params.get("slug");

  const container = document.getElementById("article");

  if (!slug) {
    container.innerHTML = "<h2>Article not found</h2><a href='blog.html'>Back to blogs</a>";
    return;
  }

  try {
    const response = await fetch("blog-data.json");

    if (!response.ok) {
      throw new Error("Blog data unavailable");
    }

    const blogs = await response.json();

    const blog = blogs.find(item =>
      item.slug === slug && item.status === "published"
    );

    if (!blog) {
      container.innerHTML = `
        <h2>Article not found</h2>
        <p>This article may have been removed or is unavailable.</p>
        <a href="blog.html">Back to blogs</a>
      `;
      return;
    }

    // SEO TITLE
    document.title = blog.seoTitle || blog.title;

    // SEO DESCRIPTION
    const metaDescription = document.querySelector(
      'meta[name="description"]'
    );

    if (metaDescription) {
      metaDescription.content =
        blog.metaDescription || blog.excerpt || "";
    }

    // CATEGORY
    const category = document.createElement("p");
    category.textContent = blog.category || "";
    category.style.cssText = `
      color: #a45c47;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 12px;
    `;

    // TITLE
    const heading = document.createElement("h1");
    heading.textContent = blog.title || "";
    heading.style.cssText = `
      font-family: Georgia, serif;
      font-size: clamp(32px, 5vw, 52px);
      line-height: 1.2;
      margin: 20px 0;
      color: #30231f;
    `;

    // FEATURED IMAGE
    const image = document.createElement("img");
    image.src = blog.image || "";
    image.alt = blog.title || "Chocolate blog";
    image.loading = "eager";
    image.style.cssText = `
      width: 100%;
      max-height: 500px;
      object-fit: cover;
      border-radius: 12px;
      margin: 20px 0;
    `;

    image.onerror = () => {
      image.style.display = "none";
    };

    // ARTICLE CONTENT
    const content = document.createElement("div");

    content.className = "article-content";

    content.style.cssText = `
      max-width: 800px;
      margin: 30px auto;
      font-size: 17px;
      line-height: 1.9;
      color: #403632;
      overflow-wrap: anywhere;
    `;

    // SAFE HTML TAGS ALLOWED
    const allowedTags = [
      "P", "BR", "H2", "H3",
      "STRONG", "B", "EM", "I", "U",
      "UL", "OL", "LI",
      "A", "BLOCKQUOTE"
    ];

    // Convert old plain text blogs into paragraphs.
    function convertPlainText(text) {
      return String(text || "")
        .split(/\n\s*\n/)
        .filter(paragraph => paragraph.trim())
        .map(paragraph =>
          `<p>${paragraph
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\n/g, "<br>")}</p>`
        )
        .join("");
    }

    // CLEAN HTML BEFORE DISPLAY
    function sanitizeHTML(html) {
      const doc = new DOMParser().parseFromString(
        String(html || ""),
        "text/html"
      );

      function clean(node) {
        [...node.childNodes].forEach(child => {
          if (child.nodeType === Node.ELEMENT_NODE) {

            if (!allowedTags.includes(child.tagName)) {
              clean(child);
              child.replaceWith(...child.childNodes);
              return;
            }

            // Remove all attributes except safe link href.
            [...child.attributes].forEach(attr => {
              if (
                child.tagName !== "A" ||
                attr.name !== "href"
              ) {
                child.removeAttribute(attr.name);
              }
            });

            // Validate links.
            if (child.tagName === "A") {
              try {
                const url = new URL(
                  child.getAttribute("href")
                );

                if (
                  !["http:", "https:"].includes(url.protocol)
                ) {
                  child.removeAttribute("href");
                } else {
                  child.setAttribute("href", url.href);
                  child.setAttribute("target", "_blank");
                  child.setAttribute(
                    "rel",
                    "noopener noreferrer"
                  );
                }
              } catch {
                child.removeAttribute("href");
              }
            }

            clean(child);

          } else if (child.nodeType !== Node.TEXT_NODE) {
            child.remove();
          }
        });
      }

      clean(doc.body);

      return doc.body.innerHTML;
    }

    const rawContent = String(blog.content || "");

    // Support both old text and new formatted HTML.
    const hasHTML = /<[a-z][\s\S]*>/i.test(rawContent);

    const safeContent = hasHTML
      ? sanitizeHTML(rawContent)
      : convertPlainText(rawContent);

    content.innerHTML = safeContent;

    // CONTENT FORMATTING
    content.querySelectorAll("h2").forEach(item => {
      item.style.cssText = `
        font-size: 28px;
        line-height: 1.4;
        margin: 30px 0 15px;
        color: #30231f;
      `;
    });

    content.querySelectorAll("h3").forEach(item => {
      item.style.cssText = `
        font-size: 22px;
        line-height: 1.4;
        margin: 25px 0 12px;
        color: #30231f;
      `;
    });

    content.querySelectorAll("p").forEach(item => {
      item.style.marginBottom = "20px";
    });

    content.querySelectorAll("ul, ol").forEach(item => {
      item.style.cssText = `
        padding-left: 28px;
        margin: 15px 0 25px;
      `;
    });

    content.querySelectorAll("li").forEach(item => {
      item.style.marginBottom = "8px";
    });

    content.querySelectorAll("a").forEach(item => {
      item.style.cssText = `
        color: #a45c47;
        text-decoration: underline;
      `;
    });

    content.querySelectorAll("blockquote").forEach(item => {
      item.style.cssText = `
        border-left: 4px solid #a45c47;
        padding: 12px 20px;
        margin: 20px 0;
        background: #faf5f2;
        font-style: italic;
      `;
    });

    // DISPLAY ARTICLE
    container.replaceChildren(
      category,
      heading,
      image,
      content
    );

  } catch (error) {
    container.textContent = "Unable to load this article.";
    console.error("Article error:", error);
  }
}

loadArticle();
