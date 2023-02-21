import knex from "../database/knex/index.js";
import Error from "../utils/Error.js";
import pkg from "bcryptjs";

import { UserRepository } from "../repositories/UserRepository.js";
import { UserCreateService } from "../services/UserCreateService.js";

const { compare } = pkg;

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);

    await userCreateService.execute({ name, email, password });

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const id = request.user.id;

    const user = await knex("users").where({ id }).first();
    if (!user) {
      throw new Error("Usuário não encontrado!");
    }

    const userWithUpdatedEmail = await knex("users").where({ email }).first();
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new Error("E-mail já cadastrado!");
    }

    if (password && !old_password) {
      throw new Error("Informe a senha antiga para alterá-la!");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      if (!checkOldPassword) {
        throw new Error("Senha incorreta!");
      }
      const hashedPassword = await hash(password, 8);

      await knex("users")
        .update({
          name,
          email,
          password: hashedPassword,
          updated_at: knex.fn.now(),
        })
        .where({ id });

      return response.status(201).json();
    }
  }

  async delete(request, response) {
    const id = request.user.id;

    await knex("users").where({ id }).delete();

    return response.status(201).json();
  }
}

export default UsersController;
