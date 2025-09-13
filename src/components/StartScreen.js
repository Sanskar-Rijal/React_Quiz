import { useQuiz } from "../context/QuizContext";

export default function StartScreen() {
  const { totalqsn, dispatch } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome to the REACT QUIZ</h2>
      <h3>{totalqsn} questions to test your confidence in REACT</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "active" })}
      >
        Let's Begin
      </button>
    </div>
  );
}
