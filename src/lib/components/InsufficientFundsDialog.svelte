<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { insufficientFundsDialogState,rechargeFundsDrawerState  } from '$lib/stores/popupStates.svelte.js';
	import { Button } from '$lib/components/ui/button';

	const { errorMessage }: { errorMessage: '' } = $props();
	function openRecahrge() {
		insufficientFundsDialogState.isOpen = false
		rechargeFundsDrawerState.isOpen = true
	}

</script>

<Dialog.Root bind:open={insufficientFundsDialogState.isOpen}>
	<!--    <Dialog.Trigger/>-->
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title class="text-center text-xl">Insufficient Funds</Dialog.Title>
			<Dialog.Description>
				<div class="flex justify-center py-4">
					<h2 class="text-red-600">{errorMessage}</h2>
				</div>
				<p class="text-center">
					Please recharge your account
				</p>
			</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer>
				<Button class="mx-auto"  onclick={openRecahrge}>Recharge</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
