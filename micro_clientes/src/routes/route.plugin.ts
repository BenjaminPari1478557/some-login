import { RouteOptions, Server } from "@hapi/hapi";
import * as clientHandler from "../handlers/clientHandler";
import { createClient } from "../handlers/clientHandler";
import { options } from "joi";
import { registerClientSchema } from "../validaciones/clientValidation";

module.exports = {
  name: "client-routes",
  version: "1.0.0",
  register: async function (server: Server, options: RouteOptions) {
    server.route([
      {
        method: "POST",
        path: "/register-client",
        handler: clientHandler.createClient,
        options: {
          validate: {
            payload: registerClientSchema,
            failAction: (request, h, err) => {
              throw err;
            },
          },
        },
      },
    ]);
  },
};
