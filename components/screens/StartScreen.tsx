import HighScore from '../HighScore'
import StartScreenStyles from "../../styles/module/StartScreen.module.css";

const StartScreen = () => (
    <div className={StartScreenStyles["container"]}>
        <div>Placeholder video</div>
        <h1 className={StartScreenStyles["test"]}> Hello World! </h1>

        <HighScore />

        <h3>Do "faces" to start game</h3>
    </div>
);
export default StartScreen;