import { useQuiz } from "../context/QuizContext";
import Options from "./options";
export default function Questions() {
  const { answer, dispatch, currentQsn } = useQuiz();

  return (
    <div>
      <h2>{currentQsn.question}</h2>
      <Options currentQsn={currentQsn} dispatch={dispatch} answer={answer} />
    </div>
  );
}
