import { useNavigate } from "react-router-dom";
import BackHome from "./BackHome";

function ViewItem() {

  const navigate = useNavigate();

  return (
    <div
      className="items-page"
      style={{
        backgroundImage: "url('/newaudi.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "20px",
        textAlign: "center",
        position: "relative"
      }}
    >

      {/* Back Button Wrapper */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px"
        }}
      >
        <BackHome
          style={{
            position: "relative",
            alignSelf: "flex-start",
            background: "rgba(255,255,255,0.25)",
            border: "1px solid rgba(255,255,255,0.6)",
            color: "white",
            padding: "8px 18px",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
            marginBottom: "30px",
            marginLeft: "10px",
            width: "100px",
            backdropFilter: "blur(8px)"
          }}
        />
      </div>

      <h1 style={{ color: "white", marginTop: "200px" }}>
        All Lost & Found Items
      </h1>

      <div className="filter-buttons">

        <button
          style={{ background: "white", color: "blue" }}
          className="filter-btn"
          onClick={() => navigate("/lost-items")}
        >
          View Lost Items
        </button>

        <button
          style={{ background: "white", color: "blue" }}
          className="filter-btn"
          onClick={() => navigate("/found-items")}
        >
          View Found Items
        </button>

      </div>

    </div>
  );
}

export default ViewItem;