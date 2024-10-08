import { Movimiento, TipoMovimiento } from "@/lib/types";
import { useState } from "react";

interface CreateTransactionProps {
  onTransactionCreated: (transatcion: Omit<Movimiento, "id">) => void;
  accountId: string;
}

const CreateTransaction: React.FC<CreateTransactionProps> = ({
  onTransactionCreated,
  accountId,
}) => {
  const [description, setDescription] = useState<string>("");
  const [money, setMoney] = useState<number>();
  const [type, setType] = useState<TipoMovimiento>(TipoMovimiento.GASTO);
  const [date, setDate] = useState<Date>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onTransactionCreated({
      fecha: date,
      dinero: money,
      descripcion: description,
      tipo: type,
      accountId,
    });
    setDescription("");
    setMoney(undefined);
    setType(TipoMovimiento.GASTO);
    setDate(undefined);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Concepto:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Importe:</label>
        <input
          type="number"
          value={money}
          onChange={(e) =>
            setMoney(e.target.value ? Number(e.target.value) : undefined)
          }
          required
        />
      </div>

      <div>
        <label>Tipo:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as TipoMovimiento)}
        >
          {Object.values(TipoMovimiento).map((tipo) => (
            <option key={tipo} value={tipo} className="capitalize">
              {tipo.toLowerCase()}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Fecha:</label>
        <input
          type="date"
          value={date ? date.toISOString().split("T")[0] : ""}
          onChange={(e) =>
            setDate(e.target.value ? new Date(e.target.value) : undefined)
          }
          required
        />
      </div>

      <button type="submit">Crear Movimiento</button>
    </form>
  );
};

export default CreateTransaction;
