import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.Fragment>
        <Header/>
        <App/>
        <Footer />
    </React.Fragment>,
)
