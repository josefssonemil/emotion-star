export default function NoteBarMiddle() {
  return (
    <svg
      style={{
        height: "1.5rem",
        width: "100%",
      }}
      viewBox="0 0 200 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <rect width="200" height="16" fill="url(#paint0_linear)" />
      <rect y="34" width="200" height="16" fill="url(#paint1_linear)" />
      <rect y="43" width="200" height="7" fill="url(#paint2_linear)" />
      <path
        opacity="0.2"
        d="M0 17.0605H200V0.0177002H0V17.0605Z"
        fill="black"
      />
      <path opacity="0.3" d="M0 12.0246H200V0H0V12.0246Z" fill="black" />
      <rect width="200" height="7" fill="url(#paint3_linear)" />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="-2.79397e-07"
          y1="14"
          x2="200"
          y2="14"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1F0655" />
          <stop offset="1" stop-color="#56007B" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="1.29221e-06"
          y1="39"
          x2="200"
          y2="39"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1F0655" />
          <stop offset="1" stop-color="#56007B" />
        </linearGradient>
        <linearGradient
          id="paint2_linear"
          x1="1.19647e-06"
          y1="46"
          x2="200"
          y2="46"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#5301C3" />
          <stop offset="1" stop-color="#2D0561" />
        </linearGradient>
        <linearGradient
          id="paint3_linear"
          x1="1.19647e-06"
          y1="2.99998"
          x2="200"
          y2="3.00001"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#5301C3" />
          <stop offset="1" stop-color="#2D0561" />
        </linearGradient>
      </defs>
    </svg>
  );
}
