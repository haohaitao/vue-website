<template>
    <NuxtLayout name="default">
        <NuxtPage />
    </NuxtLayout>
</template>
<script setup>
import { siteConfig } from "~/site.config";

useHead({
    titleTemplate: (productCategory) => {
        return productCategory
            ? `${productCategory}-${siteConfig.title}`
            : siteConfig.title;
    },
    meta: [
        {
            name: "keywords",
            content: siteConfig.keywords,
        },
        {
            name: "description",
            content: siteConfig.description,
        },
    ],
});
</script>
<style>
* {
    margin: 0;
}
#__nuxt {
    text-align: center;
    color: #2c3e50;
}
html {
    cursor: url("~/assets/cur/pointer.cur"), default;
    font-size: 12px;
}
body {
    font-size: 12px;
    line-height: 1.5;
    color: #515a6e;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
img {
    max-width: 700px;
}
a {
    cursor: url("~/assets/cur/cursor.cur"), pointer !important;
    color: #666;
    text-decoration: none;
}
a:hover {
    color: #eb5055 !important;
    -webkit-transition: 0.3s;
    transition: 0.3s;
}
#blog h5:before {
    margin-right: 5px;
    content: "#";
    color: #f72d84;
}
button {
    cursor: url("~/assets/cur/cursor.cur"), pointer !important;
}
/*分页页码*/
.el-pager li {
    cursor: url("~/assets/cur/cursor.cur"), pointer !important;
}
/*返回顶部*/
.el-backtop {
    cursor: url("~/assets/cur/cursor.cur"), pointer !important;
}
/* 导航菜单选择 */
.el-dropdown-menu__item {
    cursor: url("~/assets/cur/cursor.cur"), pointer !important;
}
.myself {
    float: right;
    background: #cfffcf;
    margin: 1rem;
    padding: 0.5rem;
    border-radius: 0.6rem;
}
.friend {
    float: left;
    background: #ffe6b8;
    margin: 1rem;
    padding: 0.5rem;
    border-radius: 0.6rem;
}
.clearBoth {
    color: gray;
    clear: both;
    margin-left: 20px;
    padding-top: 5px;
}
.right {
    float: right;
}
.stystem {
    padding: 0.2rem;
    background: #eee;
    width: 22rem;
    margin: 0 auto;
    border-radius: 1.2rem;
    margin: 0.5rem auto;
}
/* 设置滚动条的样式 */
::-webkit-scrollbar {
    width: 6px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #bbb;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(255, 0, 0, 0.4);
}
/* 移动端滚动顶部样式 */
.Mobile_goback {
    width: 100px !important;
    font-size: 13px !important;
    box-shadow: none !important;
    color: black !important;
    background: transparent;
    position: static !important;
    height: auto !important;
    text-decoration: underline;
}
.el-backtop:hover {
    background-color: transparent !important;
}

@media screen and (max-width: 1000px) {
    /* 滚动顶部距离 */
    footer .desktop_goback {
        display: none;
    }
    footer .Mobile_goback {
        display: block;
    }
    .chat_side {
        width: 90% !important;
        margin-right: 0 !important;
    }
    .chat_content {
        width: 90% !important;
    }
    .circle-wrapper {
        display: none !important;
    }
}

@media screen and (min-width: 1000px) {
    /* 滚动顶部距离 */
    footer .desktop_goback {
        display: block;
    }
    footer .Mobile_goback {
        display: none;
    }
}

@media screen and (max-width: 967px) {
    /* 每行显示两个博客 */
    .section-article {
        width: 680px;
    }
    .section-article article {
        margin-left: 30px !important;
        margin-right: 30px !important;
    }
}

@media screen and (max-width: 780px) {
    /* 每行显示两个博客时，中间空格减小 */
    .section-article {
        width: 640px;
    }
    .section-article article {
        margin-left: 20px !important;
        margin-right: 20px !important;
    }
    #blog img {
        max-width: 100%;
        height: 50%;
    }
    .detail-article .drawerTitle {
        font-size: 15px;
        font-weight: 700;
    }
    /* 移动端更多文章样式 */
    .detail-article .contentList {
        padding: 0 5px 15px 8px;
    }
}

@media screen and (max-width: 647px) {
    /* 每行显示一个博客，大小根据屏幕变化 */
    .section-article {
        width: 100%;
    }
    .section-article article {
        width: 70% !important;
        margin-left: 15% !important;
        margin-right: 15% !important;
    }
    /* 底部响应式 */
    footer .container .footer-flot {
        top: 64% !important;
    }
    footer .container .sec-footer-flot {
        display: none !important;
    }
}

@media screen and (max-width: 600px) {
    /* 头部菜单收起 */
    .head-page .home-left {
        float: none !important;
        text-align: center;
    }
    .wrapper .tag_title {
        font-size: 24px !important;
    }
    .head-page .nav-coll-menu {
        display: block !important;
    }
    .head-page .nav {
        position: absolute !important;
        top: 0;
        right: 6px;
        margin-left: 6px;
    }
    .head-page .nav .nav-far {
        visibility: hidden !important;
    }
}

@media screen and (max-width: 460px) {
    /* 时间隐藏 */
    .detail-article .art-header .tag-time {
        display: none;
    }
    .detail-article .art-header .header-tag {
        width: 100% !important;
    }
}

@media screen and (max-width: 408px) {
    /* 每行显示一个博客，左右外边框变小 */
    .section-article {
        width: 100%;
    }
    .section-article article {
        width: 80% !important;
        margin-left: 10% !important;
        margin-right: 10% !important;
    }
}

@media screen and (max-width: 420px) {
    /* 显示悬浮球 */
    .circle-wrapper {
        display: block !important;
    }
}

@media screen and (min-width: 420px) {
    /* 显示悬浮球 */
    .circle-wrapper {
        display: none !important;
    }
}

@media screen and (max-width: 370px) {
    /* 底部响应式 */
    footer .container .link-git {
        top: 30% !important;
    }
}

@media screen and (max-width: 330px) {
    .section-article {
        width: 100%;
    }
    .section-article article {
        width: 86% !important;
        margin-left: 7% !important;
        margin-right: 7% !important;
    }
}

/* 分页根据设备宽度换行 */
.el-pagination {
    white-space: normal !important;
}
</style>
