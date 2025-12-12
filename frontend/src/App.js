import { useEffect, useState } from 'react';

function App() {
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // call your backend
    fetch('http://localhost:5000/api/theatres')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch theatres');
        }
        return res.json();
      })
      .then((data) => {
        setTheatres(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Could not load theatres.');
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '16px' }}>
      <h1>North Star Movie Theatres</h1>
      <p>Customer view – list of theatres from database.</p>

      {loading && <p>Loading theatres...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
            marginTop: '16px',
          }}
        >
          {theatres.map((theatre) => (
            <div
              key={theatre.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              }}
            >
              <h2 style={{ margin: '0 0 8px' }}>{theatre.name}</h2>
              <p style={{ margin: 0 }}>
                <strong>City:</strong> {theatre.city}
              </p>
              {theatre.address && (
                <p style={{ margin: '4px 0' }}>
                  <strong>Address:</strong> {theatre.address}
                </p>
              )}
              {theatre.phone && (
                <p style={{ margin: '4px 0' }}>
                  <strong>Phone:</strong> {theatre.phone}
                </p>
              )}
              {theatre.auditorium_count && (
                <p style={{ margin: '4px 0' }}>
                  <strong>Auditoriums:</strong> {theatre.auditorium_count}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
