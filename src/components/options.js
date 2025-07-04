export default function Options({ currentQsn, dispatch, answer }) {
  const hasAnswered = answer !== null; //if there is answer  selected then it will be true
  //then it will disable the button nand show the correct answer

  return (
    <div className="options">
      {currentQsn.options.map((option, index) => (
        //option is the current element of the array and index is it's index value
        <button
          className={`btn btn-option ${answer === index ? "answer" : " "}
          ${
            hasAnswered
              ? index === currentQsn.correctOption
                ? "correct"
                : "wrong"
              : ""
          }
          `}
          key={option}
          disabled={hasAnswered} //if there is answer then disable the button
          onClick={() =>
            dispatch({
              type: "newAnswer",
              payload: index,
            })
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
}
