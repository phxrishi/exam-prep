import { useEffect, useState } from "react";

function Dashboard() {
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (!token) {
      window.location.href = "/";
      return;
    }

    setRole(userRole);

    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/api/protected", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      setMessage(data.message);
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-4">Dashboard 🔐</h2>

        <p className="mb-2">{message}</p>

        {/* 👤 Role show */}
        <p className="mb-6 text-blue-500 font-semibold">
          Role: {role}
        </p>

        <div className="flex gap-3 flex-wrap">

          {/* 🧠 Quiz Button */}
          <button
            onClick={() => (window.location.href = "/quiz")}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Start Quiz
          </button>

          {/* 👨‍💼 Admin Panel Button */}
          {role === "admin" && (
            <button
              onClick={() => (window.location.href = "/admin")}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Admin Panel
            </button>
          )}

          {/* 🔓 Logout */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;