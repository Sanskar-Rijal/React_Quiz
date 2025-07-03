//import { DateCounter } from "./DateCounter";
import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";

const initialstate = {
  questions: [],
  //we can be loading,error,ready,active,finished
  status: "loading",
  index: 0, //index is for current question
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "active":
      return { ...state, status: "active" };
    default:
      throw new Error(`Action Unknown`);
  }
}

export default function App() {
  //using useReducer hook for displaying question
  const [state, dispatch] = useReducer(reducer, initialstate);

  //Total number of questions
  const totalqsn = state.questions.length;

  //destructuring state
  const { questions, status, index } = state;
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
        {status === "active" && <Questions currentQsn={questions[index]} />}
      </Main>
    </div>
  );
}
