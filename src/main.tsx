import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import './styles/index.css'
import Header from "./components/Header.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
      <Header/>
      <App />
  </React.Fragment>,
)
