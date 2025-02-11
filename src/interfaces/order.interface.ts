export interface Order {
  Order_id: string;

  Cliente_id: string;

  Peso: number;

  Volumen: number;

  Tipo_Producto: string;

  Ciudad_Origen: string;

  Ciudad_Destino: string;

  Direccion_Origen: string;

  Direccion_Destino: string;

  Fecha_Salida: Date;

  Fecha_Entrega: Date;

  Precio?: number;

  Estado_Orden: Estados;

  Created_at: Date;

  Updated_at: Date;
}

export enum Estados {
  EN_ESPERA = "EN_ESPERA",
  EN_TRANSITO = "EN_TRANSITO",
  ENTREGADO = "ENTREGADO",
}
