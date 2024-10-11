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

    setDescription("");
    setMoney(undefined);
    setType(TipoMovimiento.GASTO);
    setCategory(undefined);
    setDate(new Date());
  };

  return (
    <div>
      <h3 className="uppercase font-bold py-5">Nuevo movimiento</h3>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4"
      >
        <div className="flex flex-col">
          <Label htmlFor="description">Concepto:</Label>
          <Input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="type">Tipo:</Label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as TipoMovimiento)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.values(TipoMovimiento).map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo.toLowerCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <Label htmlFor="category">Categoría:</Label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as CategoriaMovimiento)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <Button
            type="submit"
            className="w-full lg:w-auto mt-4  text-white rounded-md px-6 py-2 "
          >
            Crear Movimiento
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTransaction;
