import PocketBase from 'pocketbase';
import type { Snack } from '$lib/data/Snack';
import { readable } from 'svelte/store';
import type { User } from '$lib/currentUser.svelte';
import type { CartItem } from '$lib/data/CartItem';

const BASE_URL = 'http://127.0.0.1:8090';
const pb = new PocketBase(BASE_URL);

pb.authStore.onChange(() => {
	console.log(pb.authStore.model);
});
export const authStore = readable(pb.authStore);

// const snackRecords;
function timeout(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getSnacks() {
	const records = await pb.collection('snacks').getFullList({
		sort: '-created'
	});

	const snacks: Snack[] = records.map((r) => ({
		id: r.id,
		name: r.name,
		price: r.price,
		image: pb.files.getUrl(r, r.image)
	}));
	await timeout(2000);
	console.log(records);
	return snacks;
}

export async function getUser(id: string): Promise<User> {
	const record = await pb.collection('users').getOne(id);
	return { name: record.username, balance: record.balance };
}

export async function login(id: string): Promise<User> {
	const authData = await pb.collection('users').authWithPassword(id, id);
	return { name: authData.record.name, balance: authData.record.balance, id: authData.record.id };
}
export class InsufficientFundsError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'InsufficientFundsError';
	}
}
export async function purchaseSnacks(snacks: CartItem[], user: User): Promise<User> {
	const cost = snacks.map((s) => s.snack.price * s.amt).reduce((acc, cur) => acc + cur, 0);
	if (cost > user.balance) {
		throw new InsufficientFundsError(`You are missing: ${user.balance - cost} €`);
	}
	pb.autoCancellation(false);
	// TODO one transaction per item if amount > 1
	const flatSnacks = snacks.flatMap((s) =>
		Array(s.amt)
			.fill(null)
			.map(() => s.snack)
	);
	const transPromises = flatSnacks.map(async (s) => {
		const record = await createTransaction(0 - s.price, user.id!);
		return { snackID: s.id, transactionID: record.id };
	});
	const transactions = await Promise.all(transPromises);

	const purchasePromise = transactions.map((t) =>
		createPurchase(t.snackID, t.transactionID, user.id!)
	);
	await Promise.all(purchasePromise);
	pb.autoCancellation(true);

	return updateBalance(-cost, user);
}

async function createPurchase(snackID: string, transactionID: string, buyerID: string) {
	return await pb
		.collection('purchases')
		.create({ buyer: buyerID, item: snackID, transaction: transactionID });
}

async function createTransaction(amount: number, buyerID: string) {
	return await pb.collection('transactions').create({ amount, buyer: buyerID });
}

export async function rechargeMoney(amt: number, user: User) {
	if (user.id) {
		await createTransaction(amt, user.id);
		await updateBalance(amt, user);
	}
}

export async function updateBalance(amt: number, user: User): Promise<User> {
	const data = { balance: user.balance + amt };
	if (user.id) {
		const record = await pb.collection('users').update(user.id, data);
		return { name: record.username, balance: record.balance, id: record.id };
	} else {
		return { balance: 0 };
	}
}
