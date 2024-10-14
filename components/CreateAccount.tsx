import { Cuenta } from "@/lib/types";
import { useState } from "react";
import { User } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <form
      onSubmit={handleSubmit}
      className="max-w-lg w-full mx-auto space-y-6 p-6 bg-white  rounded-lg"
    >
      <div className="flex flex-col">
        <Label
          htmlFor="nombre"
          className="mb-2 text-sm font-medium text-gray-700"
        >
          Nombre de la cuenta:
        </Label>
        <Input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="input"
        />
      </div>

      <div className="flex flex-col">
        <Label
          htmlFor="saldo"
          className="mb-2 text-sm font-medium text-gray-700"
        >
          Saldo inicial:
        </Label>
        <Input
          type="number"
          id="saldo"
          value={saldo}
          onChange={(e) => setSaldo(Number(e.target.value))}
          required
          className="input"
        />
      </div>

      <div className="flex flex-col">
        <Label
          htmlFor="moneda"
          className="mb-2 text-sm font-medium text-gray-700"
        >
          Moneda:
        </Label>
        <select
          id="moneda"
          value={moneda}
          onChange={(e) => setMoneda(e.target.value)}
          className="select"
        >
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="MXN">MXN</option>
        </select>
      </div>

      <Button
        type="submit"
        className="w-full text-white py-2 rounded-lg transition"
      >
        Crear Cuenta
      </Button>
    </form>
  );
};

export default CrearCuenta;
