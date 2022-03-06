import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./containers/home/Home";
import Login from "./containers/auth/Login";
import Register from "./containers/auth/Register";
import CreatePost from "./containers/post/CreatePost";

import { InfoProvider } from "./utility/InfoContext";

axios.defaults.baseURL = "http://localhost:5000";

function App() {
  return (
    <InfoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/receiver" element={<Register />} />
          <Route path="/register/donor" element={<Register />} />
          <Route path="/post/create" element={<CreatePost />} />
        </Routes>
      </Router>
    </InfoProvider>
  );
}

export default App;