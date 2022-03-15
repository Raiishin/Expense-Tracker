import TopBar from "../components/TopBar";

const styling = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	textAlign: "center",
	minHeight: "100vh",
};

const box = {
	width: "50%",
	height: "200px",
	padding: "10px",
	border: "5px solid gray",
	margin: "0",
};

const Login = () => {
	const userLogin = async () => {
		const username = document.getElementById("username");
		const password = document.getElementById("password");

		console.log(username, password);
		return username;
	};

	return (
		<div>
			<TopBar />
			<div style={styling}>
				<div style={box}>
					<form onSubmit={(e) => userLogin()}>
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
