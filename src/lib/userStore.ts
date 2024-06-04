import {writable} from "svelte/store";

export const userStore = writable({name: "", balance: 0.0})