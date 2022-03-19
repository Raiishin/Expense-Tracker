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

	console.log(usersData);

	// Query users
	console.log("query");
	const q = query(users, where("username", "==", username), where("password", "==", password));
	const search = await getDocs(q);
	console.log(search._docs.length);

	if (search._docs.length <= 0) return false;

	search.forEach((item) => {
		console.log(item.data());
	});
	return true;

	// Get wallets
	// const wallets = collection(db, "wallets");
};
// checkUser("test_username", "test_password");

export default checkUser;
