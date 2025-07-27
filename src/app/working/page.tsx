'use client';

import { useState, useEffect } from 'react';

export default function WorkingPage() {
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Fix hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Working React Page</h1>
      
      <button
        onClick={() => {
          alert('React button works!');
          setShowModal(true);
        }}
        style={{
          backgroundColor: 'green',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          margin: '10px'
        }}
      >
        Test React Button
      </button>

      <p>Modal State: {showModal ? 'OPEN' : 'CLOSED'}</p>

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <h2>Modal Works!</h2>
            <button
              onClick={() => setShowModal(false)}
              style={{
                backgroundColor: 'blue',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Close Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}