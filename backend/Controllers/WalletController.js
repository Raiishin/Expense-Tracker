// User Controller
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, query, where } from "firebase/firestore/lite";
import config from "../config/index.js";

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);
const wallets = collection(db, "wallets");

const index = async (req, res, next) => {
	try {
		const { user_id } = req.query;
		const searchQuery = query(wallets, where("user_id", "==", user_id));
		const walletsSnapshot = await getDocs(searchQuery);
		const walletsData = walletsSnapshot.docs.map((doc) => doc.data());
		return res.json({ walletsData });
	} catch (err) {
		next(err);
	}
};

const view = async (req, res, next) => {
	try {
		const { user_id, name } = req.query;
		const searchQuery = query(wallets, where("user_id", "==", user_id), where("name", "==", name));
		const walletsData = await getDocs(searchQuery);

		// Error handling if there are no results
		if (walletsData.docs.length == 0) return res.json({ message: "No such wallet" });
		else
			walletsData.forEach((item) => {
				return res.json({ id: item.id });
			});
	} catch (err) {
		next(err);
	}
};

const create = async (req, res, next) => {
	try {
		const { name, type, user_id } = req.query;
		// Validate if wallet already exists
		const searchQuery = query(
			wallets,
			where("name", "==", name),
			where("type", "==", type),
			where("user_id", "==", user_id)
		);
		const walletsData = await getDocs(searchQuery);

		if (walletsData.docs.length !== 0) return res.json({ message: "This wallet already exists" });

		// Create new wallet
		const resp = await addDoc(wallets, {
			name: name,
			type: type,
			user_id: user_id,
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
