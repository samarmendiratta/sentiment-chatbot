import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [sentiment, setSentiment] = useState('');

  const analyzeSentiment = async () => {
    const res = await fetch('http://localhost:5001/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    if (data.error) setResponse(data.error);
    else {
      setSentiment(data.sentiment);
      setResponse(data.response);
    }
  };

  return (
    <div className="App">
      <h1>Sentiment Chatbot</h1>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={analyzeSentiment}>Send</button>
      <p>Sentiment: {sentiment}</p>
      <p>Bot: {response}</p>
    </div>
  );
}

export default App;
