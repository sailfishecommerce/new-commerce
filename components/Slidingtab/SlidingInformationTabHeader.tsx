import React from 'react'

export default function SlidingInformationTabHeader() {
  const tabTitle = ['Product Information', 'Storage Instructions', 'Directions']

  return (
    <div className="header h-40 flex items-end bg-mountain-green p-4 w-full">
      {tabTitle.map((title, index) => {
        const tabStyle = index === 0 ? 'text-white' : 'text-gray-300'
        return (
          <button
            type="button"
            key={index}
            className={`${tabStyle} font-bold text-md 2xl:text-lg 2xl:mr-4 mx-2`}
          >
            {title}
          </button>
        )
      })}
    </div>
  )
}
