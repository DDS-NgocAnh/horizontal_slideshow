import React, { useState, useRef, memo, useCallback, useEffect } from "react";
import "./HorizontalSlideshow.css";
import clsx from "clsx";
import PropTypes from "prop-types";
import SlideItem from "./SlideItem";
import { debounce, centerSelectedItem, getCenterIdx } from "./helpers";

const HorizontalSlideshow = ({
	data,
	title,
	titleProps,
	slideProps,
	sliderProps,
	className,
	...otherProps
}) => {
	const { className: titleClassName, ...otherTitleProps } = titleProps;
	const { className: sliderClassName, ...otherSliderProps } = sliderProps;

	const sliderRef = useRef(null);

	const [activeIdx, setActiveIdx] = useState(undefined);

	const handleSlideClick = useCallback(
		(newSlideIdx) => () => {
			if (newSlideIdx === activeIdx) return;

			setActiveIdx(newSlideIdx);

			const sliderEl = sliderRef.current;
			centerSelectedItem(sliderEl, newSlideIdx);
		},
		[activeIdx]
	);

	useEffect(() => {
		const updateActiveIdx = debounce(() => {
			const sliderEl = sliderRef.current;
			const centerIdx = getCenterIdx(sliderRef.current);
			setActiveIdx(centerIdx);
			centerSelectedItem(sliderEl, centerIdx);
		}, 300);

		updateActiveIdx();

		window.addEventListener("resize", updateActiveIdx);
		return () => {
			window.removeEventListener("resize", updateActiveIdx);
		};
	}, []);

	return (
		<div className={clsx("slideshow", className)} {...otherProps}>
			<h1
				className={clsx("slideshow__title", titleClassName)}
				{...otherTitleProps}
			>
				{title}
			</h1>
			<div
				ref={sliderRef}
				className={clsx("slideshow__slider", sliderClassName)}
				{...otherSliderProps}
			>
				{data?.map((item, idx) => {
					return (
						<SlideItem
							key={item.id}
							data={item}
							active={idx === activeIdx}
							onClick={handleSlideClick(idx)}
							{...slideProps}
						/>
					);
				})}
			</div>
		</div>
	);
};

HorizontalSlideshow.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			url: PropTypes.string,
			id: PropTypes.number.isRequired,
			name: PropTypes.string,
		})
	),
	title: PropTypes.string,
	titleProps: PropTypes.object,
	sliderProps: PropTypes.object,
	slideProps: PropTypes.object,
	className: PropTypes.string,
};

HorizontalSlideshow.defaultProps = {
	titleProps: {},
	slideProps: {},
	sliderProps: {},
};

export default memo(HorizontalSlideshow);
