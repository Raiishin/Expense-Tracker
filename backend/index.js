// Import the functions you need from the SDKs you need
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
import config from "./config/index.js";

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);
const users = collection(db, "users");

const checkUser = async (username, password) => {
	// (TEST) Create users
	// await setDoc(doc(users), {
	//  id: 3,
	//  username: "test_username_3",
	//  password: "test_password_3",
	// });

	// Get users
	const usersSnapshot = await getDocs(users);
	const usersData = usersSnapshot.docs.map((doc) => doc.data());

	// Query users
	console.log("query");
	const q = query(users, where("username", "==", username), where("password", "==", password));
	const search = await getDocs(q);

	if (search._docs.length <= 0) return null;

	let userId;
	search.forEach((item) => {
		const { id } = item.data();
		userId = id;
	});

	return userId;
	// Get wallets
	// const wallets = collection(db, "wallets");
};

export default checkUser;
