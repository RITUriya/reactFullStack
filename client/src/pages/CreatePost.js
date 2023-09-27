import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
	const [listOfPosts, setListOfPosts] = useState([]);
	let navigate = useNavigate();
	useEffect(() => {
		axios.get("http://localhost:3001/posts").then((response) => {
			setListOfPosts(response.data);
		});
	}, []);

	const initialValues = {
		title: "",
		postText: "",
		username: "",
	};
	const submit = (data) => {
		console.log(data);
		// axios.post("http://localhost:3001/posts", data).then((response) => {
		// 	console.log(response.data);
		// 	setListOfPosts(response.data);
		// });

		fetch("http://localhost:3001/posts", {
			// Enter your IP address here

			method: "POST",
			headers: { "Content-Type": "application/json" },
			mode: "cors",
			body: JSON.stringify(data), // body data type must match "Content-Type" header
		})
			.then((response) => response.json())
			.then((res) => {
				setListOfPosts(res.data);
				navigate("/");
			})
			.catch((rejected) => {
				console.log(rejected);
			});
	};
	const validationSchema = Yup.object().shape({
		title: Yup.string().required("Must enter title"),
		posts: Yup.string().required(),
		Username: Yup.string,
	});
	return (
		<div className="createPostPage">
			<Formik initialValues={initialValues} onSubmit={submit}>
				<Form className="formContainer">
					<label>Title: </label>
					<ErrorMessage name="title" component="span" />
					<Field
						id="inputCreatePost"
						name="title"
						placeholder="Title"
						autoComplete="off"
					/>
					<label>Posts: </label>
					<ErrorMessage name="postText" component="span" />
					<Field
						id="inputCreatePost"
						name="postText"
						placeholder="Posts"
						autoComplete="off"
					/>
					<label>Username: </label>
					<ErrorMessage name="username" component="span" />
					<Field
						id="inputCreatePost"
						name="username"
						placeholder="Username"
						autoComplete="off"
					/>
					<button type="submit">Create Post</button>
				</Form>
			</Formik>
		</div>
	);
};

export default CreatePost;
