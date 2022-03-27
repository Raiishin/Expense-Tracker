import TopBar from "../components/topBar";
import checkUser from "../backend/index";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import errorMessages from "../components/messages/error";
import React, { useEffect } from "react";
import { redirect } from "../helpers";

const styling = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	textAlign: "center",
	minHeight: "300px",
};

const box = {
	width: "50%",
	height: "200px",
	padding: "10px",
	border: "5px solid gray",
	margin: "0",
};

const errorMessage = {
	width: "70%",
	height: "80px",
	color: "black",
	justifyContent: "center",
	alignItems: "center",
	display: "flex",
	marginTop: "100px",
};

const Login = () => {
	const router = useRouter();
	const { message } = router.query;
	console.log(message);

	useEffect(() => {
		const errorMessage = document.getElementById("errorMessage");
		if (message) {
			errorMessage.innerHTML = errorMessages.loginFailed;
			errorMessage.style.backgroundColor = "pink";
		} else {
			errorMessage.innerHTML = "";
			errorMessage.style.backgroundColor = "white";
		}

		document.getElementById("form").reset();
	}, []);

	const {
		handleSubmit,
		formState: { errors },
	} = useForm();

	const userLogin = async () => {
		const userId = await checkUser(username.value, password.value);

		if (userId !== null) redirect(router, `/?user=${userId}`);
		else redirect(router, "/login?message=failed");
	};

	return (
		<div>
			<TopBar />
			<div style={{ "text-align": "-webkit-center" }}>
				<div style={errorMessage}>
					<text id="errorMessage"></text>
				</div>
			</div>
			<div style={styling}>
				<div style={box}>
					<form onSubmit={handleSubmit(userLogin)} id="form">
						<div style={{ margin: "10px" }}>
							Username: <input id="username" type="text"></input>
						</div>
						<div style={{ margin: "10px" }}>
							Password: <input id="password" type="password"></input>
						</div>
						<div>
							<a href="/forget">Forget Password?</a> | <a href="/new/account">Create New Account</a>
						</div>
						<button type="submit">Login</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
