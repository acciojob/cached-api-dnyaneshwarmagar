import React, { useState, useEffect, useMemo } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(jsonData => {
          setData(jsonData);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  // Memoize the data to prevent re-fetching when the component re-renders
  const memoizedData = useMemo(() => data, [data]);

  return (
    <div className="App">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Posts</h2>
          <ul>
            {memoizedData && memoizedData.map(post => (
              <li key={post.id}>
                <h4>{post.title}</h4>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
