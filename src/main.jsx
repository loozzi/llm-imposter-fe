import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { history } from './configs/history.js'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <HistoryRouter history={history}>
    <App />
  </HistoryRouter>
  // </StrictMode>
)
