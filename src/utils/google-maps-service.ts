import { envs } from "../config/envs";
import { GmapsResponse } from "../interfaces/gmaps.interface";
import formatAddress from "./address-format";

export const addressValidation = async (
  Direccion_Destino: string,
  Ciudad_Destino: string
): Promise<GmapsResponse> => {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${formatAddress(
      Direccion_Destino
    )},${Ciudad_Destino},Colombia&key=${envs.googleMapsApiKey}`
  );

  return res.json();
};
