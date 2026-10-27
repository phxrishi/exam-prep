import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(10);

  const navigate = useNavigate();

  // 📥 Fetch questions
  useEffect(() => {
    fetch("http://localhost:5000/api/questions")
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  // ⏱️ Timer logic
  useEffect(() => {
    if (questions.length === 0) return;

    if (time === 0) {
      handleNext();
      return;
    }

    const timer = setTimeout(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time, index, questions]);

  // ✔️ Handle answer
  const handleAnswer = (option) => {
    if (option === questions[index].answer) {
      setScore(score + 1);
    }
    handleNext();
  };

  // 👉 Next question
  const handleNext = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setTime(10); // reset timer
    } else {
      // 🎯 Quiz finished → go to result page
      navigate("/result", {
        state: {
          score: score,
          total: questions.length
        }
      });
    }
  };

  // 🌀 Loading
  if (questions.length === 0) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow w-full max-w-xl">

        <h2 className="text-xl font-bold mb-2">
          Question {index + 1} / {questions.length}
        </h2>

        <p className="mb-4">{questions[index].question}</p>

        {/* ⏱️ Timer */}
        <p className="text-red-500 font-semibold mb-4">
          Time Left: {time}s
        </p>

        {/* Options */}
        {questions[index].options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt)}
            className="block w-full bg-blue-500 text-white p-2 my-2 rounded hover:bg-blue-600"
          >
            {opt}
          </button>
        ))}

      </div>
    </div>
  );
}

export default Quiz;