<script lang="ts">
	import ListItem from '$lib/components/ui/shopping-card/ListItem.svelte';
	import { Button } from '$lib/components/ui/button';
	import { authDialogState } from '$lib/dialogState.svelte.js';
	import { formatPrice } from '$lib/numberFormat';
	import { selectedItems } from '$lib/stores/selectedItems.svelte.js';
	import type { CartItem } from '$lib/data/CartItem';
	import ShoppingHeader from '$lib/components/ui/shopping-card/ShoppingHeader.svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { fly } from 'svelte/transition';
	import { currentUser } from '$lib/currentUser.svelte';
	import { InsufficientFundsError, purchaseSnacks } from '$lib/data/pb';
	import { insufficientFundsDialogState } from '$lib/stores/popupStates.svelte';
	import InsufficientFundsDialog from '$lib/components/InsufficientFundsDialog.svelte';

	function calculateTotal(items: Iterator<CartItem>) {
		return items.reduce((acc, cur) => acc + cur.amt * cur.snack.price, 0);
	}

	let selected_items: CartItem[] = $derived(selectedItems.items.values());

	let totalPrice = $derived(formatPrice(calculateTotal(selectedItems.items.values())));

	let insufficientFundsMessage = $state("")

	async function purchase() {
		try {
			const {balance } = await purchaseSnacks(Array.from(selectedItems.items.values()), currentUser);
			currentUser.balance = balance
			selectedItems.items.clear()
			authDialogState.isOpen = true
		} catch (e) {
			if (e instanceof InsufficientFundsError) {
				insufficientFundsMessage = e.message
				insufficientFundsDialogState.isOpen = true
				console.log("insufficient");
			}
			console.error(e);
		}
	}

</script>

<div class="flex flex-col h-screen">
	<InsufficientFundsDialog errorMessage={insufficientFundsMessage} />
	<ShoppingHeader />
	<ScrollArea class="overflow-y-scroll grow p-8 " type="auto">
		<div class="divide-black/20 divide-y">
			{#each selected_items as item}
				<div in:fly={{ y: 100, duration: 200 }}>
					<ListItem {item}
										onIncrease={()=> selectedItems.addSnack(item.snack)}
										onDecrease={()=> selectedItems.removeSnack(item.snack)}
										onClear={()=> selectedItems.clearSnack(item.snack)}
					/>
				</div>
			{/each}
		</div>
	</ScrollArea>

	<div class="p-8 border-t border-black/20">
		<div class="pb-4 flex justify-end">
			<p class="font-semibold">Total: {totalPrice}</p>
		</div>
		{#if currentUser.name}
			<Button class="w-full" onclick={purchase}>Purchase</Button>
		{:else}
			<Button class="w-full" variant="disabled">Login to Purchase</Button>
		{/if}
	</div>
</div>
