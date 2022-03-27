// User Controller
import { initializeApp } from "firebase/app";
import {
	getFirestore,
	collection,
	getDocs,
	setDoc,
	doc,
	query,
	where,
} from "firebase/firestore/lite";
import config from "../config/index.js";

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
	const { username, password } = req.query;
	const q = query(users, where("username", "==", username), where("password", "==", password));
	const search = await getDocs(q);

	// Error handling if there are no results
	if (search._docs.length == []) return res.json({ message: "No such user" });
	else {
		let userId;
		search.forEach((item) => {
			const { id } = item.data();
			userId = id;
		});
		return res.json({ userId });
	}
};

const create = async (req, res) => {
	const resp = await setDoc(doc(users), {
		firstName: req.firstName,
		lastName: req.lastName,
		username: req.username,
		password: req.password,
		email: req.email,
	});

	console.log(resp);
	return res.json({ resp });
};

export default {
	index,
	view,
	create,
};
