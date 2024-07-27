import React from 'react';
import ReactDOM from 'react-dom/client';
import AntiBot from "./AntiBot.jsx";

const siteKey = 'YOUR_RECAPTCHA_SITE_KEY' // "6LeFKxYqAAAAAMTob6fCoL870FUAzcOB4nqI9WL8" For Local Host;
const veriKey = 'YOUR_VERIFICATION_KEY';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AntiBot siteKey={siteKey} veriKey={veriKey} />
  </React.StrictMode>,
)
