export default function PlayField(props) {
  function PlayFieldRow(props) {
    return (
      <div className="flex flex-row bg-gray-500 flex-grow justify-center items-center w-64">
        <div className="flex">hello</div>
      </div>
    );
  }
  function PlayFieldCol(props) {
    return (
      <div className="flex flex-col space-y-4 bg-gray-600 p-4 h-full">
        <PlayFieldRow />
        <PlayFieldRow />
        <PlayFieldRow />
        <PlayFieldRow />
        <PlayFieldRow />
      </div>
    );
  }
  return (
    <div className="flex flex-row space-x-4 p-4 h-full pl-24 overflow-hidden">
      <PlayFieldCol />
      <PlayFieldCol />
      <PlayFieldCol />
      <PlayFieldCol />
      <PlayFieldCol />
    </div>
  );
}
