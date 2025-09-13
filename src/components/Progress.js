import { useQuiz } from "../context/QuizContext";

export default function Progress() {
  const { index, totalqsn, points, totalPoints, answer } = useQuiz();
  return (
    <header className="progress">
      <progress max={totalqsn} value={index + Number(answer !== null)} />
      {/* if answer is null then it will be false,Number will convert it into 0 , and when it's true it will add 1 */}

      <p>
        Question <strong>{index + 1}</strong>/{totalqsn}{" "}
      </p>
      <p>
        Points:
        <strong>
          {points}/{totalPoints}
        </strong>
      </p>
    </header>
  );
}
