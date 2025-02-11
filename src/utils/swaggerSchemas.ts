export const clientSchema = {
  type: "object",
  properties: {
    cliente_id: {
      type: "string",
    },
    nombre: {
      type: "string",
    },
    tipo_documento: {
      type: "string",
    },
    numero_documento: {
      type: "number",
    },
    Celular: {
      type: "string",
    },
    Correo_Electronico: {
      type: "string",
    },
  },
};

export const createClientSchema = {
  type: "object",
  properties: {
    nombre: {
      type: "string",
      required: true,
      example: "John Doe",
    },
    tipo_documento: {
      type: "string",
      required: true,
      example: "CC",
    },
    numero_documento: {
      type: "number",
      required: true,
      example: 1234567890,
    },
    telefono_fijo: {
      type: "number",
      example: 6001234567,
    },
    celular: {
      type: "number",
      required: true,
      example: 3001234567,
    },
    correo_electronico: {
      type: "string",
      required: true,
      example: "johndoe@example.com",
    },
    departamento: {
      type: "string",
      required: true,
      example: "Tolima",
    },
    ciudad: {
      type: "string",
      required: true,
      example: "Ibagüe",
    },
    direccion: {
      type: "string",
      required: true,
      example: "Carrera 10 #20-30",
    },
  },
};

export const orderSchema = {
  type: "object",
  properties: {
    cliente_id: {
      type: "string",
    },
    peso: {
      type: "number",
    },
    volumen: {
      type: "number",
    },
    tipo_producto: {
      type: "string",
    },
    ciudad_origen: {
      type: "string",
    },
    ciudad_destino: {
      type: "string",
    },
    direccion_origen: {
      type: "string",
    },
    direccion_destino: {
      type: "string",
    },
    fecha_salida: {
      type: "string",
    },
    fecha_entrega: {
      type: "string",
    },
    precio: {
      type: "number",
    },
    estado_orden: {
      type: "string",
    },
    created_at: {
      type: "string",
    },
    updated_at: {
      type: "string",
    },
  },
};

export const createOrderSchema = {
  type: "object",
  properties: {
    cliente_id: {
      type: "string",
      required: true,
      example: "CR0001",
    },
    peso: {
      type: "number",
      required: true,
      example: 10,
    },
    volumen: {
      type: "number",
      required: true,
      example: 10,
    },
    tipo_producto: {
      type: "string",
      required: true,
      example: "Madera",
    },
    ciudad_origen: {
      type: "string",
      required: true,
      example: "Ibagüe",
    },
    ciudad_destino: {
      type: "string",
      required: true,
      example: "Bogotá",
    },
    direccion_origen: {
      type: "string",
      required: true,
      example: "Carrera 10 #20-30",
    },
    direccion_destino: {
      type: "string",
      required: true,
      example: "Carrera 40 #26-12",
    },
  },
};

export const updateOrderSchema = {
  type: "object",
  properties: {
    estado_orden: {
      type: "string",
      required: true,
      example: "Entregado",
    },
  },
};

export const loginSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      required: true,
      example: "johndoe@example.com",
    },
    password: {
      type: "string",
      required: true,
      example: "password123",
    },
  },
};

export const registerSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      required: true,
      example: "John Doe",
    },
    email: {
      type: "string",
      required: true,
      example: "johndoe@example.com",
    },
    password: {
      type: "string",
      required: true,
      example: "password123",
    },
  },
};
