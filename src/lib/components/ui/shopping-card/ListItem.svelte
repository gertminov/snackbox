<script lang="ts">
    import {Trash} from "lucide-svelte";
    import type {CartItem} from "$lib/data/CartItem";
    import Minus from "lucide-svelte/icons/minus";
    import Plus from "lucide-svelte/icons/plus";
    import {Button} from "$lib/components/ui/button";
    import {formatPrice} from "$lib/numberFormat";

    let {onIncrease, onDecrease, onClear, item}:
        {
            onIncrease: () => void,
            onDecrease: () => void,
            onClear: () => void
            item: CartItem
        } = $props()

</script>
    <div class="space-y-2 py-8 " >
        <p class="font-semibold">{item.snack.name}</p>
        <div class="flex justify-between items-center">
                   <span class="flex items-center space-x-4 rounded-md border bg-background">
                       <Button variant="ghost" on:click={onDecrease}><Minus class="w-4"/></Button>
                       <span class="w-3">{item.amt}</span>
                       <Button variant="ghost" on:click={onIncrease}><Plus class="w-4"/></Button>
                   </span>
            <span>{formatPrice(item.snack.price * item.amt)}</span>
            <Button size="icon" variant="ghost" on:click={onClear}>
                <Trash/>
            </Button>
        </div>
    </div>
