<template>
	<div class="wrapper animated bounceInDown">
		<div class="content">
			<p>
				<img
					style="width: 690px; height: 388px; margin: 0 auto"
					src="https://www.haohaitao.cn/wp-content/uploads/2019/04/about20190403.jpg"
					alt="关于"
				/>
			</p>
			<h2>关于本站</h2>
			<p>使用nuxt3构建的个人网站</p>
			<p>主要用到的技术：nuxt3 + vue3 + pinia + vue-router + less + element-plus + docker</p>
			<p>代码已开源，欢迎交流，共同学习</p>
			<h2>关于博主</h2>
			<p>曾梦想仗剑走天涯，看一看世界的繁华，后来工作太忙没去。</p>
			<h2>送给自己</h2>
			<p>你好哇，hht。</p>
			<p>虽然生活总是不尽人意，但是活着就有希望！</p>
			<p>困难像弹簧，你弱它就强！</p>
			<h2>联系方式</h2>
			<p>Email：haohaitao28#163.com #换@</p>
			<p>微信：hht28_</p>
		</div>
	</div>
</template>

<script setup>
useSeoMeta({
	title: '关于',
});
</script>

<style lang="less" scoped>
.wrapper {
	margin: 100px auto auto;
	max-width: 900px;
	padding: 0 15px;
	.content {
		text-align: left;
		line-height: 30px;
		color: var(--text-color);
		&p:nth-child(1) {
			text-align: center;
		}
	}
	h2 {
		font-weight: 500;
		font-size: 28px;
		margin-top: 20px;
		margin-bottom: 10px;
	}
}
</style>
