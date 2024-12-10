import React from 'react';

const SvgPause = ({ a11yActive = true }) => (
	<svg
		width="12"
		height="16"
		viewBox="0 0 12 16"
		xmlns="http://www.w3.org/2000/svg"
		{...(a11yActive && { 'aria-hidden': 'true', focusable: 'false' })}
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M0 16.6699V0.669922H4V8.66992V16.6699H0ZM8 0.669922H12V16.6699H8V8.66992V0.669922Z"
		/>
	</svg>
)

export default SvgPause;
