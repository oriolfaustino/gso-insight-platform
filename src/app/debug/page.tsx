'use client';

export default function DebugPage() {
  const handleJSTest = () => {
    alert('JavaScript definitely works!');
    console.log('JS function called');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Debug Test Page</h1>
      
      <button
        onClick={() => alert('BASIC BUTTON WORKS!')}
        style={{
          backgroundColor: 'red',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        BASIC HTML BUTTON
      </button>

      <br /><br />

      <button onClick={handleJSTest} style={{
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        JS FUNCTION TEST
      </button>

      <p>If none of these buttons work, there&apos;s a serious JavaScript issue.</p>
    </div>
  );
}