class DialogState {
	isOpen = $state(true);
	constructor(initial: boolean) {
		this.isOpen = initial;
	}
}
export const insufficientFundsDialogState = new DialogState(false);
export const rechargeFundsDrawerState = new DialogState(false);
