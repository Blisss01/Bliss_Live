
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
    heading.style.cssText =
      "font-family:Georgia;font-size:clamp(32px,5vw,52px);margin:25px 0;";

    const category = document.createElement("p");
    category.textContent = blog.category;
    category.style.color = "#a45c47";

    const image = document.createElement("img");
    image.src = blog.image;
    image.alt = blog.title;
    image.style.cssText =
      "display:block;width:100%;height:auto;max-height:none;object-fit:contain;border-radius:12px;margin:20px 0;";

    const content = document.createElement("div");
    content.style.cssText =
      "max-width:800px;margin:30px auto;font-size:17px;line-height:1.9;";

    blog.content.split(/\n\s*\n/).forEach(paragraph => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      p.style.marginBottom = "20px";
      content.appendChild(p);
    });

    // Internal links section
    const linksSection = document.createElement("section");
    linksSection.style.cssText =
      "max-width:800px;margin:40px auto;padding:25px;background:#fff8f5;border-radius:12px;";

    const linksHeading = document.createElement("h2");
    linksHeading.textContent = "Explore Bliss Chocolate";
    linksHeading.style.cssText =
      "font-family:Georgia;margin-bottom:15px;color:#542b24;";

    const linksText = document.createElement("p");
    linksText.textContent =
      "Looking for customised chocolates or thoughtful gift hampers? Explore our collection or get in touch with us.";
    linksText.style.lineHeight = "1.7";

    const shopLink = document.createElement("a");
    shopLink.href = "shop.html";
    shopLink.textContent = "Explore Chocolate Gifts and Hampers";
    shopLink.style.cssText =
      "display:block;margin:15px 0;color:#a45c47;font-weight:bold;";

    const contactLink = document.createElement("a");
    contactLink.href = "contact.html";
    contactLink.textContent = "Contact Bliss Chocolate for Customised Gifts";
    contactLink.style.cssText =
      "display:block;margin:15px 0;color:#a45c47;font-weight:bold;";

    const blogLink = document.createElement("a");
    blogLink.href = "blog.html";
    blogLink.textContent = "Read More Chocolate Blogs";
    blogLink.style.cssText =
      "display:block;margin:15px 0;color:#a45c47;font-weight:bold;";

    linksSection.append(
      linksHeading,
      linksText,
      shopLink,
      contactLink,
      blogLink
    );

    container.replaceChildren(
      category,
      heading,
      image,
      content,
      linksSection
    );

  } catch (error) {
    container.textContent = "Unable to load this article.";
    console.error(error);
  }
}

loadArticle();
