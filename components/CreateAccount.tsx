// CrearCuenta.tsx
import { useState } from "react";

interface CrearCuentaProps {
  onCuentaCreada: (nombre: string, saldo: number, moneda: string) => void; // Define el tipo para el prop
}

const CrearCuenta: React.FC<CrearCuentaProps> = ({ onCuentaCreada }) => {
  const [nombre, setNombre] = useState<string>("");
  const [saldo, setSaldo] = useState<number | "">(""); // Puede ser un número o vacío
  const [moneda, setMoneda] = useState<string>("USD");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (saldo !== "") {
      onCuentaCreada(nombre, Number(saldo), moneda); // Llama al callback con los parámetros adecuados
      setNombre("");
      setSaldo(""); // Limpiar los campos
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
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="MXN">MXN</option>
        </select>
      </div>
      <button type="submit">Crear Cuenta</button>
    </form>
  );
};

export default CrearCuenta;
