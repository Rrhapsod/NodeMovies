import Error from "../utils/Error.js";

import { UserCreateService } from "./UserCreateService";
import { UserRepositoryInMemory } from "../repositories/UserRepositoryInMemory";

describe("Users", () => {
  it("should be created an user", async () => {
    const user = {
      name: "Teste do Jest",
      email: "user@test.com",
      password: "123",
    };

    const userRepositoryInMemory = new UserRepositoryInMemory();
    const userCreateService = new UserCreateService(userRepositoryInMemory);
    const userCreated = await userCreateService.execute(user);

    expect(userCreated).toHaveProperty("id");
  });

  it("should not be created an email that already exists", async () => {
    const user1 = {
      name: "Teste do Jest",
      email: "user@test.com",
      password: "123",
    };

    const user2 = {
      name: "Teste do Jest 2",
      email: "user@test.com",
      password: "123",
    };

    const userRepositoryInMemory = new UserRepositoryInMemory();
    const userCreateService = new UserCreateService(userRepositoryInMemory);

    await userCreateService.execute(user1);
    await expect(userCreateService.execute(user2)).rejects.toEqual(
      new Error("E-mail já cadastrado!")
    );
  });
});
