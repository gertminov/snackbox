<script lang="ts">
	import { type Snack } from '$lib/data/Snack';
	import { getSnacks } from '$lib/data/pb';
	import SnackGrid from '$lib/components/ui/SnackGrid.svelte';
	import ShoppingCart from '$lib/components/ui/shopping-card/ShoppingCart.svelte';
	import AuthDialog from '$lib/components/AuthDialog.svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import Spinner from '$lib/components/ui/spinner/Spinner.svelte';
	import {fade} from 'svelte/transition';
	import InsufficientFundsDialog from '$lib/components/InsufficientFundsDialog.svelte';

	let snackPromise: Promise<Snack []> = $state();

	$effect(async () => {
		snackPromise = getSnacks();
	});

</script>
<div>
	<AuthDialog />
	<div class="flex h-screen">
		<div class="basis-3/4">
			{#await snackPromise}
					<div transition:fade class="h-full grid place-content-center">
						<div class="flex justify-center flex-col">
							<Spinner classes="size-24" />
							<p class="text-xl">...loading</p>
						</div>
					</div>
			{:then snacks}
				<ScrollArea class="">
				<SnackGrid {snacks} />
				</ScrollArea>
			{:catch error}
				<div class="grid place-content-center">
					<p class="text-red-600 font-bold font-mono">{error.message}</p>
				</div>
			{/await}
		</div>
		<aside class="basis-1/4 border-l border-black">
			<ShoppingCart />
		</aside>
	</div>
</div>