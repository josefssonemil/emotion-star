export default function PlayField(props) {
  function PlayFieldRow(props) {
    return (
      <div className="flex flex-1 bg-gray-500 justify-center items-center w-full">
        <div className="flex">hello</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 py-4 h-full pl-4 w-screen">
      <PlayFieldRow />
      <PlayFieldRow />
      <PlayFieldRow />
      <PlayFieldRow />
      <PlayFieldRow />
    </div>
  );
}
