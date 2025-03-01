import React from "react"

const ShoppingBag = ({ size = 48, color = "currentColor" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    >
      <rect x="18" y="21" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M21 20V20C21 18.3431 22.3431 17 24 17V17C25.6569 17 27 18.3431 27 20V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

export default ShoppingBag 