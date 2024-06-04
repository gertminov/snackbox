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

    removeSnack(name: string) {
        const item = this.items.get(name)
        if (item) {
            if (item.amt - 1 < 1) {
                this.items.delete(name)
            } else {
                const temp: CartItem = {...item, amt: item.amt -1};
                this.items.set(item.snack.name, temp)
            }
        }
    }

    clearSnack(name: string) {
        this.items.delete(name)
    }
}
export const selectedItems: SelectedItems = new SelectedItems()


