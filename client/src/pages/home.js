import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
	const [listOfPosts, setListOfPosts] = useState([]);
	useEffect(() => {
		axios.get("http://localhost:3001/posts").then((response) => {
			console.log(response.data);
			setListOfPosts(response.data);
		});
	}, []);
	return (
		<div>
			{" "}
			<h1>
				{/* https://www.youtube.com/watch?v=lxroBmTiOhI&list=PLpPqplz6dKxUaZ630TY1BFIo5nP-_x-nL&index=4 */}
			</h1>
			{listOfPosts.map((value, index) => {
				return (
					<div
						className="post"
						key={index}
						onClick={() => {
							navigate(`/post/${value.id}`);
						}}>
						<div className="title">{value.title}</div>
						<div className="body">{value.postText}</div>
						<div className="footer">{value.username}</div>
					</div>
				);
			})}
		</div>
	);
};

export default Home;
