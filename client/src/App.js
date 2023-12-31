import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";

function App() {
	return (
		<div className="App">
			<Router>
				<div className="navbar">
					<Link to="/createapost">Create a Post</Link>
					<Link to="/">Home</Link>
				</div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/createapost" element={<CreatePost />} />
					<Route path="/post/:id" element={<Post />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
