<script lang="ts">
	import { formatPrice } from '$lib/numberFormat';
	import { currentUser } from '$lib/currentUser.svelte';
	import RechargeDrawer from '$lib/components/ui/RechargeDrawer.svelte';
	import { Button } from '$lib/components/ui/button';
	import { authDialogState } from '$lib/dialogState.svelte';
</script>

<div class="flex justify-end gap-8 border-b border-black px-8 py-8">
	<span class="flex items-center gap-2">
		{#if currentUser.name}
		<RechargeDrawer/>
		{/if}
		<!--		<Button size="icon" variant="outline" class="rounded-full"></Button>-->
		<span class="font-bold">{formatPrice(currentUser.balance)}</span>
	</span>

	<span class="items-center flex">
	{#if currentUser.name}
		<span class="">{currentUser.name}</span>
	{:else}
		<Button onclick={()=> authDialogState.isOpen = true}>Login</Button>
	{/if}
</span>
</div>
