export default function VercticalLine(props) {
  return (
    <div style={{ left: "50%" }} className="fixed inset-y-0 w-4 z-50">
      <div
        /* Dot Player 1 */
        style={{
          top: props.player1,
          boxShadow: "0 0 25px 2px #5EFFF5",
        }}
        className="h-4 w-4 border-2 absolute inset-x-0 rounded-full border-player1 border-opacity-25 bg-blue-100 shadow-base shadow-inner"
      />
      <div
        /* Dot Player 2 */
        style={{
          bottom: props.player2,
          boxShadow: "0 0 25px 2px #ecc94b",
        }}
        className="h-4 w-4 border-2 absolute inset-x-0 rounded-full border-yellow-500 border-opacity-25 bg-yellow-100 shadow-base shadow-inner"
      />
      <div
        /* Vertical Line */
        style={{
          left: "50%",
          boxShadow: "0 0 2px  #718096",
        }}
        className="mx-auto h-screen w-px shadow-md bg-gray-600 bg-opacity-25"
      />
    </div>
  );
}
