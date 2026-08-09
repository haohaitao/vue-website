<template>
	<div class="animated bounce">
		<main>
			<p style="color: var(--text-color)">今天是 {{ time }}，欢迎访问我的个人网站</p>
			<SectionArticle :blog-list="blogList" :pending="pending" :error-message="errorMessage" @retry="refreshList" />
			<div v-if="!pending && !error && total > pageSize" class="pagination-wrap">
				<el-pagination
					v-model:current-page="currentPage"
					:hide-on-single-page="true"
					:total="total"
					:page-size="pageSize"
					size="small"
					background
					layout="prev, pager, next"
				/>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

interface WordPressPost {
	id: number;
	date: string;
	views?: number;
	title: { rendered: string };
	excerpt: { rendered: string };
	content: { rendered: string };
	content_first_image?: string;
}

interface ArticleItem extends Omit<WordPressPost, 'title' | 'excerpt'> {
	title: string;
	excerpt: string;
}

useSeoMeta({
	title: '首页',
});

const pageSize = 15;
const currentPage = ref(1);
const time = useState('home-current-date', () => dayjs().format('YYYY-MM-DD'));

const { data, pending, error, refresh } = await useAsyncData(
	'home-posts',
	() =>
		getListApi({
			per_page: pageSize,
			page: currentPage.value,
		}),
	{
		watch: [currentPage],
	},
);

const blogList = computed<ArticleItem[]>(() => {
	const posts = (data.value?.data || []) as WordPressPost[];

	return posts.map((post) => ({
		...post,
		title: post.title.rendered,
		excerpt: post.excerpt.rendered,
	}));
});
const total = computed(() => data.value?.total || 0);
const errorMessage = computed(() => {
	if (!error.value) {
		return '';
	}

	return error.value.statusMessage || error.value.message || '文章加载失败，请稍后重试';
});

const refreshList = async () => {
	await refresh();
};

watch(data, async () => {
	if (import.meta.client) {
		await nextTick();
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
});
</script>

<style lang="less" scoped>
main {
	max-width: 1080px;
	margin: 90px auto 0;
	text-align: center;
}
.pagination-wrap {
	clear: both;
	margin: 30px 0;
	display: flex;
	justify-content: center;
}
</style>
