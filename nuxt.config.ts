// https://nuxt.com/docs/api/configuration/nuxt-config
import { siteConfig } from './site.config';

export default defineNuxtConfig({
	app: {
		baseURL: '/',
		head: {
			htmlAttrs: {
				lang: siteConfig.lang,
			},
			meta: [
				{
					name: 'viewport',
					content: 'width=device-width,initial-scale=1.0,user-scalable=0',
				},
				{
					charset: 'utf-8',
				},
			],
			link: [
				{
					rel: 'shortcut icon',
					type: 'image/x-icon',
					href: '/favicon.ico',
				},
				{
					rel: 'shortcut icon',
					type: 'image/x-icon',
					href: '/favicon.ico',
				},
				{
					rel: 'stylesheet',
					href: 'https://img.haohaitao.cn/code-highlight/v1.0.0/code-highlight.css',
				},
			],
			style: [],
			script: [
				{
					src: 'https://img.haohaitao.cn/code-highlight/v1.0.0/highlight.min.js',
					defer: true,
				},
				{
					src: 'https://img.haohaitao.cn/code-highlight/v1.0.0/code-highlight.js',
					defer: true,
				},
			],
			noscript: [],
		},
	},
	site: {
		url: siteConfig.url,
		name: '郝海涛的个人网站',
	},
	css: ['~/assets/animate.css', '~/assets/themes.css', 'element-plus/theme-chalk/display.css'],
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },
	runtimeConfig: {
		wordpressBaseUrl: 'https://www.haohaitao.cn',
		public: {
			isClient: true,
			title: '郝海涛的个人网站',
		},
	},
	nitro: {},
	elementPlus: {
		importStyle: 'css',
		themes: ['dark'],
		defaultLocale: 'zh-cn',
		cache: true,
	},
	modules: [
		'@element-plus/nuxt',
		'@nuxt/eslint',
		'@nuxtjs/tailwindcss',
		[
			'@pinia/nuxt',
			{
				autoImports: [
					// 自动引入 `defineStore()`
					'defineStore',
				],
			},
		],
		'pinia-plugin-persistedstate/nuxt',
		'@vueuse/nuxt',
		'@nuxtjs/sitemap',
	],
	sitemap: {
		sources: ['/api/sitemap'],
		cacheMaxAgeSeconds: 604800, // 7 day
	},
	build: {
		transpile: [/^@nuxtjs\/tailwindcss$/],
	},
});
