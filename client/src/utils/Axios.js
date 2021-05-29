import Axios from 'axios';

let base = process.env.REACT_APP_URL;

Axios.interceptors.request.use(
	(config) => {
		// delete auth header if url matches regex
		if (config.url.match(/login|register/g)) {
			delete config.headers['Authorization'];
		} else {
			//set token in request header
			config.headers.Authorization = `Bearer ${localStorage.access}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

Axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		console.log(error.response);
		const originalRequest = error.config;
		let refreshToken = localStorage.refresh;

		// get new tokens
		if (
			refreshToken &&
			error.response.status === 401 &&
			!originalRequest._retry
		) {
			originalRequest._retry = true;
			return Axios.post(`/api/token/`, {
				refresh: refreshToken,
			}).then((res) => {
				if (res.status === 200) {
					localStorage.setItem('access', res.data.access);
					localStorage.setItem('refresh', res.data.refresh);

					return Axios(originalRequest);
				}
			});
		}
		return Promise.reject(error);
	}
);

export default Axios;
