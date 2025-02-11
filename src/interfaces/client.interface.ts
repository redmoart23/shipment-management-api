export interface Client {
  Client_id: string;
  Nombre: string;
  Tipo_Documento: DocumentType;
  Numero_Documento: number;
  Telefono_Fijo?: number;
  Celular: number;
  Correo_Electronico: string;
  Departamento: string;
  Ciudad: string;
  Direccion: string;
}

enum DocumentType {
  DNI = "DNI",
  RUC = "RUC",
  PASAPORTE = "PASAPORTE",
  CC = "Cedula de Ciudadania",
  CE = "Cedula de Extranjeria",
}
