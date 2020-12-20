import React, {
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import _get from 'lodash/get';
import { useForm } from "react-hook-form";
import { StoreContext } from "../context/store/storeContext";

const CORRECT = 'correct';
const WRONG = 'wrong';

export default () => {
  const { state, actions } = useContext(StoreContext);
  const { globalStates: { data, index, status } } = state;
  const { globalActions, viewActions } = actions;
  const isRequired = { required: true };
  const total = data.length;
  
  const { register, handleSubmit, errors } = useForm();
  const [quizData, setQuiz] = useState(null);
  const [show, toggleButton] = useState(false);
  const [answerStatus, setStatus] = useState(null);
  const fieldRef = useRef(null);

  useEffect(() => {
    console.log("isFinished>", index, data.length-1, data[index]);
    // stop and goto End View
    if (index > total - 1) {
      viewActions.updateView("Summary");
    }

    if (status === 'success') {
      fieldRef.current.disabled = true;
      toggleButton(true);
    } else {
      fieldRef.current.disabled = false;
      toggleButton(false);
      
      setQuiz(data[index]);
      setStatus(null);
    }

  }, [index, status]);

  const onSubmit = useCallback(
    handleSubmit(async ({ correct }) => {
      const answer = quizData.option[correct - 1];
      const ansType = quizData.correct === parseInt(correct) ? CORRECT : WRONG;
      
      globalActions.asyncPostQuizData({ answer, ansType });

      setStatus(ansType);
      
      console.log('on submit', answer, ansType);
    })
  );

  const onChange = useCallback((event) => {
    event.target.checked = true;
    onSubmit();
  });

  const onClick = useCallback(() => {
    globalActions.updateCurrentIndex(index + 1);
    globalActions.updateStatus(null);

    setQuiz(null);
    setStatus(null);
  });

  return (
    <>
      <h2>Question {index + 1} of {total}</h2>
      <strong>Which Word is Related?</strong>
      <div>
        <ul>
          {_get(quizData, 'quiz', []).map((word, idx) => <li key={`word_${idx}`}>{word}</li>)}
        </ul>
      </div>
      <form>
        <fieldset ref={fieldRef}>
          {_get(quizData, 'option', []).map((word, idx) => {
              const ans = idx + 1;
              return (
                <React.Fragment key={`answer_${idx}`}>
                  <input
                    {...{
                      type: "radio",
                      id: ans,
                      name: "correct",
                      value: ans,
                      onChange,
                      ref: register(isRequired),
                    }}
                  />
                  <label htmlFor={ans}>{word}</label>
                  <br />
                  <br />
                </React.Fragment>
              );
            })}
        </fieldset>
        {errors.radio && (
          <>
            radio is required
            <br />
          </>
        )}
        <br />
      </form>
      {answerStatus !== null && (
        <div>
          {answerStatus === CORRECT ? (
            <strong style={{ color: "green" }}>Correct!!</strong>
          ) : (
            <strong style={{ color: "red" }}>Wrong...</strong>
          )}
        </div>
      )}
      <br />
      {show && <button onClick={onClick}>NEXT</button>}
    </>
  );
};
