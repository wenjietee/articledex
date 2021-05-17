import Axios from 'axios';

let base = 'https://localhost:8000';

Axios.interceptors.request.use(
	(config) => {
		// set token in request header
		config.headers.Authorization = `Bearer ${localStorage.access}`;
		return config;
	},
	(error) => {
		{
			return Promise.reject(error);
		}
	}
);

Axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		const originalRequest = error.config;
		let refreshToken = localStorage.refresh;

		// get new tokens
		if (
			refreshToken &&
			error.response.status === 401 &&
			!originalRequest._retry
		) {
			originalRequest._retry = true;
			return Axios.post(`${base}/api/token/`, {
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
