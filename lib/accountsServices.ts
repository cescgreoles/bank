import { db, auth } from "@/lib/firebaseConfig";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { Cuenta, Movimiento, TipoMovimiento } from "@/lib/types";
import { User } from "firebase/auth";

export const obtenerCuentas = async (user?: User): Promise<Cuenta[]> => {
  if (!user) return [];

  const accountsCollection = collection(db, "cuentas");
  const q = query(accountsCollection, where("userId", "==", user.uid));
  const accountsSnapshot = await getDocs(q);

  const cuentas = accountsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Cuenta[];

  return await Promise.all(
    cuentas.map(async (cuenta) => {
      const movimientos = await obtenerMovimientos(cuenta.id);
      const saldo = calcularSaldo(movimientos, cuenta.saldo);

      return { ...cuenta, saldo };
    })
  );
};

export const crearCuenta = async (
  nuevaCuenta: Omit<Cuenta, "id">,
  user?: User
) => {
  if (!user) throw new Error("No hay usuario autenticado");

  await addDoc(collection(db, "cuentas"), nuevaCuenta);
};

export const obtenerMovimientos = async (
  accountId?: string
): Promise<Movimiento[]> => {
  if (!accountId) return [];

  const movimientosCollection = collection(db, "movimientos");
  const q = query(movimientosCollection, where("accountId", "==", accountId));
  const movimientosSnapshot = await getDocs(q);

  return movimientosSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    fecha: doc.data().fecha.toDate(),
  })) as Movimiento[];
};

export const crearMovimiento = async (
  nuevoMovimiento: Omit<Movimiento, "id">
) => {
  await addDoc(collection(db, "movimientos"), nuevoMovimiento);
};

export const calcularSaldo = (
  movimientos: Movimiento[],
  saldoInicial: number
): number => {
  return movimientos.reduce((total, movimiento) => {
    if (movimiento.tipo === TipoMovimiento.GASTO)
      return total - movimiento.dinero;
    return total + movimiento.dinero;
  }, saldoInicial);
};
