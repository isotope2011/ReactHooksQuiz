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

export default () => {
  const { state, actions } = useContext(StoreContext);
  const { globalStates: { data, index } } = state;
  const { globalActions, viewActions } = actions;
  const isRequired = { required: true };
  
  const { register, handleSubmit, errors } = useForm();
  const [quizData, setQuiz] = useState(null);
  const [show, toggleButton] = useState(false);
  const [answerStatus, setStatus] = useState(null);
  const fieldRef = useRef(null);

  useEffect(() => {
    console.log("isFinished>", index, data.length-1, data[index]);
    // stop and goto End View
    if (index > data.length - 1) {
      viewActions.updateView("Summary");
    }

    setQuiz(data[index]);
    fieldRef.current.disabled = false;
    toggleButton(false);
    setStatus(null);
  }, [index]);

  const onSubmit = useCallback(
    handleSubmit(({ correct }) => {
      fieldRef.current.disabled = true;
      toggleButton(true);
      setStatus(quizData.correct === parseInt(correct));
    })
  );

  const onChange = useCallback((event) => {
    event.target.checked = true;
    onSubmit();
  });

  const onClick = useCallback(() => {
    setQuiz(null);
    globalActions.updateCurrentIndex(index + 1);
  });

  return (
    <>
      <h2>Which Word is Related?</h2>
      <div>
        <ul>
          {_get(quizData, 'quiz', []).map((word, idx) => <li key={idx}>{word}</li>)}
        </ul>
      </div>
      <form>
        <fieldset ref={fieldRef}>
          {_get(quizData, 'option', []).map((word, idx) => {
              const ans = idx + 1;
              return (
                <>
                  <input
                    {...{
                      key: idx,
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
                </>
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
          {answerStatus ? (
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
