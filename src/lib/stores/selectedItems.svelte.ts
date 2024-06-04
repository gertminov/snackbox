import type {CartItem} from "$lib/data/CartItem";
import type {Snack} from "$lib/data/Snack";
import {Map} from "svelte/reactivity";


class SelectedItems{
    items: Map<string, CartItem> = $state(new Map())

    addSnack(snack: Snack) {

        const item = this.items.get(snack.name)
        if (item) {
            const temp: CartItem = {...item, amt: item.amt +1}
            this.items.set(item.snack.name, temp)
        } else {
            this.items.set(snack.name, {snack, amt: 1})
        }
    }

    removeSnack(snack: Snack) {
        const item = this.items.get(snack.name)
        if (item) {
            if (item.amt - 1 < 1) {
                this.items.delete(snack.name)
            } else {
                const temp: CartItem = {...item, amt: item.amt -1};
                this.items.set(item.snack.name, temp)
            }
        }
    }

    clearSnack(snack: Snack) {
        this.items.delete(snack.name)
    }
}
export const selectedItems: SelectedItems = new SelectedItems()


