import type { FetchOptions } from 'ofetch';

export interface ApiResponse<T = unknown> {
	data: T;
	total: number;
	totalPages: number;
}

const fetchData = async <T>(url: string, options: FetchOptions = {}): Promise<ApiResponse<T>> => {
	if (typeof url !== 'string' || !url.startsWith('/')) {
		throw new TypeError('API 地址必须是以 / 开头的字符串');
	}

	const runtimeConfig = useRuntimeConfig();
	const requestUrl = import.meta.server
		? `${runtimeConfig.wordpressBaseUrl}${url}`
		: `/api/wordpress${url}`;
	const response = await $fetch.raw<T>(requestUrl, options);

	return {
		data: response._data as T,
		total: Number(response.headers.get('x-wp-total') || 0),
		totalPages: Number(response.headers.get('x-wp-totalpages') || 0),
	};
};

export default new (class Http {
	get<T = unknown>(url: string, params: Record<string, unknown> = {}) {
		return fetchData<T>(url, { method: 'GET', query: params });
	}

	post<T = unknown>(url: string, body: unknown) {
		return fetchData<T>(url, { method: 'POST', body });
	}
})();
