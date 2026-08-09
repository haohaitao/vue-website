import type { Ref } from 'vue';

export interface ArticleTocItem {
	id: string;
	text: string;
	level: 2 | 3 | 4;
	sectionId: string;
}

export const useArticleToc = (contentRef: Ref<HTMLElement | null>) => {
	const items = ref<ArticleTocItem[]>([]);
	const activeHeadingId = ref('');
	const activeSectionId = ref('');
	let headings: HTMLElement[] = [];
	let observer: IntersectionObserver | null = null;
	let scrollFrame = 0;

	const setActiveHeading = (id: string) => {
		const item = items.value.find((tocItem) => tocItem.id === id);
		if (!item) {
			return;
		}

		activeHeadingId.value = item.id;
		activeSectionId.value = item.sectionId;
	};

	const syncActiveHeading = () => {
		scrollFrame = 0;
		if (!headings.length) {
			return;
		}

		const markerTop = 96;
		let currentHeading = headings[0];

		for (const heading of headings) {
			if (heading.getBoundingClientRect().top > markerTop) {
				break;
			}
			currentHeading = heading;
		}

		setActiveHeading(currentHeading.id);
	};

	const scheduleActiveSync = () => {
		if (!scrollFrame) {
			scrollFrame = window.requestAnimationFrame(syncActiveHeading);
		}
	};

	const stopTracking = () => {
		observer?.disconnect();
		observer = null;
		if (scrollFrame) {
			window.cancelAnimationFrame(scrollFrame);
			scrollFrame = 0;
		}
		window.removeEventListener('scroll', scheduleActiveSync);
	};

	const startTracking = () => {
		if (!headings.length) {
			return;
		}

		if ('IntersectionObserver' in window) {
			observer = new IntersectionObserver(scheduleActiveSync, {
				rootMargin: '-72px 0px -70% 0px',
				threshold: 0,
			});
			headings.forEach((heading) => observer?.observe(heading));
		}
		window.addEventListener('scroll', scheduleActiveSync, { passive: true });
		syncActiveHeading();
	};

	const rebuild = async () => {
		if (!import.meta.client) {
			return;
		}

		await nextTick();
		stopTracking();

		const content = contentRef.value;
		if (!content) {
			items.value = [];
			activeHeadingId.value = '';
			activeSectionId.value = '';
			headings = [];
			return;
		}

		const usedIds = new Set<string>();
		let currentSectionId = '';
		headings = Array.from(content.querySelectorAll<HTMLElement>('h2, h3, h4'));

		items.value = headings.flatMap((heading, index) => {
			const text = heading.textContent?.replace(/\s+/g, ' ').trim() || '';
			if (!text) {
				return [];
			}

			const level = Number(heading.tagName.slice(1)) as ArticleTocItem['level'];
			const originalId = heading.id.trim();
			const idBase = originalId || `article-heading-${index + 1}`;
			let id = idBase;
			let duplicateIndex = 2;

			while (usedIds.has(id)) {
				id = `${idBase}-${duplicateIndex}`;
				duplicateIndex += 1;
			}

			usedIds.add(id);
			heading.id = id;

			if (level === 2 || !currentSectionId) {
				currentSectionId = id;
			}

			return [
				{
					id,
					text,
					level,
					sectionId: currentSectionId,
				},
			];
		});

		headings = headings.filter((heading) => usedIds.has(heading.id));
		startTracking();
	};

	const scrollToHeading = (id: string) => {
		if (!import.meta.client) {
			return;
		}

		const heading = document.getElementById(id);
		if (!heading) {
			return;
		}

		setActiveHeading(id);
		const top = heading.getBoundingClientRect().top + window.scrollY - 76;
		window.scrollTo({ top, behavior: 'smooth' });
	};

	onBeforeUnmount(() => {
		if (import.meta.client) {
			stopTracking();
		}
	});

	return {
		items,
		activeHeadingId,
		activeSectionId,
		rebuild,
		scrollToHeading,
	};
};
