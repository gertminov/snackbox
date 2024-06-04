<script lang="ts">
    import { snacks} from "$lib/data/Snack";
    import SnackGrid from "$lib/components/ui/SnackGrid.svelte";
    import ShoppingCart from "$lib/components/ui/ShoppingCart.svelte";
    import AuthDialog from "$lib/components/AuthDialog.svelte";

</script>
<div>
    <AuthDialog/>
    <div class="flex h-screen">
        <main class="basis-3/4 overflow-y-scroll">
            <SnackGrid {snacks}/>
        </main>
        <aside class="basis-1/4 border-l border-black">
            <ShoppingCart />
        </aside>
    </div>
</div>