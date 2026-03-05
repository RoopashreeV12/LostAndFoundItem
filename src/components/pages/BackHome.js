import { useNavigate } from "react-router-dom";

function BackHome({ color = "black" }) {

  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      style={{
        background: "transparent",
        border: "none",
        color: color,
        fontSize: "16px",
        cursor: "pointer",
        fontWeight: "600"
      }}
    >
      ← Home
    </button>
  );
}

export default BackHome;