import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LostItems() {

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://lostandfounditem-1.onrender.com/api/items")
      // .get("http://localhost:5000/api/items")
      .then(res => {
        const lostItems = res.data.filter(item => item.type === "lost");
        setItems(lostItems);
      })
      .catch(err => console.log(err));
  }, []);

  const filteredItems = items.filter(item =>
    item.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        // backgroundImage: "url('/college.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        position: "relative"
      }}
    >

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)"
        }}
      />

      {/* Main Content */}
      <div
        style={{
          position: "relative",
          padding: "40px",
          maxWidth: "1200px",
          margin: "auto"
        }}
      >

        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px"
          }}
        >

          <button  style={{
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
            backdropFilter: "blur(8px)"}}
            onClick={() => navigate("/items")}
            
          >
            ← Back
          </button>

          <h1 style={{ color: "white", margin: 0 }}>
            Lost Items
          </h1>

          <div style={{ width: "80px" }}></div>

        </div>


        {/* Search */}
        <div style={{ marginBottom: "30px" }}>
          <input
            type="text"
            placeholder="Search lost item by description"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              maxWidth: "400px",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              outline: "none"
            }}
          />
        </div>


        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "25px"
          }}
        >

          {filteredItems.map(item => (

            <div
              key={item._id}
              style={{
                background: "white",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 8px 20px rgba(0,0,0,0.25)"
              }}
            >

              {item.image && (
                <img
                  src={`http://localhost:5000/uploads/${item.image}`}
                  alt="item"
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover"
                  }}
                />
              )}

              <div style={{ padding: "15px" }}>

                <p>
                  <b>Description:</b> {item.description}
                </p>

                <p>
                  <b>Location:</b> {item.location}
                </p>

                <p>
                  <b>Contact:</b> {item.contact}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default LostItems;