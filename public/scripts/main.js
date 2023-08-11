// Sticky Navigation
const sectionHeroEl = document.getElementById("section-hero");
const obs = new IntersectionObserver(
    function (entries) {
        const ent = entries[0];
        if (!ent.isIntersecting) {
            // document.body.classList.add("sticky");
            document.getElementsByTagName("header")[0].classList.add("fixed-top");
            $("section").css("padding-top", "10vh");
        } else {
            // document.body.classList.remove("sticky");
            document.getElementsByTagName("header")[0].classList.remove("fixed-top");
            
        }
    },{
        // In the viewport
        root: null,
        threshold: 0,
        rootMargin: "-80px",
    }
);
obs.observe(sectionHeroEl);

// Smooth scrolling animation
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href");

    // scroll back to top
    if (href === "#") window.scrollTo({ top: 0, behavior: "smooth" });

    // scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // close mobile navigation
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

//  hover on project, add shadow 
$(".project").hover(function(){
    $(this).addClass("shadow");
}, function(){
    $(this).removeClass("shadow");
});