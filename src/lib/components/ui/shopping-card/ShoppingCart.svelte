<script lang="ts">
    import ListItem from "$lib/components/ui/shopping-card/ListItem.svelte";
    import {Button} from "$lib/components/ui/button";
    import {dialogState} from '$lib/dialogState.svelte.js';
    import {formatPrice} from "$lib/numberFormat";
    import {selectedItems} from "$lib/stores/selectedItems.svelte.js";
    import type {CartItem} from "$lib/data/CartItem";
    import ShoppingHeader from '$lib/components/ui/shopping-card/ShoppingHeader.svelte';
    import { ScrollArea } from '$lib/components/ui/scroll-area';
    import {fly} from 'svelte/transition';

    function calculateTotal(items: CartItem[]) {
        if (items.length > 0) {
            return items.reduce((acc, cur) => acc + cur.amt* cur.snack.price, 0);
        } else {return  0}
    }

    let selected_items = $derived(selectedItems.items.values())

    let totalPrice = $derived(formatPrice(calculateTotal(selectedItems.items.values())))

</script>

<div class="flex flex-col h-screen">
    <ShoppingHeader/>
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
        <Button class="w-full" on:click={()=> dialogState.isOpen = true}>Purchase</Button>
    </div>
</div>
