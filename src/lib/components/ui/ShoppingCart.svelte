<script lang="ts">
    import ListItem from "$lib/components/ui/ListItem.svelte";
    import {Button} from "$lib/components/ui/button";
    import {dialogOpen} from "$lib/dialogState";
    import {userStore} from "$lib/userStore";
    import {formatPrice} from "$lib/numberFormat";
    import {selectedItems} from "$lib/stores/selectedItems.svelte";
    import type {CartItem} from "$lib/data/CartItem";

    function calculateTotal(items: CartItem[]) {
        return items.reduce((acc, cur) => acc + cur.amt* cur.snack.price, 0)
    }

</script>

<div class="flex flex-col h-screen">
    <div class="flex gap-8 justify-end border-b border-black px-8 pb-8">
        <span class="font-bold">{formatPrice($userStore.balance)}</span>
        <div>{$userStore.name}</div>
    </div>
    <div class="overflow-y-scroll grow p-8 divide-black/20 divide-y">
        {#each selectedItems.items.values() as item}
            <ListItem {item}
                      onIncrease={()=> selectedItems.addSnack(item.snack)}
                      onDecrease={()=> selectedItems.removeSnack(item.snack.name)}
                      onClear={()=> selectedItems.clearSnack(item.snack.name)}
            />
        {/each}
    </div>

    <div class="p-8 border-t border-black/20">
        <div class="pb-4 flex justify-end">
            <p class="font-semibold">Total: {formatPrice(calculateTotal(selectedItems.items.values()))}</p>
        </div>
        <Button class="w-full" on:click={()=> $dialogOpen = true}>Purchase</Button>
    </div>
</div>
