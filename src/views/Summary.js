import React, { useContext } from 'react';
import { StoreContext } from "../context/store/storeContext";

export default () => {
    const { state } = useContext(StoreContext);
    const { globalStates: { score } } = state;
    return (
        <>
        <h2>Thanks for finishing the Quiz!</h2>
        <p>
            <b>{`correct: ${score.correct}`}</b>
            <br /> 
            <b>{`wrong: ${score.wrong}`}</b>
        </p>
        </>
    );
}
