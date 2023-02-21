import knex from "../database/knex/index.js";
import Error from "../utils/Error.js";
import * as authConfig from "../configs/auth.js";
import pacote from "jsonwebtoken";
import pkg from "bcryptjs";

const { compare } = pkg;
const { sign } = pacote;

export class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new Error("E-mail e/ou senha incorreta!", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error("E-mail e/ou senha incorreta!", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return response.status(201).json({user, token});
  }
}
