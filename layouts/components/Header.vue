<template>
    <header class="head-page">
        <div class="container">
            <div class="home-left">
                <div class="page-name">
                    <el-icon size="20"><ElIconPosition /></el-icon>
                    <nuxt-link to="/">Hao</nuxt-link>
                </div>
            </div>

            <!-- 移动端菜单 -->
            <div
                class="nav-coll-menu"
                :class="{ 'nav-coll-menu-padd': isVisibleNavFar }"
            >
                <span
                    class="icon-menu cross"
                    :class="{ 'icon-menu-close': isVisibleNavFar }"
                >
                    <span class="middle" />
                </span>
                <span class="click-fun" @click="closeCollMenu" />
                <ul
                    class="nav-far"
                    :class="{ 'visible-nav-far': isVisibleNavFar }"
                >
                    <nuxt-link to="/">
                        <li>首页</li>
                    </nuxt-link>
                    <nuxt-link to="/everyday">
                        <li>每日一图</li>
                    </nuxt-link>
                    <nuxt-link to="/about">
                        <li>关于</li>
                    </nuxt-link>
                </ul>
            </div>
            <!-- 移动端菜单 end -->

            <div class="nav right">
                <ul class="nav-far">
                    <nuxt-link to="/">
                        <li>首页</li>
                    </nuxt-link>
                    <nuxt-link to="/everyday">
                        <li>每日一图</li>
                    </nuxt-link>
                    <nuxt-link to="/about">
                        <li>关于</li>
                    </nuxt-link>
                </ul>
            </div>
        </div>
    </header>
</template>

<script setup>
const isVisibleNavFar = ref(false);
const selectItem = () => {};
const closeCollMenu = () => {
    isVisibleNavFar.value = !isVisibleNavFar.value;
};
</script>

<style lang="less" scoped>
header {
    background: rgba(255, 255, 255, 0.94);
    width: 100%;
    height: 70px;
    position: fixed;
    top: 0;
    z-index: 1;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);

    .container {
        width: 1080px;
        max-width: 100%;
        margin: 0 auto;
        height: 100%;
        color: #3c3c3c;
        a {
            color: #3c3c3c;
            text-decoration: none;
        }

        .home-left {
            height: 100%;
            line-height: 70px;
            font-size: 24px;
            float: left;
            .page-name {
                display: inline-flex;
                align-items: center;
            }
            a {
                font-size: 20px;
                position: relative;
                z-index: 1;
                margin-left: 10px;
            }
        }
        .nav {
            height: 100%;
            line-height: 70px;
            font-size: 14px;
            position: relative;

            .nav-far {
                margin-right: 38px;
                display: flex;
                align-items: center;
                li {
                    position: relative;
                    float: left;
                    margin: 0 16px;
                    list-style: none;
                }
            }
        }
    }
    .nav-coll-menu-padd {
        padding-bottom: 29px !important;
    }
    /* 小菜单 */
    .nav-coll-menu {
        position: absolute;
        width: 20px;
        top: 15px;
        left: 6px;
        cursor: url(../assets/pic/cursor.cur), pointer;
        z-index: 1;
        display: none;
        height: 16px;
        padding: 10px;
        box-sizing: content-box;

        .click-fun {
            width: 40px;
            height: 36px;
            position: absolute;
            top: 0;
            left: 0;
        }

        .icon-menu-close {
            transform: rotateZ(360deg);

            &::before {
                top: 7px !important;
                transform: rotate(45deg) !important;
                background: #313131 !important;
            }
            &::after {
                bottom: 7px !important;
                transform: rotate(135deg) !important;
                background: #eb5055 !important;
            }
            .middle {
                opacity: 0;
            }
        }

        .icon-menu {
            position: relative;
            display: inline-block;
            width: 10px;
            height: 16px;
            transition: all 0.4s ease-in-out;
            // transition-timing-function: cubic-bezier(0.61, 0.04, 0.17, 1.32);

            &::before,
            &::after {
                position: absolute;
                width: 15px;
                height: 2px;
                content: "";
                transition: all 0.4s ease-in-out;
                transform-origin: 50% 50% 0;
                background: #ff0000;
            }
            &::before {
                top: 0;
            }
            &::after {
                bottom: 0;
            }

            .middle {
                position: absolute;
                top: 50%;
                display: inline-block;
                width: 20px;
                height: 2px;
                margin-top: -1px;
                transition: all 0.4s ease-in-out;
                background: #313131;
            }
        }

        .visible-nav-far {
            visibility: visible !important;
            margin-top: 24px !important;
            opacity: 0.96 !important;
        }
        .nav-far {
            opacity: 0;
            transition: 0.4s;
            visibility: hidden;
            width: 130px;
            margin-top: 0;
            box-shadow: 0 0 4px 0 #d4d4d4;
            background: rgba(255, 255, 255, 0.92);
            font-size: 14px;
            padding-left: 0;
            li {
                position: relative;
                padding: 0 22px;
                line-height: 50px;
                transition: 0.4s;
                list-style: none;
                &:hover {
                    transition: 0.4s;
                    padding: 0 32px;
                    color: #eb5055;
                }

                i {
                    font-size: 16px;
                    margin-top: -3px;
                }

                &.sub-item {
                    &:hover > .nav-child {
                        visibility: visible;
                        opacity: 0.98;
                        top: 100%;
                        padding: 0 20px;
                        color: #3c3c3c;
                    }
                    .nav-child {
                        left: 60px;
                        z-index: 1501;
                        visibility: hidden;
                        background: rgba(255, 255, 255, 0.94);
                        opacity: 0;
                        top: 38px;
                        position: absolute;
                        box-shadow: 0 0 4px 0 #d4d4d4;
                        transition: all 0.3s ease-in-out;
                        li {
                            padding: 0;
                            float: none;
                            margin: 0;

                            a {
                                padding: 15px 22px;
                                width: 130px;
                                display: block;
                                height: 50px;
                                line-height: 20px;
                                transition: 0.4s;

                                &:hover {
                                    padding-left: 32px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

:deep(.el-dropdown) {
    display: block !important;
}
</style>
