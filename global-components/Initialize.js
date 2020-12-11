/* UnGrabber */
export function unGrabberInit(options, text) {
    const unGrabber = require("@theme/unGrabber");
    unGrabber(options, text);
}

/* Initialize of the Materialize */
export function materializeInit() {
    const M = require("@theme/materialize/js/materialize.min.js");
    if (Waves) Waves.displayEffect(); // Enable waves
    M.Sidenav.init(document.querySelectorAll(".sidenav"));
    M.Tooltip.init(document.querySelectorAll(".tooltipped"), {
        margin: 3,
        position: "bottom",
    });
    M.Collapsible.init(document.querySelectorAll(".collapsible"));
    M.Modal.init(document.querySelectorAll(".modal"), {
        inDuration: 500,
        outDuration: 500,
    });
    M.FloatingActionButton.init(
        document.querySelectorAll(".fixed-action-btn"),
        {
            direction: "top",
            hoverEnabled: false,
            toolbarEnabled: false,
        }
    );
    M.Dropdown.init(document.querySelectorAll(".dropdown-trigger"), {
        alignment: "right",
        inDuration: 300,
        outDuration: 300,
        coverTrigger: false,
        constrainWidth: false,
    });
    M.ScrollSpy.init(
        document.querySelectorAll("#article-container h1,h2,h3,h4,h5,h6")
    );
    M.Carousel.init(document.querySelectorAll(".carousel.carousel-slider"), {
        fullWidth: true,
        indicators: true,
    });
}
