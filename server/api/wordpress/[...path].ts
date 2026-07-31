export default defineEventHandler(async (event) => {
	const pathParam = getRouterParam(event, 'path');
	const path = Array.isArray(pathParam) ? pathParam.join('/') : pathParam;

	if (!path || !/^wp-json\/wp\/v2(?:\/[A-Za-z0-9_-]+)+$/.test(path)) {
		throw createError({
			statusCode: 400,
			message: '无效的 WordPress API 路径',
		});
	}

	const method = getMethod(event);
	if (!['GET', 'HEAD'].includes(method)) {
		throw createError({
			statusCode: 405,
			message: '仅支持只读请求',
		});
	}

	const runtimeConfig = useRuntimeConfig(event);

	try {
		const response = await $fetch.raw(`/${path}`, {
			baseURL: runtimeConfig.wordpressBaseUrl,
			method,
			query: getQuery(event),
		});
		const total = response.headers.get('x-wp-total');
		const totalPages = response.headers.get('x-wp-totalpages');

		if (total) {
			setResponseHeader(event, 'x-wp-total', total);
		}
		if (totalPages) {
			setResponseHeader(event, 'x-wp-totalpages', totalPages);
		}

		return response._data;
	} catch (error: any) {
		throw createError({
			statusCode: error?.response?.status || 502,
			message: error?.data?.message || 'WordPress 数据请求失败',
			data: error?.data,
		});
	}
});
