import { useQuiz } from "../context/QuizContext";

export default function Finish() {
  //using context Api
  const { points, highScore, dispatch, totalPoints } = useQuiz();

  const percentage = (points / totalPoints) * 100;

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {totalPoints}{" "}
        {Math.ceil(percentage)}%
      </p>
      <p className="highscore">(HighScore: {highScore} points)</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}
