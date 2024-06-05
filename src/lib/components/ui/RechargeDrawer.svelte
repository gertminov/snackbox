<script lang="ts">

import { Button, buttonVariants } from '$lib/components/ui/button';
import Plus from 'lucide-svelte/icons/plus';
import * as Drawer from '$lib/components/ui/drawer';
import { cn } from '$lib/utils';
import { Input } from '$lib/components/ui/input';
import { Label } from '$lib/components/ui/label/index.js';
import { rechargeMoney,  } from '$lib/data/pb';
import { currentUser } from '$lib/currentUser.svelte';
import { rechargeFundsDrawerState } from '$lib/stores/popupStates.svelte';

let value = $state("")
async function submitRecharge() {
	const amt = Number(value)
	const newUser = await rechargeMoney(amt, currentUser)
	currentUser.balance = newUser.balance
	console.log("Recharged to: ", currentUser.balance);
}
</script>

<Drawer.Root bind:open={rechargeFundsDrawerState.isOpen}>
	<Drawer.Trigger class={ cn(buttonVariants({ variant: "outline", size: "icon" }), "rounded-full")}>
		<Plus class="" />
	</Drawer.Trigger>
	<Drawer.Content>
		<div class="mx-auto w-full max-w-sm min-h-96 py-32">
			<Drawer.Header>
				<Drawer.Title class="text-xl">Recharge Balance</Drawer.Title>
				<Drawer.Description>
					<Label for="amount">Amount</Label>
					<Input type="number" id="amount" placeholder="12€" bind:value={value} />
				</Drawer.Description>
			</Drawer.Header>
			<Drawer.Footer>
				<Drawer.Close asChild let:builder>
					<Button builders={[builder]} onclick={submitRecharge}>Submit</Button>
				</Drawer.Close>
				<Drawer.Close asChild let:builder>
					<Button builders={[builder]} variant="outline">Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</div>
	</Drawer.Content>
</Drawer.Root>
