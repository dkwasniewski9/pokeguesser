import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import Header from "./components/Header.tsx";
import GuessInput from "./components/GuessInput.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
      <Header/>
      <App />
      <GuessInput></GuessInput>
  </React.Fragment>,
)
