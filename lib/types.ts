export interface Cuenta {
  id: string;
  nombre: string;
  saldo: number;
  moneda: string;
  userId: string;
}

export enum TipoMovimiento {
  INGRESO = "INGRESO",
  GASTO = "GASTO",
}

export interface Movimiento {
  id: string;
  fecha: Date;
  dinero: number;
  descripcion: string;
  tipo: TipoMovimiento;
  accountId: string;
}
