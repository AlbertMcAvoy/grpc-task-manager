<script lang="ts">
    import { enhance } from '$app/forms';
    export let media: any;

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="card w-full h-[calc(100vh-8rem)] lg:min-h-[50rem] lg:w-96 bg-base-100 shadow-xl mx-2 my-1">
    <div class="card-body justify-between h-full">
        <h2 class="card-title justify-between">
			<span class="text-3xl underline underline-offset-8">
				{media.name}
			</span>
        </h2>

        <div class="stats stats-vertical shadow pb-2 text-xl overflow-y-auto h-full">
            <div class="flex justify-between items-center pr-2">
                <div class="stat">
                    <div class="stat-desc">{media.url}</div>
                </div>
            </div>
        </div>

        <div class="card-actions justify-end">
            <form action="/media?/deleteMedia" method="POST" use:enhance>
                <input value={media.id} name="name" hidden />
                <button class="btn btn-warning text-base">Remove</button>
            </form>
        </div>
    </div>
</div>
