// CrearCuenta.tsx
import { Cuenta } from "@/lib/types";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebaseConfig";
import { User } from "firebase/auth";

interface CrearCuentaProps {
  onCuentaCreada: (cuenta: Omit<Cuenta, "id">) => void;
  user: User;
}

const CrearCuenta: React.FC<CrearCuentaProps> = ({ onCuentaCreada, user }) => {
  const [nombre, setNombre] = useState<string>("");
  const [saldo, setSaldo] = useState<number | "">("");
  const [moneda, setMoneda] = useState<string>("EUR");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (saldo !== "") {
      onCuentaCreada({ moneda, saldo, nombre, userId: user.uid });
      setNombre("");
      setSaldo("");
      setMoneda("EUR");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre de la cuenta:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Saldo inicial:</label>
        <input
          type="number"
          value={saldo}
          onChange={(e) => setSaldo(Number(e.target.value))}
          required
        />
      </div>

      <div>
        <label>Moneda:</label>
        <select value={moneda} onChange={(e) => setMoneda(e.target.value)}>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="MXN">MXN</option>
        </select>
      </div>
      <button type="submit">Crear Cuenta</button>
    </form>
  );
};

export default CrearCuenta;
