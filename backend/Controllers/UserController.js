// User Controller
import { initializeApp } from "firebase/app";
import {
	getFirestore,
	collection,
	getDocs,
	setDoc,
	addDoc,
	doc,
	query,
	where,
} from "firebase/firestore/lite";
import config from "../../config/index.js";

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);
const users = collection(db, "users");

const index = async (req, res) => {
	const usersSnapshot = await getDocs(users);
	const usersData = usersSnapshot.docs.map((doc) => doc.data());
	return res.json({ usersData });
};

const view = async (req, res) => {
	const { username, password, email } = req.query;
	const q = query(
		users,
		where("username", "==", username),
		where("password", "==", password),
		where("email", "==", email)
	);
	const search = await getDocs(q);

	// Error handling if there are no results
	if (search._docs.length == []) return res.json({ message: "No such user" });
	else
		search.forEach((item) => {
			return res.json({ id: item.id });
		});
};

const create = async (req, res) => {
	const { firstName, lastName, username, password, email } = req.query;

	// Validate if user already exists using email
	const q = query(users, where("email", "==", email));
	const search = await getDocs(q);

	if (search._docs.length !== []) return res.json({ message: "This email already exists" });

	// Create new user
	const resp = await addDoc(users, {
		firstName: firstName,
		lastName: lastName,
		username: username,
		password: password,
		email: email,
	});

	return res.json({ id: resp.id });
};

export default {
	index,
	view,
	create,
};
