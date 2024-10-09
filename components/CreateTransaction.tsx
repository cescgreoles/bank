import { Movimiento, TipoMovimiento } from "@/lib/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-center space-x-4"
    >
      <div className="flex flex-col">
        <Label htmlFor="description">Concepto:</Label>
        <Input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col">
        <Label htmlFor="money">Importe:</Label>
        <Input
          type="number"
          id="money"
          value={money}
          onChange={(e) =>
            setMoney(e.target.value ? Number(e.target.value) : undefined)
          }
          required
        />
      </div>

      <div className="flex flex-col">
        <Label htmlFor="type">Tipo:</Label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value as TipoMovimiento)}
          className="input"
        >
          {Object.values(TipoMovimiento).map((tipo) => (
            <option key={tipo} value={tipo} className="capitalize">
              {tipo.toLowerCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <Label htmlFor="date">Fecha:</Label>
        <Input
          type="date"
          id="date"
          value={date ? date.toISOString().split("T")[0] : ""}
          onChange={(e) =>
            setDate(e.target.value ? new Date(e.target.value) : undefined)
          }
          required
        />
      </div>

      <Button type="submit" className="mt-4">
        Crear Movimiento
      </Button>
    </form>
  );
};

export default CreateTransaction;
