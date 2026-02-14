import Joi from "joi";
import * as securityHandler from "../handlers/securityHandler";
import { RouteOptions, Server } from "@hapi/hapi";
import { validateTokenSchema } from "../validaciones/securityValidation";

module.exports = {
  name: "security-routes",
  version: "1.0.0",
  register: async function (server: Server, options: RouteOptions) {
    server.route([
      {
        method: "POST",
        path: "/generate-token",
        handler: securityHandler.generateToken,
        options: {
          description:
            "Genera un token de 8 digitos y lo guarda en la base de datos",
          tags: ["api", "security"],
        },
      },
      {
        method: "POST",
        path: "/validate-token",
        handler: securityHandler.validateToken,
        options: {
          validate: {
            payload: validateTokenSchema,
            failAction: (request, h, err) => {
              throw err;
            },
          },
          description: "Valida el token generado y comprueba si es autentico",
          tags: ["api", "security"],
        },
      },
    ]);
  },
};
