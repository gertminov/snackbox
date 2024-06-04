<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import { type Snack} from "$lib/data/Snack.js";
    import {formatPrice} from "$lib/numberFormat";
    import {selectedItems} from "$lib/stores/selectedItems.svelte";
    export let snacks: Snack[] = []

</script>
<div class=" grid grid-cols-4 gap-8 p-8">
    {#each snacks as snack}
        <Card.Root class="max-h-96 active:bg-accent transition-colors duration-300" >
            <div on:click={()=> selectedItems.addSnack(snack)}>
                <Card.Header>
                    <div>
                        <img src="{snack.image}" alt="snack image" class="select-none mx-auto size-32"/>
                    </div>
                </Card.Header>
                <Card.Footer>
                    <div class="flex flex-col items-center w-full select-none">
                        <p>{snack.name}</p>
                        <p>{formatPrice(snack.price)}</p>
                    </div>
                </Card.Footer>
            </div>
        </Card.Root>
    {/each}
</div>
