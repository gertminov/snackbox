<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import { type Snack} from "$lib/data/Snack.js";
    import {formatPrice} from "$lib/numberFormat";
    import {selectedItems} from "$lib/stores/selectedItems.svelte";
    export let snacks: Snack[] = []

</script>
    <div class="grid grid-cols-4 gap-8 p-8">
        {#each snacks as snack (snack.name)}
            <Card.Root class="max-h-96 active:bg-accent hover:scale-[1.01] hover:shadow  transition-all duration-300" >
                <div on:click={()=> selectedItems.addSnack(snack)}>
                    <Card.Header>
                        <div>
                            <img src="{snack.image}" alt="snack" class="select-none mx-auto size-32 object-contain"/>
                        </div>
                    </Card.Header>
                    <Card.Footer>
                        <div class="flex flex-col items-center w-full select-none">
                            <p class="font-semibold">{snack.name}</p>
                            <p>{formatPrice(snack.price)}</p>
                        </div>
                    </Card.Footer>
                </div>
            </Card.Root>
        {/each}
    </div>
