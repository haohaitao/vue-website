// https://nuxt.com/docs/api/configuration/nuxt-config
import { siteConfig } from "./site.config";

export default defineNuxtConfig({
    app: {
        baseURL: "/",
        head: {
            htmlAttrs: {
                lang: siteConfig.lang,
            },
            meta: [
                {
                    name: "viewport",
                    content:
                        "width=device-width,initial-scale=1.0,user-scalable=0",
                },
                {
                    charset: "utf-8",
                },
            ],
            link: [{ rel: "icon", href: "/favicon.ico", type: "image/x-icon" }],
            style: [],
            script: [
                {
                    type: "text/javascript",
                    src: "https://webapi.amap.com/maps?v=1.4.15&key=b023d63b4c29817c75cd7427272eb7e5&plugin=AMap.CitySearch",
                },
            ],
            noscript: [],
        },
    },
    css: [
        "~/assets/animate.css",
        "~/assets/highlight.css",
        "element-plus/dist/index.css",
        "element-plus/theme-chalk/display.css",
    ],
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    runtimeConfig: {
        public: {
            isClient: true,
        },
        app: {
            title: "郝海涛的个人网站",
            BASE_URL: "https://www.haoht123.com",
        },
    },
    nitro: {},
    modules: [
        "@element-plus/nuxt",
        "dayjs-nuxt",
        "@nuxt/eslint",
        "@nuxtjs/tailwindcss",
        [
            "@pinia/nuxt",
            {
                autoImports: [
                    // 自动引入 `defineStore()`
                    "defineStore",
                ],
            },
        ],
        "pinia-plugin-persistedstate/nuxt",
    ],
    build: {
        transpile: [/^@nuxtjs\/tailwindcss$/],
    },
});
