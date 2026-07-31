<template>
	<div>
		<article v-if="pending" class="skeleton-wrap detail-article">
			<el-skeleton animated class="skeleton-wrap__item">
				<template #template>
					<div class="p-[14px]">
						<el-skeleton-item variant="p" />
						<div class="flex items-center mt-[50px]">
							<el-skeleton-item variant="text" class="mr-[16px]" style="width: 15%" />
							<el-skeleton-item variant="text" class="mr-[16px]" style="width: 15%" />
							<el-skeleton-item variant="text" class="mr-[16px]" style="width: 5%" />
							<el-skeleton-item variant="text" style="width: 5%" />
						</div>
						<div class="flex justify-end">
							<el-skeleton-item variant="text" class="mt-[14px] mr-[16px]" style="width: 15%" />
						</div>
						<el-skeleton :rows="14" class="mt-[20px]" />
					</div>
				</template>
			</el-skeleton>
		</article>

		<article v-else-if="loadFailed" class="error-wrap detail-article">
			<p>{{ errorMessage }}</p>
			<el-button type="primary" @click="refreshArticle">重新加载</el-button>
		</article>

		<article v-else-if="blog" class="detail-article">
			<div class="art-header">
				<h1>{{ blog.title.rendered }}</h1>
				<div class="header-info">
					<el-icon><ElIconCalendar /></el-icon>
					{{ formatDate(blog.date) }}
					<el-icon><ElIconView /></el-icon>
					{{ blog.views ?? 0 }}
				</div>
				<div v-if="tagData.length" class="header-tag">
					<el-tag v-for="item in tagData" :key="item.id">{{ item.name }}</el-tag>
				</div>
				<div class="tag-time">
					<el-icon><ElIconCalendar /></el-icon>
					{{ formatTime(blog.date) }}
				</div>
			</div>
			<div id="blog-content" v-html="blog.content.rendered" />
			<div class="content-footer">
				<p>
					本文由
					<nuxt-link to="/">{{ blog.author === 1 ? 'Hao' : '博主' }}</nuxt-link>
					创作，转载请注明
				</p>
				<p>最后编辑时间：{{ formatDateTime(blog.modified) }}</p>
				<div id="vcomments" />
			</div>
			<div class="comments">
				<button type="button" @click="jumpTargetComments">发表评论</button>
			</div>
		</article>
	</div>
</template>

<script setup lang="ts">
interface WordPressPost {
	id: number;
	author: number;
	date: string;
	modified: string;
	link: string;
	views?: number;
	tags: number[];
	title: { rendered: string };
	excerpt: { rendered: string };
	content: { rendered: string };
}

interface WordPressTag {
	id: number;
	name: string;
}

const route = useRoute();
const getPostId = () => {
	const queryId = Array.isArray(route.query.id) ? route.query.id[0] : route.query.id;
	return typeof queryId === 'string' && /^\d+$/.test(queryId) ? queryId : '';
};
const initialPostId = getPostId();

if (!initialPostId) {
	throw createError({
		statusCode: 400,
		message: '无效的文章 ID',
	});
}

const postId = computed(getPostId);
const tagData = ref<WordPressTag[]>([]);
let tagRequestId = 0;

const { data, pending, error, refresh } = await useAsyncData(
	`article-${initialPostId}`,
	() => {
		if (!postId.value) {
			throw createError({
				statusCode: 400,
				message: '无效的文章 ID',
			});
		}

		return getPostsDetailsApi(postId.value);
	},
	{
		watch: [postId],
	},
);
const blog = computed(() => data.value?.data as WordPressPost | undefined);

const loadTags = async () => {
	const requestId = ++tagRequestId;
	const articleId = blog.value?.id;
	const tagIds = blog.value?.tags || [];
	if (!tagIds.length) {
		tagData.value = [];
		return;
	}

	const results = await Promise.allSettled(tagIds.map((tagId) => getPostsTagsApi(tagId)));
	if (requestId !== tagRequestId || blog.value?.id !== articleId) {
		return;
	}

	tagData.value = results.flatMap((result) =>
		result.status === 'fulfilled' ? [result.value.data as WordPressTag] : [],
	);
};

