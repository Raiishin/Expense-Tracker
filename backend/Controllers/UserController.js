// User Controller
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, query, where } from "firebase/firestore/lite";
import config from "../config/index.js";
import { saltPassword } from "../../helpers/index.js";

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);
const users = collection(db, "users");

const index = async (req, res) => {
	const usersSnapshot = await getDocs(users);
	const usersData = usersSnapshot.docs.map((doc) => doc.data());
	return res.json({ usersData });
};

const view = async (req, res, next) => {
	try {
		const { username, password, email } = req.query;

		const searchQuery = query(
			users,
			where("username", "==", username),
			where("password", "==", saltPassword(password)),
			where("email", "==", email)
		);
		const usersData = await getDocs(searchQuery);

		// Error handling if there are no results
		if (usersData.docs.length == 0) return res.json({ message: "No such user" });
		else
			usersData.forEach((item) => {
				return res.json({ id: item.id });
			});
	} catch (err) {
		next(err);
	}
};

const create = async (req, res, next) => {
	try {
		const { firstName, lastName, username, password, email } = req.query;

		// Validate if user already exists using email
		const searchQuery = query(users, where("email", "==", email));
		const usersData = await getDocs(searchQuery);

		if (usersData.docs.length !== 0) return res.json({ message: "This email already exists" });

		// Create new user
		const resp = await addDoc(users, {
			first_name: firstName,
			last_name: lastName,
			username: username,
			password: saltPassword(password),
			email: email,
		});

		return res.json({ id: resp.id });
	} catch (err) {
		next(err);
	}
};

export default {
	index,
	view,
	create,
};
