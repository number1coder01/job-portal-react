// main.jsx is the entry point
import { StrictMode } from 'react'
// react dom library allows us to work with the dom of browser 
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// EeactDOM mei createRoot 
// strictmode se depreceated vgrh ya kuch aisi prblms sorted 
createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <App />
  </StrictMode>,
)
