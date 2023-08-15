// Sticky Navigation
const sectionHeroEl = document.getElementById("section-hero");
const obs = new IntersectionObserver(
    function (entries) {
        const ent = entries[0];
        if (!ent.isIntersecting) {
            document.getElementsByTagName("header")[0].classList.add("fixed-top");
            $("section").css("padding-top", "10vh");
        } else {
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
const allLinks = document.querySelectorAll(".mynavlink:link");
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
    if (link.classList.contains("nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

//  hover on project, add shadow 
$(".project").hover(function(){
    $(this).addClass("shadow");
}, function(){
    $(this).removeClass("shadow");
});

// customize form function
$("#contact-form").on("submit", async function(event){
    event.preventDefault();

    // Get form input values
    const name = $("#visiter-name").val();
    const email = $("#email").val();
    const message = $("#message").val();

    // Send a POST request to the server
    const response = await fetch("/contact", {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            email: email,
            message: message
        }),
        
        headers: {
            'Content-Type': 'application/json' // Specify the content type here
        }
    });
    
    // if the response is successful, show a success message
    const result = await response.json();
    if (result.success) {
        alert("Thanks for connecting! I will get back to you soon.");
        this.reset();
    } else {    
        alert("Oops! Message failed to send:( Please try again.");
    }
});

// use AngularJS to fetch app name and date from server
let app = angular.module('myApp', []);
app.controller('appCtrl', ['$scope', '$http',function($scope, $http){
    $http({
        method: 'GET',
        url: "/configdata"
    }).then(
        function success(response){
            $scope.app_name = response.data.app_name;
            $scope.date = response.data.date;
        },
        function error(err){
            console.log('Error: ' + err);
        }
    );

}]);
