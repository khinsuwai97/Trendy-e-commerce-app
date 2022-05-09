const uiDomManipulation = function () {
  const allLinks = document.querySelectorAll(".main-nav-link");
  const btnScrollTo = document.querySelector(".btn--scroll-to");
  const sectionProduct = document.querySelector(".section-products");
  const signInBtn = document.querySelector(".main-nav-btn");
  const ctaTextBox = document.querySelector(".cta-text-box");
  const overlay = document.querySelector(".overlay");
  const ctaBtnClose = document.querySelector(".cta-btn-close");
  const mobileBtn = document.querySelector(".btn-mobile-nav");
  const headerEl = document.querySelector(".header");
  const addToBagBtn = document.querySelector(".btn-bag");
  const wishlistBtn = document.querySelector(".wishlist--btn");

  // set current year
  const yearEl = document.querySelector(".year");
  const year = new Date().getFullYear();
  yearEl.textContent = year;

  // scoll section
  allLinks.forEach((link) =>
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = link.getAttribute("href");
      if (!href) return;

      //  Scroll to other links
      if (e.target.classList.contains("main-nav-link")) {
        const sectionEl = document.querySelector(href);
        sectionEl.scrollIntoView({ behavior: "smooth" });
      }

      // Close mobile naviagtion
      if (e.target.classList.contains("main-nav-link")) {
        headerEl.classList.toggle("nav-open");
      }
    })
  );

  //scroll to product section
  btnScrollTo.addEventListener("click", function () {
    sectionProduct.scrollIntoView({ behavior: "smooth" });
  });

  // show and hide cta form
  signInBtn.addEventListener("click", function () {
    ctaTextBox.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
    headerEl.classList.toggle("nav-open");
  });

  ctaBtnClose.addEventListener("click", function () {
    ctaTextBox.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
  });

  // show and hide overlay
  overlay.addEventListener("click", function () {
    ctaTextBox.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
  });

  // mobile navigation
  mobileBtn.addEventListener("click", function () {
    headerEl.classList.toggle("nav-open");
  });

  addToBagBtn.addEventListener("click", function () {
    headerEl.classList.toggle("nav-open");
  });
  wishlistBtn.addEventListener("click", function () {
    headerEl.classList.toggle("nav-open");
  });
};

export default uiDomManipulation;
