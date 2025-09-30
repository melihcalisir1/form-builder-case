import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // ✨ Bootstrap import
import "react-form-builder2/dist/app.css";
import "./index.css";
import $ from "jquery";
window.$ = $;
window.jQuery = $;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);