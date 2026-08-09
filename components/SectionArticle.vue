<template>
    <section class="section-article">
        <template v-if="!pending && !errorMessage">
            <article
                v-for="val in blogShowList"
                :key="val.id"
                role="link"
                tabindex="0"
                @click="jumpDetail(val)"
                @keyup.enter="jumpDetail(val)"
            >
                <div class="bg-container">
                    <div class="bg-img" :style="featuredStyle(val)" />
                </div>
                <div class="bg-cover">
                    <p>{{ excerptText(val.excerpt) }}</p>
                </div>
                <div class="other-bgCover right-bgCover" />
                <div class="other-bgCover" />
                <div class="desc">
                    <p class="title" :title="val.title">{{ val.title }}</p>
                    <div class="desc-bottom">
                        <div class="d-detail">
                            <el-icon><ElIconTimer /></el-icon>
                            <span class="text-[14px] mr-[14px]">{{ formatDate(val.date) }}</span>
                            <el-icon><ElIconView /></el-icon>
                            <span class="text-[14px] mr-[14px]">{{ val.views ?? 0 }}</span>
                        </div>
                    </div>
                </div>
            </article>
        </template>
        <div v-if="pending" class="skeleton-wrap">
            <el-skeleton
                v-for="item in 15"
                :key="item"
                animated
                class="skeleton-wrap__item"
            >
                <template #template>
                    <el-skeleton-item
                        variant="image"
                        style="width: 100%; height: 230px"
                    />
                    <div class="p-[14px]">
                        <el-skeleton-item variant="p" />
                        <div
                            class="flex items-center justify-between mt-[50px]"
                        >
                            <el-skeleton-item
                                variant="text"
                                style="width: 46%"
                                class="mr-[16px]"
                            />
                            <el-skeleton-item
                                variant="text"
                                style="width: 30%"
                                class="mr-[16px]"
                            />
                            <el-skeleton-item
                                variant="text"
                                style="width: 24%"
                            />
                        </div>
                    </div>
                </template>
            </el-skeleton>
        </div>
        <div v-else-if="errorMessage" class="state-wrap">
            <p>{{ errorMessage }}</p>
            <el-button type="primary" @click="$emit('retry')">重新加载</el-button>
        </div>
        <div v-else-if="blogShowList.length === 0" class="state-wrap">
            暂无文章
        </div>
    </section>
</template>

<script setup lang="ts">
import type { CSSProperties, PropType } from "vue";

interface ArticleItem {
    id: number;
    title: string;
    excerpt: string;
    content_first_image?: string;
    content?: {
        rendered?: string;
    };
    date?: string;
    views?: number;
    total_comments?: number;
    category_name?: string;
}

const IMAGE_SRC_PATTERN = /<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/i;
const HTML_TAG_PATTERN = /<[^>]*>/g;
const IMAGE_GRADIENT = "linear-gradient(0deg, rgba(24, 23, 20, 0.22), rgba(24, 23, 20, 0.04))";

const initSeoConfig = useSeoConfigStore();
const router = useRouter();
const props = defineProps({
    blogList: {
        type: Array as PropType<ArticleItem[]>,
        default: () => [],
    },
    pending: {
        type: Boolean,
        default: false,
    },
    errorMessage: {
        type: String,
        default: "",
    },
});

defineEmits(["retry"]);

const blogShowList = computed(() => props.blogList);

const getArticleImage = (article: ArticleItem): string => {
    if (article.content_first_image) {
        return article.content_first_image;
    }

    return article.content?.rendered?.match(IMAGE_SRC_PATTERN)?.[1] ?? "";
};

