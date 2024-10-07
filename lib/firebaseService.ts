import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export interface Cuenta {
  nombre: string;
  saldo: number;
  saldoDisponible: number;
}

export interface Gasto {
  descripcion: string;
  cantidad: number;
  tipo: "Ingreso" | "Gasto";
}

export const crearCuenta = async (userId: string, data: Cuenta) => {
  try {
    const docRef = await addDoc(
      collection(db, `users/${userId}/cuentas`),
      data
    );
    return docRef.id;
  } catch (error) {
    console.error("Error creando cuenta: ", error);
  }
};

export const eliminarCuenta = async (userId: string, cuentaId: string) => {
  try {
    await deleteDoc(doc(db, `users/${userId}/cuentas`, cuentaId));
  } catch (error) {
    console.error("Error eliminando cuenta: ", error);
  }
};

export const añadirGasto = async (
  userId: string,
  cuentaId: string,
  gasto: Gasto
) => {
  try {
    const docRef = await addDoc(
      collection(db, `users/${userId}/cuentas/${cuentaId}/gastos`),
      gasto
    );
    return docRef.id;
  } catch (error) {
    console.error("Error añadiendo gasto: ", error);
  }
};

export const eliminarGasto = async (
  userId: string,
  cuentaId: string,
  gastoId: string
) => {
  try {
    await deleteDoc(
      doc(db, `users/${userId}/cuentas/${cuentaId}/gastos`, gastoId)
    );
  } catch (error) {
    console.error("Error eliminando gasto: ", error);
  }
};

export const obtenerCuentas = async (userId: string) => {
  try {
    const querySnapshot = await getDocs(
      collection(db, `users/${userId}/cuentas`)
    );
    let cuentas: any[] = [];
    querySnapshot.forEach((doc) => {
      cuentas.push({ id: doc.id, ...doc.data() });
    });
    return cuentas;
  } catch (error) {
    console.error("Error obteniendo cuentas: ", error);
  }
};

export const obtenerGastos = async (userId: string, cuentaId: string) => {
  try {
    const gastosSnapshot = await getDocs(
      collection(db, `users/${userId}/cuentas/${cuentaId}/gastos`)
    );
    let gastos: any[] = [];
    gastosSnapshot.forEach((doc) => {
      gastos.push({ id: doc.id, ...doc.data() });
    });
    return gastos;
  } catch (error) {
    console.error("Error obteniendo gastos: ", error);
  }
};
