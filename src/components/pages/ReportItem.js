import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ReportItem() {

  const navigate = useNavigate();

  const [lost, setLost] = useState({
    category: "",
    description: "",
    contact: "",
    image: null
  });

  const [found, setFound] = useState({
    location: "",
    description: "",
    contact: "",
    image: null
  });

  const submitLost = async () => {
    try {

      const formData = new FormData();
      formData.append("category", lost.category);
      formData.append("description", lost.description);
      formData.append("contact", lost.contact);
      formData.append("image", lost.image);

      await axios.post(
        "https://lostandfounditem-1.onrender.com/api/lost",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Lost item reported successfully");

      setLost({
        category: "",
        description: "",
        contact: "",
        image: null
      });

    } catch (err) {
      alert("Failed to report lost item");
    }
  };

  const submitFound = async () => {
    try {

      const formData = new FormData();
      formData.append("location", found.location);
      formData.append("description", found.description);
      formData.append("contact", found.contact);
      formData.append("image", found.image);

      await axios.post(
        "http://localhost:5000/api/found",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Found item reported successfully");

      setFound({
        location: "",
        description: "",
        contact: "",
        image: null
      });

    } catch (err) {
      alert("Failed to report found item");
    }
  };

  return (
    <>
      {/* Placeholder style only for this page */}
      <style>
        {`
          .report-page input::placeholder,
          .report-page textarea::placeholder {
            color: white;
            opacity: 1;
          }
        `}
      </style>

      <div
        className="report-page"
        style={{
          backgroundImage: "url('/college.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px",
          position: "relative"
        }}
      >

        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.45)"
          }}
        />

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
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
        >
          ← Home
        </button>

        <div
          style={{
            position: "relative",
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
            justifyContent: "center"
          }}
        >

          {/* LOST CARD */}
          <div
            style={{
              width: "350px",
              padding: "25px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
            }}
          >

            <h2 style={{ color: "white",textAlign:"center" }}>Report Lost Item</h2>

            <input
              placeholder="Category"
              value={lost.category}
              style={{
                background: "rgba(255,255,255,0.25)",
                border: "1px solid rgba(255,255,255,0.6)",
                color: "white",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px"
              }}
              onChange={e => setLost({ ...lost, category: e.target.value })}
            />

            <textarea
              placeholder="Description"
              value={lost.description}
              style={{
                background: "rgba(255,255,255,0.25)",
                border: "1px solid rgba(255,255,255,0.6)",
                color: "white",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px"
              }}
              onChange={e => setLost({ ...lost, description: e.target.value })}
            />

            <input
              placeholder="Contact Number"
              value={lost.contact}
              style={{
                background: "rgba(255,255,255,0.25)",
                border: "1px solid rgba(255,255,255,0.6)",
                color: "white",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px"
              }}
              onChange={e => setLost({ ...lost, contact: e.target.value })}
            />

            <input
              type="file"
              accept="image/*"
              style={{
                background: "rgba(255,255,255,0.25)",
                border: "1px solid rgba(255,255,255,0.6)",
                color: "white",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px"
              }}
              onChange={e => setLost({ ...lost, image: e.target.files[0] })}
            />

            {lost.image && (
              <img
                src={URL.createObjectURL(lost.image)}
                alt="preview"
                style={{ width: "100%", marginTop: "10px", borderRadius: "8px" }}
              />
            )}

            <button
              style={{
                background:"white",
                color:"blue"
              }}
              onClick={submitLost}
            >
              Submit Lost Item
            </button>

          </div>


          {/* FOUND CARD */}
          <div
            style={{
              width: "350px",
              padding: "25px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
            }}
          >

            <h2 style={{ color: "white",textAlign:"center" }}>Report Found Item</h2>

            <input
              placeholder="Location Found"
              value={found.location}
              style={{
                background: "rgba(255,255,255,0.25)",
                border: "1px solid rgba(255,255,255,0.6)",
                color: "white",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px"
              }}
              onChange={e => setFound({ ...found, location: e.target.value })}
            />

            <textarea
              placeholder="Description"
              value={found.description}
              style={{
                background: "rgba(255,255,255,0.25)",
                border: "1px solid rgba(255,255,255,0.6)",
                color: "white",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px"
              }}
              onChange={e => setFound({ ...found, description: e.target.value })}
            />

            <input
              placeholder="Contact Number"
              value={found.contact}
              style={{
                background: "rgba(255,255,255,0.25)",
                border: "1px solid rgba(255,255,255,0.6)",
                color: "white",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px"
              }}
              onChange={e => setFound({ ...found, contact: e.target.value })}
            />

            <input
              type="file"
              accept="image/*"
              capture="environment"
              style={{
                background: "rgba(255,255,255,0.25)",
                border: "1px solid rgba(255,255,255,0.6)",
                color: "white",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px"
              }}
              onChange={e => setFound({ ...found, image: e.target.files[0] })}
            />

            {found.image && (
              <img
                src={URL.createObjectURL(found.image)}
                alt="preview"
                style={{ width: "100%", marginTop: "10px", borderRadius: "8px" }}
              />
            )}

            <button
              style={{
                background:"white",
                color:"blue"
              }}
              onClick={submitFound}
            >
              Submit Found Item
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default ReportItem;