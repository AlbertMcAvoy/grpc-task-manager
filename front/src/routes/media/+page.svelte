<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { searchTerm, mediaStore } from '$stores/media';
	import Media from '$lib/component/media/Media.svelte';
	import FuzzySearch from 'fuzzy-search';
	import modal from '$stores/modal';
	import NewMedia from '$lib/component/media/NewMedia.svelte';
	import { connectToMediaStream } from '$lib/service/media';

	export let data: PageData;

	onMount(() => {
		if (browser) {
			mediaStore.set(data.medias);

			connectToMediaStream();
		}
	});

	let medias: [];
	$: searcher = new FuzzySearch($mediaStore, ['name', 'fields.name'], {
		caseSensitive: false
	});
	$: if ($searchTerm) {
		medias = searcher.search($searchTerm);
	} else {
		medias = $mediaStore;
	}

	const handleCreateMedia = () => modal.open(NewMedia as any);
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="flex w-full flex-wrap items-center justify-center p-4 overflow-x-auto">
	{#each medias as media (media.name)}
		<Media {media} />
	{:else}
		<div class="card w-96 h-36 bg-base-100 shadow-x">
			<div class="card-body items-center text-center">
				<h2 class="card-title">No Media.</h2>
				<div class="card-actions justify-end">
					<button class="btn btn-primary" on:click={handleCreateMedia}>Create Media</button>
				</div>
			</div>
		</div>
	{/each}
</div>
