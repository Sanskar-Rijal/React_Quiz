import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

//to create useReducer we need an initial state

const SECS_PER_QUESTION = 20;

const initialstate = {
  questions: [],
  //we can be loading,error,ready,active,finished
  status: "loading",
  index: 0, //index is for current question
  answer: null, // state for checking answer
  points: 0, //state for points
  highScore: 0, //state for high score
  secondRemaining: null, //state for seconds
};
//creating reducer function
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "active":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * SECS_PER_QUESTION,
      };
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

    //qsn is finished
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };

    case "restart":
      return {
        ...state,
        questions: state.questions,
        status: "ready",
        points: 0,
        index: 0,
        answer: null,
        secondRemaining: 10,
        highScore: state.highScore,
      };
    case "tick":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining <= 0 ? "finished" : state.status,
      };
    default:
      throw new Error(`Action Unknown`);
  }
}

function QuizProvider({ children }) {
  //using useReducer hook for displaying question
  const [state, dispatch] = useReducer(reducer, initialstate);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highScore,
    secondRemaining,
  } = state;

  //Total number of questions
  const totalqsn = questions.length;

  //calculating total points in the quiz json
  const totalPoints = questions.reduce(
    (accumulator, currentValue) => accumulator + currentValue.points,
    0
  );
  //finding current question
  const currentQsn = questions[index];

  //useEffect hook to get qsn from the fake Api
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
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondRemaining,
        dispatch,
        totalPoints,
        currentQsn,
        totalqsn,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  console.log(context);
  return context;
}

export { QuizProvider, useQuiz };
