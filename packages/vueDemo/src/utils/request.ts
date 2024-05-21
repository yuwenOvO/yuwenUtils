import axios from 'axios';

const http = axios.create({
	timeout: 2000,
});

// 响应拦截器
http.interceptors.response.use(
	response => {
		return response.data;
	},
	error => {
		return Promise.reject(error);
	},
);

export default http;
