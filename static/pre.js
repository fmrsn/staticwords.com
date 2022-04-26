(function(window, document) {
	var CLASS_PRESENTATION = "pre";
	var CLASS_SLIDE = "slide";
	var CLASS_CURRENT_SLIDE = "current";

	var slides;
	var current = 0;

	function onKeyDownArticle(event) {
		if (event.key !== "f") {
			return;
		}
		event.preventDefault();
		document.documentElement.classList.add(CLASS_PRESENTATION);
		window.removeEventListener("keydown", onKeyDownArticle);
		window.addEventListener("keydown", onKeyDownPresentation);
		window.addEventListener("wheel", onWheelPresentation);
	}

	function onKeyDownPresentation(event) {
		switch (event.key) {
		case "ArrowRight":
		case "ArrowDown":
		case "j":
		case "l":
		case " ":
			advance(+1);
			break;
		case "ArrowLeft":
		case "ArrowUp":
		case "h":
		case "k":
			advance(-1);
			break;
		case "f":
		case "Escape":
			document.documentElement.classList.remove(CLASS_PRESENTATION)
			window.removeEventListener("wheel", onWheelPresentation);
			window.removeEventListener("keydown", onKeyDownPresentation);
			window.addEventListener("keydown", onKeyDownArticle);
			break;
		}
	}

	function onWheelPresentation(event) {
		var dir = event.deltaX || event.deltaY || event.deltaZ || 0;
		advance(dir);
	}

	function advance(dir) {
		// dir > 0: next slide
		// dir < 0: previous slide
		var incr = (dir > 0) - (dir < 0);
		var next = current + incr;
		if (next < 0 || next >= slides.length) {
			return;
		}
		slides[current].classList.remove(CLASS_CURRENT_SLIDE);
		slides[next].classList.add(CLASS_CURRENT_SLIDE);
		current = next;
	}

	window.addEventListener("load", function() {
		slides = document.getElementsByClassName(CLASS_SLIDE);
		if (slides.length === 0) {
			return;
		}
		slides[current].classList.add(CLASS_CURRENT_SLIDE);
		window.addEventListener("keydown", onKeyDownArticle);
	});
})(window, document);
