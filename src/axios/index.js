import axios from "axios";

const instance = axios.create({
	baseURL: "https://hoangnm-json.onrender.com",
	timeout: 3000,
	headers: {
		"Content-Type": "application/json",
	},
});
export default instance;
