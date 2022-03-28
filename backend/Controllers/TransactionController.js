// User Controller
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, query, where } from "firebase/firestore/lite";
import config from "../config/index.js";

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);
const transactions = collection(db, "transactions");

const index = async (req, res, next) => {
	try {
		const { user_id } = req.query;
		const searchQuery = query(transactions, where("user_id", "==", user_id));
		const transactionsSnapshot = await getDocs(searchQuery);
		const transactionsData = transactionsSnapshot.docs.map((doc) => doc.data());
		return res.json({ transactionsData });
	} catch (err) {
		next(err);
	}
};

const view = async (req, res, next) => {
	try {
		const { user_id, wallet_name } = req.query;
		const searchQuery = query(
			transactions,
			where("user_id", "==", user_id),
			where("wallet_name", "==", wallet_name)
		);
		const transactionsSnapshot = await getDocs(searchQuery);
		const transactionsData = transactionsSnapshot.docs.map((doc) => doc.data());
		return res.json({ transactionsData });
	} catch (err) {
		next(err);
	}
};

const create = async (req, res, next) => {
	try {
		const { description, date, amount, user_id, wallet_name } = req.query;

		const wallets = collection(db, "wallets");
		const walletQuery = query(
			wallets,
			where("user_id", "==", user_id),
			where("name", "==", wallet_name)
		);
		const walletData = await getDocs(walletQuery);

		// Error handling if there are no results
		if (walletData.docs.length == 0) return res.json({ message: "No such wallet" });

		const searchQuery = query(
			transactions,
			where("description", "==", description),
			where("date", "==", date),
			where("amount", "==", amount),
			where("user_id", "==", user_id),
			where("wallet_name", "==", wallet_name)
		);
		const transactionsData = await getDocs(searchQuery);

		if (transactionsData.docs.length !== 0)
			return res.json({ message: "This transaction already exists" });

		// Create new wallet
		const resp = await addDoc(transactions, {
			description: description,
			date: date,
			amount: amount,
			user_id: user_id,
			wallet_name: wallet_name,
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
