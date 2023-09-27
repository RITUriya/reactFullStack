import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Form, field } from "formik";

const Post = () => {
	const { id } = useParams();
	const [postDetail, setPostDetail] = useState({});
	const [commentDetail, setCommentDetail] = useState([]);
	const [inputComment, setInputComment] = useState("");
	useEffect(() => {
		// fetch(`http://localhost:3001/posts/${id}`)
		// 	.then((response) => {
		// 		response.json();
		// 		console.log(response);
		// 	})
		// 	.then((res) => setPostDetail(res));

		axios.get(`http://localhost:3001/posts/${id}`).then((response) => {
			console.log(response.data);
			setPostDetail(response.data);
		});
		axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
			console.log(response.data);
			setCommentDetail(response.data);
		});
	}, []);
	const onsubmit = () => {
		fetch(`http://localhost:3001/comments`, {
			method: "POST",
			mode: "cors",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ commentBody: inputComment, PostId: id }),
		})
			.then((res) => res.json())
			.then((res) => {
				const commentToAdd = { commentBody: inputComment, PostId: id };
				setCommentDetail([...commentDetail, commentToAdd]);
				console.log(commentDetail);
				setInputComment("");
			})
			.catch((err) => console.log(err.message));
		// axios
		// 	.post(`http://localhost:3001/comments`, {
		// 		commentBody: inputComment,
		// 		PostId: id,
		// 	})
		// 	.then((res) => {
		// 		const commentToAdd = { commentBody: inputComment, PostId: id };
		// 		setCommentDetail([...commentDetail, commentToAdd]);
		// 	});
	};
	return (
		<div className="mainContainer">
			<div className="postContainer">
				<div className="title">{postDetail.title}</div>
				<div className="body">{postDetail.postText}</div>
				<div className="footer">{postDetail.username}</div>
			</div>
			<div className="commentContainer" style={{ alignItems: "flex-end" }}>
				<div
					className="addCommentContainer"
					style={{ textAlign: "center", margin: "10px" }}>
					<input
						type="text"
						placeholder="add comment.."
						autoComplete="off"
						className="form-control"
						value={inputComment}
						style={{ margin: "10px", borderRadius: "5px" }}
						onChange={(obj) => setInputComment(obj.target.value)}></input>
					<button
						type="submit"
						onClick={onsubmit}
						style={{
							backgroundColor: "lightskyblue",
							borderRadius: "5px",
							margin: "10px",
						}}>
						Add Comment
					</button>
				</div>

				<div className="listOfComments">
					{commentDetail.map((comment, key) => {
						return (
							<div key={key} className="commentlist">
								{comment.commentBody}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Post;
