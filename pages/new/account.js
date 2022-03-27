import TopBar from "../../components/topBar";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { redirect } from "../../helpers";

const createNewAccount = () => {
	const createAccount = () => {
		const firstName = document.getElementById("firstName");
		const lastName = document.getElementById("lastName");
		const password = document.getElementById("password");
		const password2 = document.getElementById("password2");
		const email = document.getElementById("email");

		const nameRegex = /^[a-zA-Z]+$/g;
		const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

		// Field Validation
		if (!nameRegex.test(firstName)) {
			alert("Please enter a valid first name");
		} else if (!nameRegex.test(lastName)) {
			alert("Please enter a valid last name");
		} else if (password !== password2) {
			alert("Password and Confirm Password does not match");
		} else if (!emailRegex.test(email)) {
			alert("Please enter a valid email address");
		} else {
			// API Call
			// On Success -> Redirect to "/" with user Id
			if (isAccountCreated == true) redirect(router, `/?user=${userId}`);
			else redirect(router, "/new/account?message=failed");
		}
	};

	const {
		handleSubmit,
		formState: { errors },
	} = useForm();

	return (
		<div>
			<TopBar />
			<form onSubmit={handleSubmit(createAccount)} id="form">
				<div style={{ margin: "10px" }}>
					First Name: <input id="firstName" type="text" required></input>
				</div>
				<div style={{ margin: "10px" }}>
					Last Name: <input id="lastName" type="text" required></input>
				</div>
				<div style={{ margin: "10px" }}>
					Username: <input id="username" type="text" required></input>
				</div>
				<div style={{ margin: "10px" }}>
					Password: <input id="password" type="password" required></input>
				</div>
				<div style={{ margin: "10px" }}>
					Confirm Password: <input id="password2" type="password" required></input>
				</div>
				<div style={{ margin: "10px" }}>
					Email Address: <input id="email" type="text" required></input>
				</div>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default createNewAccount;
