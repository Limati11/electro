import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Telefoane from './pages/Telefoane';
import TelefonDetail from './pages/TelefonDetail';
import Laptopuri from './pages/Laptopuri';
import Gadgeturi from './pages/Gadgeturi';
import Tablete from './pages/Tablete';
import Accesorii from './pages/Accesorii';
import Televizoare from "./pages/Televizoare";
import Tradein from "./pages/Tradein"
import Gaming from './pages/Gaming';
import Call from './pages/Call';
import Magazine from './pages/Magazine';
import Conectare from './pages/Conectare';
import Exclusiv from './pages/Exclusiv';



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="telefoane" element={<Telefoane />} />
          <Route path="telefoane/:id" element={<TelefonDetail />} />
          <Route path="laptopuri" element={<Laptopuri />} />
          <Route path="gadgeturi" element={<Gadgeturi />} />
          <Route path="tablete" element={<Tablete />} />
          <Route path="accesorii" element={<Accesorii />} />
          <Route path="televizoare" element={<Televizoare />} />
          <Route path="tradein" element={<Tradein />} />
          <Route path="gaming" element={<Gaming />} />
          <Route path="call" element={<Call />} />
          <Route path="magazine" element={<Magazine />} />
          <Route path="conectare" element={<Conectare />} />
          <Route path="exclusiv" element={<Exclusiv />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// ReactDOM.createRoot(document.getElementById('root')).render(<App />);