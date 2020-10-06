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
