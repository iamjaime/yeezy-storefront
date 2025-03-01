import React from "react"

const Account = ({ size = 24, color = "currentColor" }) => {
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
      <circle cx="12" cy="8" r="3" />
      <path d="M19 18C19 14.134 15.866 11 12 11C8.13401 11 5 14.134 5 18" />
    </svg>
  )
}

export default Account 