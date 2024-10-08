import { db, auth } from "@/lib/firebaseConfig";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { Cuenta } from "@/lib/types";

export const obtenerCuentas = async (): Promise<Cuenta[]> => {
  const user = auth.currentUser;
  if (!user) return [];

  const q = query(collection(db, "cuentas"), where("userId", "==", user.uid));

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Cuenta[];
};

export const crearCuenta = async (nuevaCuenta: Omit<Cuenta, "id">) => {
  const user = auth.currentUser;

  if (!user) throw new Error("No hay usuario autenticado");

  await addDoc(collection(db, "cuentas"), {
    ...nuevaCuenta,
    userId: user.uid,
  });
};
