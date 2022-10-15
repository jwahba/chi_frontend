import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./components/Home";
import Login from "./components/auth/Login";
import LibraryHome from "./components/library/List";
import SearchResult from "./components/library/SearchResult";

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <Router style={{ width: "100%" }}>
      <div>
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/login" exact={true} element={<Login />} />
          <Route path="/library" exact={true} element={<LibraryHome />} />
          <Route
            path="/library/search"
            exact={true}
            element={<SearchResult />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
