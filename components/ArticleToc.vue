<template>
	<aside
		v-if="items.length"
		class="article-toc"
		:class="`article-toc--${variant}`"
		aria-label="本文导览"
		style="position: sticky; top: 80px; z-index: 99999"
	>
		<button
			v-if="variant === 'mobile'"
			type="button"
			class="article-toc__toggle"
			:aria-expanded="expanded"
			@click="expanded = !expanded"
		>
			<div>
				<span class="article-toc__eyebrow">本文导览</span>
				<span class="article-toc__current">{{ currentTitle }}</span>
			</div>
			<el-icon class="article-toc__toggle-icon" :class="{ 'is-expanded': expanded }">
				<ElIconArrowDown />
			</el-icon>
		</button>

		<h2 v-else class="article-toc__title">本文导览</h2>

		<transition name="toc-expand">
			<nav v-show="variant === 'desktop' || expanded" class="article-toc__nav">
				<button
					v-for="item in visibleItems"
					:key="item.id"
					type="button"
					class="article-toc__item"
					:class="[
						`article-toc__item--level-${item.level}`,
						{
							'is-active': item.id === activeHeadingId,
							'is-section-active': item.level === 2 && item.id === activeSectionId,
						},
					]"
					:title="item.text"
					@click="selectItem(item.id)"
				>
					{{ item.text }}
				</button>
			</nav>
		</transition>
	</aside>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { ArticleTocItem } from '~/composables/useArticleToc';

const props = defineProps({
	items: {
		type: Array as PropType<ArticleTocItem[]>,
		default: () => [],
	},
	activeHeadingId: {
		type: String,
		default: '',
	},
	activeSectionId: {
		type: String,
		default: '',
	},
	variant: {
		type: String as PropType<'desktop' | 'mobile'>,
		default: 'desktop',
	},
});

const emit = defineEmits<{
	select: [id: string];
}>();

const expanded = ref(false);
const hasLevelTwo = computed(() => props.items.some((item) => item.level === 2));
const resolvedSectionId = computed(
	() => props.activeSectionId || props.items.find((item) => item.level === 2)?.id || '',
);
const visibleItems = computed(() => {
	if (!hasLevelTwo.value) {
		return props.items;
	}

	return props.items.filter((item) => item.level === 2 || item.sectionId === resolvedSectionId.value);
});
const currentTitle = computed(
	() => props.items.find((item) => item.id === props.activeHeadingId)?.text || props.items[0]?.text || '查看文章章节',
);

const selectItem = (id: string) => {
	emit('select', id);
	if (props.variant === 'mobile') {
		expanded.value = false;
	}
};
</script>

<style lang="less" scoped>
.article-toc {
	color: var(--text-color);

	&--desktop {
		position: sticky;
		top: 88px;
		align-self: start;
		max-height: calc(100vh - 112px);
		padding: 8px 0 8px 20px;
		border-left: 1px solid rgba(127, 127, 127, 0.25);
		overflow-y: auto;
	}

	&--mobile {
		display: none;
		margin: 22px 0 8px;
		border: 1px solid rgba(127, 127, 127, 0.25);
		border-radius: 6px;
		background: var(--bg-color);
	}

	&__title {
		margin: 0 0 12px;
		font-size: 16px;
		line-height: 24px;
		font-weight: 600;
		letter-spacing: 0;
	}

	&__nav {
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}

	&__item {
		position: relative;
		width: 100%;
		min-height: 34px;
		padding: 6px 8px;
		border: 0;
		color: color-mix(in srgb, var(--text-color) 72%, transparent);
		background: transparent;
		font: inherit;
		font-size: 13px;
		line-height: 22px;
		letter-spacing: 0;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		transition:
			color 0.2s ease,
			background-color 0.2s ease;

		&:hover {
			color: var(--text-color);
			background: rgba(127, 127, 127, 0.08);
		}

		&--level-3 {
			padding-left: 22px;
		}

		&--level-4 {
			padding-left: 36px;
			font-size: 12px;
		}

		&.is-section-active {
			color: var(--text-color);
			font-weight: 600;
		}

		&.is-active {
			color: #409eff;
			background: rgba(64, 158, 255, 0.08);

			&::before {
				position: absolute;
				top: 7px;
				bottom: 7px;
				left: 0;
				width: 2px;
				background: #409eff;
				content: '';
			}
		}
	}

	&__toggle {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		width: 100%;
		min-height: 58px;
		padding: 9px 12px;
		border: 0;
		color: inherit;
		background: transparent;
		text-align: left;
	}

	&__eyebrow,
	&__current {
		display: block;
		letter-spacing: 0;
	}

	&__eyebrow {
		font-size: 13px;
		font-weight: 600;
		line-height: 20px;
	}

	&__current {
		max-width: min(72vw, 430px);
		color: color-mix(in srgb, var(--text-color) 65%, transparent);
		font-size: 12px;
		line-height: 18px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	&__toggle-icon {
		flex: 0 0 auto;
		transition: transform 0.2s ease;

		&.is-expanded {
			transform: rotate(180deg);
		}
	}
}

.toc-expand-enter-active,
.toc-expand-leave-active {
	transition:
		opacity 0.18s ease,
		transform 0.18s ease;
	transform-origin: top;
}

.toc-expand-enter-from,
.toc-expand-leave-to {
	opacity: 0;
	transform: translateY(-4px);
}

@media screen and (max-width: 999px) {
	.article-toc {
		&--desktop {
			display: none;
		}

		&--mobile {
			display: block;
		}

		&__nav {
			padding: 0 8px 10px;
			border-top: 1px solid rgba(127, 127, 127, 0.2);
		}

		&__item {
			white-space: normal;
		}
	}
}
</style>
