import colors from "../styles/colors";

function Hero({ city, setCity, theatres = [] }) {
  // build unique city list from theatres
  const cities = Array.from(new Set(theatres.map((t) => t.city))).sort();

  return (
    <div style={{
        background: `linear-gradient(180deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        color: colors.card,
        padding: "60px 24px",
        textAlign: "center",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "40px" }}>Find a theatre near you</h1>

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

          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Hero;
