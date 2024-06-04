class DialogState {
	isOpen = $state(true);
	constructor(initial: boolean) {
		this.isOpen = initial;
	}
}
export const dialogState = new DialogState(true);
