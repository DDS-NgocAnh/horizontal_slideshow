/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for ms milliseconds.
 *
 * @param {Function} fn - The callback
 * @param {number} ms - The time (in milliseconds) that needs to elapse before callback can execute again.
 */
export const debounce = (fn, ms) => {
	let timer;

	return function () {
		const args = arguments;
		const context = this;

		if (timer) clearTimeout(timer);

		timer = setTimeout(() => {
			fn.apply(context, args);
		}, ms);
	};
};

/**
 * Get total slides to show in one frame
 * @param {HTMLElement} sliderEl - The slider element
 */
export const getSlidePerScreen = (sliderEl) => {
	const slidePerScreen =
		getComputedStyle(sliderEl).getPropertyValue("--item-per-screen");
	return slidePerScreen;
};

/**
 * Get the center slide's index in the first frame
 * @param {HTMLElement} sliderEl - The slider element
 */
export const getCenterIdx = (sliderEl) => {
	const slidePerScreen = getSlidePerScreen(sliderEl);
	return Math.floor(slidePerScreen / 2);
};

/**
 * Center the selected slide
 * @param {HTMLElement} sliderEl - The slider element
 * @param {number} selectedSlideIdx - Selected slide index
 */
export const centerSelectedItem = (sliderEl, selectedSlideIdx) => {
	const slidePerScreen = getSlidePerScreen(sliderEl);
	const translateXPerSlide = 100 / slidePerScreen;
	const centerIdx = getCenterIdx(sliderEl);
	const newTranslateX = (centerIdx - selectedSlideIdx) * translateXPerSlide;

	sliderEl.style.setProperty("transform", `translateX(${newTranslateX}%)`);
};
