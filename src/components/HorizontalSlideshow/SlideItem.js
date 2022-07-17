import React, { memo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const SlideItem = ({ data, className, active, onClick, ...otherProps }) => {
	return (
		<div
			className={clsx(
				"slideshow__item",
				active && "slideshow__item--active",
				className
			)}
			onClick={onClick}
			{...otherProps}
		>
			<img src={data.url} alt={data?.name ?? data.id} />
			{Boolean(data?.name) && (
				<p className={clsx({ hidden: !active })}>{data.name}</p>
			)}
		</div>
	);
};

SlideItem.propTypes = {
	data: PropTypes.shape({
		url: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
		name: PropTypes.string,
	}),
	className: PropTypes.string,
	active: PropTypes.bool,
	onClick: PropTypes.func,
};

export default memo(SlideItem);