await loadTags();
watch(
	() => blog.value?.id,
	() => {
		void loadTags();
	},
);

useSeoMeta({
	title: () => blog.value?.title.rendered || '文章详情',
	description: () => blog.value?.excerpt.rendered || '',
});

const loadFailed = computed(() => Boolean(error.value) || !blog.value);
const errorMessage = computed(() => {
	if (!error.value && !blog.value) {
		return '文章不存在或暂时无法访问';
	}
	return error.value?.message || error.value?.statusMessage || '文章加载失败，请稍后重试';
});

const formatDate = (date?: string) => {
	return date ? date.split('T')[0].replaceAll('-', '.') : '日期未知';
};
const formatTime = (date?: string) => date?.split('T')[1] || '时间未知';
const formatDateTime = (date?: string) => (date ? date.replace('T', ' ') : '时间未知');

const refreshArticle = async () => {
	await refresh();
	await loadTags();
};

const jumpTargetComments = () => {
	if (blog.value?.link) {
		window.open(`${blog.value.link}#single-widget`, '_blank', 'noopener,noreferrer');
	}
};
</script>

<style lang="less" scoped>
.detail-article {
	min-height: 600px;
}
.skeleton-wrap {
	margin: 0 auto;
	box-sizing: border-box;
	padding-top: 100px;
	&__item {
		box-sizing: border-box;
		overflow: hidden;
	}
}
.error-wrap {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 16px;
	padding-top: 100px;
	text-align: center;
}
article {
	animation: fadeIn 0.6s linear;
	max-width: 700px;
	padding: 0 25px 30px;
	margin: 0 auto;
	background-color: var(--bg-color);
	color: var(--text-color);
	position: relative;
	text-align: left;
	font-size: 15px;
	line-height: 32px;

	.art-header {
		padding-top: 100px;
		padding-bottom: 12px;
		border-bottom: 1px dashed #b7b7b7;
		position: relative;

		h1 {
			font-size: 22px;
			font-weight: 400;
			line-height: 1.8;
			color: var(--text-color);
		}

		.header-info {
			margin: 12px 0 0;
			display: flex;
			align-items: center;
			i {
				&:not(:first-child) {
					margin-left: 12px;
				}
				font-size: 14px;
			}
		}
		.header-tag {
			width: 85%;
			margin-top: 14px;
			min-height: 33px;
			span {
				margin-right: 12px;
			}
		}

		.tag-time {
			position: absolute;
			right: 0;
			bottom: 12px;
			line-height: 14px;
			display: flex;
			align-items: center;

			i {
				font-size: 14px;
				margin-top: -2px;
			}
		}
	}
	.content-footer {
		border-top: 1px solid #e0e0e0;
		padding-top: 26px;
		color: var(--text-color);
		font-size: 14px;
		text-align: center;

		a {
			border-bottom: 1px solid #ccc;

			&:hover {
				border-bottom: 1px solid #eb5055;
			}
		}
	}
	.comments {
		background: var(--bg-color);
		color: var(--text-color);
		width: 100%;
		margin: 20px 10px 10px 0;
		padding: 5px;
		border: 1px solid #ddd;
		border-radius: 2px;
		text-align: center;

		button {
			width: 100%;
			color: inherit;
			background: transparent;
			border: 0;
			cursor: pointer;
		}
	}
}
#blog-content {
	padding-top: 15px;
	width: 100%;
	text-align: justify;
	:deep(h2) {
		font-size: 17px;
		line-height: 190%;
		margin: 10px -21px;
		padding: 0 44px;
		font-weight: bold;
		border-left: 5px solid #e40000;
	}
	:deep(code) {
		background: #fee;
		color: #555;
		margin: auto 3px;
		padding: 2px 4px;
		border-radius: 5px;
	}
	:deep(img) {
		max-width: 100%;
	}
	:deep(ol li) {
		list-style: decimal !important;
	}
}
</style>
