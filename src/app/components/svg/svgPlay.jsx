import React from 'react';

const SvgPlay = ({ a11yActive = true }) => (
  <svg
  width="10"
  height="14"
  viewBox="0 0 10 14"
  xmlns="http://www.w3.org/2000/svg"
  {...(a11yActive && { 'aria-hidden': 'true', focusable: 'false' })}
>
  <path d="M0 14V0L10 7L0 14Z" />
</svg>
)

export default SvgPlay;
