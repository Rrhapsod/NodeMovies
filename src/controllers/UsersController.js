import knex from "../database/knex/index.js";
import Error from "../utils/Error.js";
import pkg from "bcryptjs";
const { hash, compare } = pkg

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userExists = await knex("users").where({ email }).first();

    if (userExists) {
      throw new Error("E-mail já cadastrado!");
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    return response.status(201).json();
  }

  async update(request, response){
    const {name, email, password, old_password} = request.body
    const {id} = request.params

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

      await knex("users").update({
        name,
        email,
        password: hashedPassword,
        updated_at: fn.now()
      }).where({id})

      return response.status(201).json();
    }
  }

  async delete (request, response){
    const { id } = request.params;

    await knex("users").where({ id }).delete();

    return response.status(201).json();
  }
}

export default UsersController;
