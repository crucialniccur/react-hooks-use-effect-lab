import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    if (timeRemaining <= 0) {
      setTimeRemaining(10);
      onAnswered(false);
    }

    return () => clearTimeout(initialTimeout);
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => (
        <button
          key={answer}
          onClick={() => handleAnswer(index === correctIndex)}
        >
          {answer}
        </button>
      ))}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
