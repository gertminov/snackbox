export type User = {
	id?: string;
	name?: string;
	balance: number;
};
export const currentUser: User = $state({ balance: 0.0 });
