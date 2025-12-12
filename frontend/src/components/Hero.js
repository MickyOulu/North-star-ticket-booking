function Hero({ city, setCity }) {
  return (
    <div
      style={{
        background: "#2563EB",
        color: "white",
        padding: "60px 24px",
        textAlign: "center",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "40px" }}>
        Find a theatre near you
      </h1>

      <p style={{ marginTop: "12px", fontSize: "18px", opacity: 0.95 }}>
        Choose a city and book tickets easily
      </p>

      <div style={{ marginTop: "18px" }}>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            width: "260px",
            height: "40px",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            padding: "0 12px",
          }}
        >
          <option value="All">All Cities</option>
          <option value="Oulu">Oulu</option>
          <option value="Turku">Turku</option>
          <option value="Helsinki">Helsinki</option>
        </select>
      </div>
    </div>
  );
}

export default Hero;
