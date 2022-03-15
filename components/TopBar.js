import { useRouter } from "next/router";

const topBar = {
	height: "45%",
	width: "100%",
	backgroundColor: "grey",
};

const TopBar = () => {
	const router = useRouter();
	const redirect = async (location) => {
		await router.push(location);
	};

	return (
		<div style={topBar}>
			<button onClick={(e) => redirect("/")}>Home</button>
			<button onClick={(e) => redirect("/report")}>Report</button>
			<button onClick={(e) => redirect("/wallets")}>Wallets</button>
			<button onClick={(e) => redirect("/transactions")}>Transaction</button>
			<button style={{ float: "right" }} onClick={(e) => redirect("/login")}>
				Login
			</button>
		</div>
	);
};

export default TopBar;
