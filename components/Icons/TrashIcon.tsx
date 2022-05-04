export default function TrashIcon() {
  return (
    <>
      <svg
        width="24"
        height="24"
        className="trashIcon"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 6.53H19"
          stroke="#C3C0C8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 10.47V16.53"
          stroke="#C3C0C8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 9.31V17.58"
          stroke="#C3C0C8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 10.47V16.53"
          stroke="#C3C0C8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.795 20.472H8.205C6.987 20.472 6 19.485 6 18.267V6.528H18V18.267C18 19.485 17.013 20.472 15.795 20.472Z"
          stroke="#C3C0C8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 6.528L15.262 4.223C15.129 3.809 14.744 3.528 14.31 3.528H9.69C9.255 3.528 8.87 3.809 8.738 4.223L8 6.528"
          stroke="#C3C0C8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 6.53H6"
          stroke="#C3C0C8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <style jsx>
        {`
          .trashIcon:hover {
            fill: #ff00008a;
          }
        `}
      </style>
    </>
  )
}
