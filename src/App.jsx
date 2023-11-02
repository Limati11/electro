import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Layout from './components/Layout';
import Accesorii from './pages/Accesorii';
import Apple from './pages/Apple';
import Conectare from './pages/Conectare';
import Exclusiv from './pages/Exclusiv';
import Gadgeturi from './pages/Gadgeturi';
import Gaming from './pages/Gaming';
import Home from './pages/Home';
import Laptopuri from './pages/Laptopuri';
import Tablete from './pages/Tablete';
import Telefoane from './pages/Telefoane';
import Magazine from './pages/Magazine';
import Call from './pages/Call';
import Tradein from "./pages/Tradein"
import Televizoare from "./pages/Televizoare"



export default function App() {
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
          <Route path="tablete" element={<Tablete />} />
          <Route path="telefoane" element={<Telefoane />} />
          <Route path="magazine" element={<Magazine />} />
          <Route path="call" element={<Call />} />
          <Route path="gaming" element={<Gaming />} />
          <Route path="televizoare" element={<Televizoare />} />
          <Route path="tradein" element={<Tradein />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// ReactDOM.createRoot(document.getElementById('root')).render(<App />);