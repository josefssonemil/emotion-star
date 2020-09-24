import HighScoreStyles from "../../styles/module/HighScore.module.css";

const HighScore = () => (
    <table>
        <thead>
            <tr>
                <th>High Score</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>👠</td>
                <td>2454</td>
            </tr>
            <tr>
                <td>🧦</td>
                <td>2045</td>
            </tr>
            <tr>
                <td>🧤</td>
                <td>1742</td>
            </tr>
            <tr>
                <td>👚</td>
                <td>3856</td>
            </tr>
            <tr>
                <td>�</td>
                <td>5345</td>
            </tr>
        </tbody>
    </table>
);

const scores = [{
    emoji: '🦺',
    score: 1234
},
{
    emoji: '🧶',
    score: 6237
},
{
    emoji: '🥾',
    score: 8748
},
{
    emoji: '🧣',
    score: 3618
},
{
    emoji: '🎩',
    score: 3892
},
{
    emoji: '🥾',
    score: 3245
}
];
export default HighScore;