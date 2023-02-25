import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/minireset.css'
import './fonts.css'
import './styles/index.css'
import App from './components/app/App'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
