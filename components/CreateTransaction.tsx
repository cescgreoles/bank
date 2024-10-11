import { Movimiento, TipoMovimiento, CategoriaMovimiento } from "@/lib/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateTransactionProps {
  onTransactionCreated: (transaction: Omit<Movimiento, "id">) => void;
  accountId: string;
}

const CreateTransaction: React.FC<CreateTransactionProps> = ({
  onTransactionCreated,
  accountId,
}) => {
  const [description, setDescription] = useState<string>("");
  const [money, setMoney] = useState<number>();
  const [type, setType] = useState<TipoMovimiento>(TipoMovimiento.GASTO);
  const [category, setCategory] = useState<CategoriaMovimiento>();
  const [date, setDate] = useState<Date>(new Date());

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!category) {
      alert("Por favor, selecciona una categoría.");
      return;
    }

    onTransactionCreated({
      fecha: date,
      dinero: money!,
      descripcion: description,
      tipo: type,
      categoria: category,
      accountId,
    });

    // Reset form
    setDescription("");
    setMoney(undefined);
    setType(TipoMovimiento.GASTO);
    setCategory(undefined);
    setDate(new Date());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-center space-x-4"
    >
      {/* Concepto */}
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

      {/* Importe */}
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

      {/* Tipo de Movimiento */}
      <div className="flex flex-col">
        <Label htmlFor="type">Tipo:</Label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value as TipoMovimiento)}
          className="input"
        >
          {Object.values(TipoMovimiento).map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo.toLowerCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Categoría */}
      <div className="flex flex-col">
        <Label htmlFor="category">Categoría:</Label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as CategoriaMovimiento)}
          className="input"
          required
        >
          <option value="" disabled>
            Selecciona una categoría
          </option>
          {Object.values(CategoriaMovimiento).map((cat) => (
            <option key={cat} value={cat}>
              {cat.toLowerCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Fecha */}
      <div className="flex flex-col">
        <Label htmlFor="date">Fecha:</Label>
        <Input
          type="date"
          id="date"
          value={date.toISOString().split("T")[0]}
          onChange={(e) =>
            setDate(e.target.value ? new Date(e.target.value) : new Date())
          }
          required
        />
      </div>

      {/* Submit Button */}
      <Button type="submit" className="mt-4">
        Crear Movimiento
      </Button>
    </form>
  );
};

export default CreateTransaction;
