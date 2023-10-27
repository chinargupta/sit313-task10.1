import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Mail.css';

function EmailBanner() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Get the navigate function

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:4000/subscribe", { 
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });

    if (response.ok) {
        setEmail("");
        console.log("Email sent successfully!");
    } else {
        console.error("Error sending email:", response.statusText);
    }

      // Redirect to the "thank you" page
      navigate('/thank-you');
    } catch (error) {
      console.error("Error sending email:", error.message);
    }
  };

  // Rest of your component code

  return (
    // Your JSX code for the EmailBanner component
    <div className="emailbox">
        <div className="emailbox-form">
            <h1>SIGN UP FOR OUR DAILY INSIDER</h1>
        
            <input
            id="emailInput"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        
            <button onClick={handleSubscribe} type="submit" className="emailbutton">Subscribe</button>
        </div>
    </div>
  );
}

export default EmailBanner;
