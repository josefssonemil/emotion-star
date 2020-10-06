import Dot from "./Dot";

interface Props {
  player: Object;
}

// send in width

export default function PlayBar(props) {
  return (
    <div
      className={`
          ${"row-start-" + props.data.row} ${
        props.data.visible
      } bg-gray-900 h-1/3 flex flex-row self-center col-start-6 col-span-1 row-span-1`}
    >
      <div className="bg-white">😡</div>

      <div className="justify-center mx-auto"></div>
    </div>
  );
}
