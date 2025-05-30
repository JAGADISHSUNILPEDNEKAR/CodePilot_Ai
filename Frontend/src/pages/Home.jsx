import { useEffect, useState } from 'react';

/**
 * Home component: displays a welcome message and any success messages from local storage
 */
export default function Home() {
  // State to store the welcome message
  const [message, setMessage] = useState('');

  /**
   * Effect hook to retrieve any success messages from local storage and display them on the page
   */
  useEffect(() => {
    // Get the success message from local storage
    const msg = localStorage.getItem('successMessage');

    // If a success message exists, display it on the page and then remove it from local storage
    if (msg) {
      setMessage(msg);
      localStorage.removeItem('successMessage');
    }
  }, []);

  return (
    // Render the welcome message and any success messages
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <h2>{message || 'Welcome to the Home Page!'}</h2>
    </div>
  );
}