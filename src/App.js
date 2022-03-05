import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./containers/home/Home";
import Login from "./containers/auth/Login";
import Register from "./containers/auth/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
