import { useEffect, useState } from "react";

function Admin() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState("");
  const [answer, setAnswer] = useState("");

  // 🔐 Admin protection
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      alert("Access denied ❌");
      window.location.href = "/";
    }
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/questions/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question,
        options: options.split(","),
        answer
      })
    });

    alert("Question Added ✅");

    // reset fields
    setQuestion("");
    setOptions("");
    setAnswer("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Admin Panel 👨‍💼
        </h2>

        <form onSubmit={handleAdd} className="space-y-3">
          <input
            type="text"
            placeholder="Question"
            className="border p-2 w-full rounded"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <input
            type="text"
            placeholder="Options (comma separated)"
            className="border p-2 w-full rounded"
            value={options}
            onChange={(e) => setOptions(e.target.value)}
          />

          <input
            type="text"
            placeholder="Correct Answer"
            className="border p-2 w-full rounded"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <button className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">
            Add Question
          </button>
        </form>
      </div>
    </div>
  );
}

export default Admin;