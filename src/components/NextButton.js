import { useQuiz } from "../context/QuizContext";

export default function NextButton() {
  const { dispatch, answer, index, totalqsn } = useQuiz();

  if (answer === null) return null;

  if (index < totalqsn - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQsn" })}
      >
        Next
      </button>
    );
  if (index === totalqsn - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}
