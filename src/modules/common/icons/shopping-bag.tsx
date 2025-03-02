import React from "react"

const ShoppingBag = ({ size = 24, color = "currentColor" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <rect x="6" y="8" width="12" height="10" rx="2" />
      <path d="M9 7V7C9 5.34315 10.3431 4 12 4V4C13.6569 4 15 5.34315 15 7V7" />
    </svg>
  )
}

export default ShoppingBag 