const featuredStyle = (article: ArticleItem): CSSProperties => {
    const image = getArticleImage(article);

    return image
        ? {
              backgroundImage: `${IMAGE_GRADIENT}, url(${JSON.stringify(image)})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
          }
        : {};
};

const formatDate = (date?: string) => {
    return date ? date.split("T")[0].replaceAll("-", ".") : "日期未知";
};

const excerptText = (excerpt: string) => {
    return excerpt
        .replace(HTML_TAG_PATTERN, " ")
        .replace(/&hellip;|&#8230;/gi, "…")
        .replace(/&nbsp;/gi, " ")
        .replace(/&amp;/gi, "&")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/&quot;|&#8220;|&#8221;/gi, '"')
        .replace(/&#039;|&apos;/gi, "'")
        .replace(/\s+/g, " ")
        .trim();
};

const jumpDetail = (article: ArticleItem) => {
    if (!article.id) {
        return;
    }

    initSeoConfig.updateSeoConfig(article);
    router.push({
        path: "/article",
        query: {
            id: String(article.id),
        },
    });
};

</script>

<style lang="less" scoped>
section {
    animation: fadeIn 0.6s linear;
    max-width: 960px;
    margin: 0 auto;
    box-sizing: border-box;

    article {
        width: 280px;
        height: 340px;
        float: left;
        position: relative;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.5);
        cursor: pointer;
        box-sizing: border-box;
        margin: 20px;
        box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.08);
        overflow: hidden;
        &:hover {
            box-shadow: 1px 2px 12px 1px rgba(0, 0, 0, 0.15);
            background: #fff;

            .bg-img {
                filter: blur(3px);
                transform: scale(1.1);
            }

            .bg-cover {
                background-color: rgba(0, 0, 0, 0.5);
                transition: 0.5s;
                p {
                    transition: 0.5s;
                    margin-top: 0px;
                    opacity: 1;
                }
            }
        }

        .top-icon {
            width: 46px;
            opacity: 0.86;
            height: 46px;
            position: absolute;
            left: -9px;
            top: -4px;
            text-align: center;
            line-height: 44px;
            color: #fff;
            background: url("../assets/imgs/tag.png");
            background-size: cover;

            i {
                font-size: 19px;
            }
        }

        .bg-container {
            &::before {
                content: "Loading...";
                position: absolute;
                border-radius: 5px 5px 0 0;
                width: 100%;
                left: 0;
                background-color: rgba(169, 169, 169, 0.75);
                text-align: center;
                line-height: 230px;
                font-size: 26px;
                color: #333333;
                z-index: -1;
            }

            &::after {
                content: "";
                position: absolute;
                border-radius: 5px 5px 0 0;
                width: 100%;
                left: 0;
                background-color: rgba(255, 255, 255, 0);
                line-height: 230px;
                z-index: -1;
            }

            .bg-img {
                transition: all 0.5s ease;
                height: 230px;
                border-radius: 5px 5px 0 0;
            }
        }

        .bg-cover {
            position: absolute;
            top: 0;
            overflow: hidden;
            width: 100%;
            height: 100%;
            padding: 40px 28px;
            box-sizing: border-box;

            p {
                font-size: 14px;
                margin: 0;
                margin-top: 26px;
                padding: 0;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 4;
                overflow: hidden;
                opacity: 0;
                line-height: 26px;
                color: #fff;
            }
        }

        .other-bgCover {
            position: absolute;
            z-index: 0;
            right: 0;
            bottom: 1px;
            left: 0;
            width: 110%;
            min-height: 100px;
            transform: rotate(5deg) translate(-10px, -20px);
            background-color: #fff;
        }
        .right-bgCover {
            transform: rotate(-10deg) translate(10px, -30px);
            opacity: 0.7;
            background-color: rgba(0, 0, 0, 0.5) !important;
        }

        .desc {
            width: 100%;
            height: 110px;
            background: #fff;
            position: relative;
            padding: 7px 15px 10px;
            box-sizing: border-box;
            text-align: left;

            .title {
                color: #000;
                font-size: 16px;
                display: -webkit-inline-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                &:hover {
                    color: #ff8b18;
                }
            }

            .desc-bottom {
                position: absolute;
                right: 0;
                bottom: 0;
                width: 100%;
                padding: 0 15px 10px;
                text-align: right;

                .d-detail {
                    position: absolute;
                    bottom: 10px;
                    padding: 0px 20px;
                    display: flex;
                    align-items: center;
                }
                .hidden-detail {
                    span {
                        visibility: hidden;
                    }
                }

                .item-icon {
                    font-size: 24px;
                    float: right;
                    border-radius: 50%;
                    outline: none;
                    background-size: cover;
                }
            }
        }
    }

    .state-wrap {
        min-height: 280px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
        color: var(--text-color);
    }

    .skeleton-wrap {
        max-width: 960px;
        margin: 0 auto;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        &__item {
            width: 280px;
            height: 340px;
            float: left;
            position: relative;
            border-radius: 5px;
            background: rgba(255, 255, 255, 0.5);
            box-sizing: border-box;
            margin: 20px;
            box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.08);
            overflow: hidden;
        }
    }
}
</style>
