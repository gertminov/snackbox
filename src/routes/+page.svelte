<script lang="ts">
    import { snacks} from "$lib/data/Snack";
    import SnackGrid from "$lib/components/ui/SnackGrid.svelte";
    import ShoppingCart from "$lib/components/ui/shopping-card/ShoppingCart.svelte";
    import AuthDialog from "$lib/components/AuthDialog.svelte";
    import { ScrollArea } from '$lib/components/ui/scroll-area';

</script>
<div>
    <AuthDialog/>
    <div class="flex h-screen">
        <ScrollArea class="basis-3/4">
            <SnackGrid {snacks}/>
        </ScrollArea>
<!--        <main class="basis-3/4 ">-->
<!--        </main>-->
        <aside class="basis-1/4 border-l border-black">
            <ShoppingCart />
        </aside>
    </div>
</div>