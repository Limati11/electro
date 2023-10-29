import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import './index.css'
import Layout from "./components/Layout"
import Accesorii from "./pages/Accesorii"
import Apple from "./pages/Apple"
import Conectare from "./pages/Conectare"
import Exclusiv from "./pages/Exclusiv"
import Gadgeturi from "./pages/Gadgeturi"
import Home from "./pages/Home"
import Laptopuri from "./pages/Laptopuri"
import Next from "./pages/Next"
import Tablete from "./pages/Tablete"
import Telefoane from "./pages/Telefoane"


function App() {


    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="accesorii" element={<Accesorii />} />
            <Route path="apple" element={<Apple />} />
            <Route path="conectare" element={<Conectare />} />
            <Route path="exclusiv" element={<Exclusiv />} />
            <Route path="gadgeturi" element={<Gadgeturi />} />
            <Route path="laptopuri" element={<Laptopuri />} />
            <Route path="next" element={<Next />} />
            <Route path="tablete" element={<Tablete />} />
            <Route path="telefoane" element={<Telefoane />} />

          </Route>



        </Routes>
      </BrowserRouter>
    )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);