import { Movimiento } from "../types";
import { persistentAtom } from "@nanostores/persistent";

export const $transactions = persistentAtom<Movimiento[]>("transaction", [], {
  encode: JSON.stringify,
  decode: (coded) => {
    const parsed = JSON.parse(coded);
    return parsed.map((transaction: Movimiento) => ({
      ...transaction,
      fecha: new Date(transaction.fecha),
    }));
  },
});

export function createTransaction(transaction: Movimiento) {
  $transactions.set([...$transactions.get(), transaction]);
}

export function deleteTransaction(transactionId: string) {
  $transactions.set(
    $transactions.get().filter(({ id }) => id !== transactionId)
  );
}
