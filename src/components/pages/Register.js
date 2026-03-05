import { useState } from "react";
import axios from "axios";
import BackHome from "./BackHome";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {

    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setType("error");
      setMessage("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setType("error");
      setMessage("Passwords do not match");
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/admin/register",
        form
      );

      setType("success");
      setMessage(res.data.message || "Registration successful!");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {

      setType("error");
      setMessage(
        error?.response?.data?.message || "Registration failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (

    <div
      style={{
        backgroundImage: "url('/newfront.jpeg')",
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

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.35)"
        }}
      />

      {/* Home Button */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 2
        }}
      >
        <BackHome color="white" />
      </div>

      {/* Register Card */}
      <div
        style={{
          width: "90%",
          maxWidth: "420px",
          padding: "35px",
          borderRadius: "12px",
          background: "rgba(255,255,255,0.1)",
           backdropFilter: "blur(10px)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          position: "relative",
          zIndex: 1,
          textAlign: "center"
        }}
      >

        <h1 style={{ color: "white" }}>Register</h1>

        {/* Username */}
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
          style={inputStyle}
        />

        {/* Email */}
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          style={inputStyle}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          style={inputStyle}
        />

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
          style={inputStyle}
        />

        {/* Register Button */}
        <button
          style={buttonStyle}
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Login Link */}
        <p style={{ color: "white", fontSize: "18px" }}>
          Already have an account?{" "}
          <Link style={{ color: "#00c6ff", fontWeight: "bold" }} to="/login">
            Login
          </Link>
        </p>

        {/* Message */}
        {message && (
          <div
            style={{
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

const inputStyle = {
  padding: "12px",
  borderRadius: "6px",
  border: "none",
  outline: "none",
  width: "100%"
};

const buttonStyle = {
  padding: "12px",
  borderRadius: "6px",
  border: "none",
  background: "linear-gradient(45deg,#0072ff,#00c6ff)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer"
};

export default Register;