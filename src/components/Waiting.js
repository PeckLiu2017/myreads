import React from 'react';

/**
 * @description Represents a loader box, a square box with loading image and loading text.
 * @constructor
 * @param {Object} props - The props that were defined by the caller of this component.
 * @param {boolean} props.loading - Visibility of the component.
 * @param {number} props.size - The size in pixel of the box.
 * @param {type} props.type - The type of the loader.
 * @param {string} props.message - The message to be displayed with the box.
 */
function Waiting(props) {
  const type = ['clock','dots','circle'];
  const loader = ['../loading/clock.svg', '../loading/dots.svg', '../loading/circle.svg'];

	if (props.loading === 'loaded') {
		return null;
	}
	let style = {};
	if (props.size) {
		style = {width: props.size, height: props.size};
	}
	let loaderType;
	if (!props.type) {
		loaderType = type[0];
	}
	else{
		loaderType = props.type;
	}
	return (
		<div className="loader-box">
			<div>
				<img src={loader[type.indexOf(loaderType)]} className="loader-box-svg" style={style} alt="Loader"/>
			</div>
			{props.message &&
  			<div>
  				{props.message}
  			</div>
			}
		</div>
	);
}

export default Waiting
