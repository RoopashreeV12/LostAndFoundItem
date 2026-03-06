import { useState } from "react";
import axios from "axios";
import BackHome from "./BackHome";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    if (!email || !password) {
      setType("error");
      setMessage("Please enter email and password");
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post(
        // "https://lostandfounditem-1.onrender.com/api/admin/login",
        "http://localhost:5000/api/admin/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);

      setType("success");
      setMessage("Login successful! Redirecting...");

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {

      setType("error");
      setMessage(error?.response?.data?.message || "Login failed");

    } finally {
      setLoading(false);
    }
  };

  return (

    <div
      style={{
        backgroundImage: "url('/rakgreen.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        fontFamily: "Arial"
      }}
    >

      {/* Home Button */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px"
        }}
      >
        <BackHome color="white" />
      </div>

      {/* Login Card */}
      <div
        style={{
          width: "500px",
          
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
          borderRadius: "12px",
          padding: "40px",
          textAlign: "center",
          boxShadow: "0 8px 30px rgba(0,0,0,0.3)"
        }}
      >

        <h1 style={{ color: "white", marginBottom: "25px" }}>
          Login
        </h1>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "6px",
            border: "none",
            outline: "none"
          }}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "6px",
            border: "none",
            outline: "none"
          }}
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: "blue",
            backgroundImage: "linear-gradient(45deg,#0072ff,#00c6ff)",
            border: "none",
            color: "white",
            fontWeight: "bold",
            borderRadius: "6px",
            cursor: "pointer",
            marginBottom: "20px"
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register */}
        <p style={{ color: "white" }}>
          Already have an account?{" "}
          <Link to="/register" style={{ color: "blue", fontWeight: "bold" }}>
            Register
          </Link>
        </p>

        {/* Message */}
        {message && (
          <div
            style={{
              marginTop: "15px",
              padding: "10px",
              borderRadius: "6px",
              fontWeight: "bold",
              color: type === "success" ? "#155724" : "red",
              background:
                type === "success"
                  ? "#d4edda"
                  : "#f8d7da"
            }}
          >
            {message}
          </div>
        )}

      </div>

    </div>
  );
}

export default Login;