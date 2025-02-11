import jwt from "jsonwebtoken";
import { envs } from "../config/envs";

export const generateJwt = (name: string) => {
  return new Promise((resolve, reject) => {
    const payload = { name };

    jwt.sign(
      payload,
      envs.secretJwtSecret,
      {
        expiresIn: "2h",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("Error generating token");
        } else {
          resolve(token);
        }
      }
    );
  });
};
