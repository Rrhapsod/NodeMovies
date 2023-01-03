import Error from "../utils/Error.js";
import bcryptjs from "bcryptjs";

export class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }) {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new Error("E-mail já cadastrado!");
    }

    const hashedPassword = await bcryptjs.hash(password, 8);

    const userCreated = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return userCreated;
  }
}
