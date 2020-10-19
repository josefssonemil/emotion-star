import { allowedExpressions } from "../config";
export default function EmptyCamPlaceholder(props) {
  return (
    <svg
      style={{
        width: "90%",
        height: "auto",
        left: "5%",
        bottom: "0",
        position: "absolute",
        stroke: props.player == 1 ? "#4BFAF0" : "#86E409",
        strokeWidth: "20",
        strokeDasharray: "100, 50",
        strokeOpacity: 0.7,
        fill: props.player == 1 ? "#4BFAF0" : "#86E409",
        fillOpacity: 0.1,
      }}
      viewBox="0 0 1183 1148"
      fill="none"
    >
      <path d="M10 1145C46.0712 999.937 109.243 949.495 300 915.5C384.603 906.865 419.592 888.314 460 831V710.5C380.99 657.516 342.022 616.371 300 484C257.617 437.917 261.084 412.084 300 366C317.756 151.075 403.5 10 583.5 10C763.5 10 868.851 150.378 873.5 366C912.664 416.43 907.542 441.7 873.5 484C832.688 601.871 801.773 654.043 725.5 710.5V831C765.223 896.682 809.102 909.801 903.5 915.5C1096.1 945.397 1136.52 1008.25 1172.5 1145" />
    </svg>
  );
}


/*





<svg 
      style={{
        width: "95%",
        height: "auto",
        left: "2.5%",
        bottom: ".25rem",
        position: "absolute",
      }}
      viewBox="0 0 815 742" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_ddd)">
        <path d="M55 742C55 660 115.186 623.663 230.871 603.087C282.178 597.86 303.398 586.632 327.903 551.94V479.003C279.988 446.933 256.355 422.028 230.871 341.906C205.168 314.012 207.27 298.376 230.871 270.482C241.639 140.391 293.639 55 402.8 55C511.961 55 575.852 139.969 578.671 270.482C602.422 301.007 599.316 316.302 578.671 341.906C553.921 413.251 535.172 444.83 488.916 479.003V551.94C513.006 591.697 539.617 599.637 596.865 603.087C713.665 621.183 760 660 760 742" stroke="white" stroke-width="10" stroke-dasharray="100 20"/>
      </g>
      <defs>
        <filter id="filter0_ddd" x="0" y="0" width="815" height="792" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="25"/>
          {props.player == 1 
            ? <feColorMatrix type="matrix" values="0 0 0 0 0.294118 0 0 0 0 0.980392 0 0 0 0 0.941176 0 0 0 1 0"/>
            : <feColorMatrix type="matrix" values="0 0 0 0 0.52549 0 0 0 0 0.894118 0 0 0 0 0.0352941 0 0 0 1 0"/>
          }              
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="12.5"/>
          {props.player == 1 
            ? <feColorMatrix type="matrix" values="0 0 0 0 0.294118 0 0 0 0 0.980392 0 0 0 0 0.941176 0 0 0 1 0"/>
            : <feColorMatrix type="matrix" values="0 0 0 0 0.52549 0 0 0 0 0.894118 0 0 0 0 0.0352941 0 0 0 1 0"/>
          }
          <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="6"/>
          {props.player == 1 
            ? <feColorMatrix type="matrix" values="0 0 0 0 0.294118 0 0 0 0 0.980392 0 0 0 0 0.941176 0 0 0 1 0"/>
            : <feColorMatrix type="matrix" values="0 0 0 0 0.52549 0 0 0 0 0.894118 0 0 0 0 0.0352941 0 0 0 1 0"/>
          }
          <feBlend mode="normal" in2="effect2_dropShadow" result="effect3_dropShadow"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow" result="shape"/>
        </filter>
      </defs>
    </svg>

*/