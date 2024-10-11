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

export enum CategoriaMovimiento {
  SUELDO = "SUELDO",
  REGALO = "REGALO",
  VENTA = "VENTA",
  OCIO = "OCIO",
  SUPERMERCADO = "SUPERMERCADO",
  TRANSPORTE = "TRANSPORTE",
  RESTAURANTE = "RESTAURANTE",
  SALUD = "SALUD",
  ALQUILER = "ALQUILER",
  EDUCACION = "EDUCACION",
  OTROS = "OTROS",
}

export interface Movimiento {
  id: string;
  fecha: Date;
  dinero: number;
  descripcion: string;
  tipo: TipoMovimiento;
  categoria: CategoriaMovimiento;
  accountId: string;
}
