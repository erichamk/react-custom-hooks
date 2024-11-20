import { useEffect, useState } from 'react';

const localCache = {};

export const useFetch = (url) => {
	const [state, setState] = useState({
		data: null,
		isLoading: true,
		hasError: false,
		error: null,
	});

	// para que se ejecute solo al montarse el component y no con cada cambio de state
	useEffect(() => {
		getFetch();
	}, [url]);

	const setLoadingState = () => {
		setState({
			data: null,
			isLoading: true,
			hasError: false,
			error: null,
		});
	};

	const getFetch = async () => {
		if (localCache[url]) {
			setState({
				data: localCache[url],
				isLoading: false,
				hasError: false,
				error: null,
			});
		} else {
			setLoadingState();

			// await new Promise((res) => setTimeout(res, 1000));
			const resp = await fetch(url);

			if (!resp.ok) {
				setState({
					data: null,
					isLoading: false,
					hasError: true,
					error: {
						code: resp.status,
						message: resp.statusText,
					},
				});

				return;
			}

			const data = await resp.json();
			// console.log(data);
			setState({
				data: data,
				isLoading: false,
				hasError: false,
				error: null,
			});

			// Manejo de cache
			localCache[url] = data;
		}
	};
	return {
		data: state.data,
		isLoading: state.isLoading,
		hasError: state.hasError,
	};
};
