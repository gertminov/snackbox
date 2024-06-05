<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { currentUser } from '$lib/currentUser.svelte';
	import { authDialogState } from '$lib/dialogState.svelte';
	import { ScanLine } from 'lucide-svelte';
	import {  login } from '$lib/data/pb';

	let input: HTMLInputElement;

	function closeModal(e: Event) {
		e.preventDefault();
		console.log(input?.value);
		login("123456789", "123456789").then(usr => {
			currentUser.name = usr.name
			currentUser.balance = usr.balance
			currentUser.id = usr.id
		})
		authDialogState.isOpen = false;
	}

	$effect(() => {
		if (authDialogState.isOpen) {
			input?.focus();
			console.log('open');
		}
	});


</script>

<Dialog.Root bind:open={authDialogState.isOpen}>
	<!--    <Dialog.Trigger/>-->
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title class="text-center text-xl">Please Authenticate</Dialog.Title>
			<Dialog.Description>
				<div class="flex justify-center py-4">
					<ScanLine class="size-16" />
				</div>
				<p class="text-center">
					Hold your chip card against the scanner
				</p>
			</Dialog.Description>
		</Dialog.Header>
		<form action="" onsubmit={closeModal}>
			<input class="h-0" type="text" bind:this={input}>
		</form>
	</Dialog.Content>
</Dialog.Root>