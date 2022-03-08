import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./containers/home/Home";
import About from "./containers/about/About";
import Login from "./containers/auth/Login";
import Register from "./containers/auth/Register";
import CreatePost from "./containers/post/CreatePost";
import { InfoProvider } from "./utility/InfoContext";

axios.defaults.baseURL = "http://localhost:5100";

function App() {
  return (
    <InfoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post/create" element={<CreatePost />} />
        </Routes>
      </Router>
    </InfoProvider>
  );
}

export default App;
