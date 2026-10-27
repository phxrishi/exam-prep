import { useLocation } from "react-router-dom";

function Result() {
  const location = useLocation();
  const { score, total } = location.state || {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow w-full max-w-md text-center">

        <h2 className="text-2xl font-bold mb-4">Result 📊</h2>

        <p className="text-lg mb-4">
          Your Score: <span className="font-bold">{score}</span> / {total}
        </p>

        {/* 🎯 Percentage */}
        <p className="mb-4 text-blue-500 font-semibold">
          Percentage: {Math.round((score / total) * 100)}%
        </p>

        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back to Dashboard
        </button>

      </div>
    </div>
  );
}

export default Result;