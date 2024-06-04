## Cant mutate state from other module

Does not work
```ts
// moduleA.ts
export let myState = $state(1)
```
```sveltehtml

// ComponentB.svelte
<script lang="ts">
import {myState} from "moduleA"
myState = 2
</script>
```

Does work

```ts
// moduleA.ts
class MyStateBox{
	isOpen = $state(false)
	constructor(initial: boolean) {
		this.isOpen = initial
	}
}
export const myState = new  MyStateBox(false)
```
or
```ts
// moduleA.ts
function createState(initial: boolen) {
	let state = $state(initial);
	return {
		get state() {return state;},
		set state(st: boolean) {state = st;}
	};
}

export const myState = createState(false);
```
```sveltehtml

// ComponentB.svelte
<script lang="ts">
	import {myState} from "moduleA"
	myState.state = 2
</script>
```


### PreventDefault is deprecated

```sveltehtml
<button on:click|once|preventDefault={handler}>...</button>
```
becomes

```sveltehtml
<script>
	function once(fn) {
		return function (event) {
			if (fn) fn.call(this, event);
			fn = null;
		};
	}

	function preventDefault(fn) {
		return function (event) {
			event.preventDefault();
			fn.call(this, event);
		};
	}
</script>

<button onclick={once(preventDefault(handler))}>...</button>
```

