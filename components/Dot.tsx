export default function Dot(props) {
    const dotStyle = {
        boxShadow: "0 0 25px 2px #5EFFF5",
    };
    return (
        <div
            style={{
                boxShadow: "0 0 25px 2px #5EFFF5",
            }}
            className={"justify-self-center self-center h-4 w-4 border-2 rounded-full border-player1 border-opacity-25 bg-blue-100"}
        />
    );
}