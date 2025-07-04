//import { DateCounter } from "./DateCounter";
import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";

const initialstate = {
  questions: [],
  //we can be loading,error,ready,active,finished
  status: "loading",
  index: 0, //index is for current question
  answer: null, // state for checking answer
  points: 0, //state for points
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "active":
      return { ...state, status: "active" };
    case "newAnswer":
      //finding out which is the current question
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };

    case "nextQsn":
      return { ...state, index: state.index + 1, answer: null };

    default:
      throw new Error(`Action Unknown`);
  }
}

export default function App() {
  //using useReducer hook for displaying question
  const [state, dispatch] = useReducer(reducer, initialstate);

  //Total number of questions
  const totalqsn = state.questions.length;

  //calculating total points in the quiz json
  const totalPoints = state.questions.reduce(
    (accumulator, currentValue) => accumulator + currentValue.points,
    0
  );

  //destructuring state
  const { questions, status, index, answer, points } = state;

  useEffect(function () {
    async function getQsn() {
      try {
        const response = await fetch(`http://localhost:8000/questions`);

        const data = await response.json();
        dispatch({
          type: "dataReceived",
          payload: data,
        });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }
    getQsn();
  }, []);

  return (
    <div className="app">
      {/* <DateCounter /> for practice of useReducer hook*/}
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen totalqsn={totalqsn} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              totalPoints={totalPoints}
              numQsn={totalqsn}
              points={points}
              answer={answer}
            />

            <Questions
              currentQsn={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}
