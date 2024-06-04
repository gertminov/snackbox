<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog";
    import {dialogOpen} from "$lib/dialogState";
    import {userStore} from "$lib/userStore";
    let input: HTMLInputElement

    function handleFocus(open: boolean) {
        if (open) {
            input?.focus()
            console.log("open")
        }else  {
        }
    }
    function closeModal() {
        console.log(input?.value)
        $userStore = {name: "Jacob", balance: 12.3}
        $dialogOpen = false
    }
    dialogOpen.subscribe(handleFocus)
</script>

<Dialog.Root bind:open={$dialogOpen} >
<!--    <Dialog.Trigger/>-->
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Please Authenticate</Dialog.Title>
            <Dialog.Description>
                Hold your chip card against the scanner
            </Dialog.Description>
        </Dialog.Header>
        <form action="" on:submit|preventDefault={closeModal}>
            <input class="h-0" type="text" bind:this={input}>
        </form>
    </Dialog.Content>
</Dialog.Root>