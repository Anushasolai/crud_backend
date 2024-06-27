import { AppSource } from "../dbConfig";
import { UserTable } from "../entities/user";
import bcrypt from "bcryptjs";

export const createUser = async (name: string, password: string, email: string): Promise<UserTable> => {
  const userRepository = AppSource.getRepository(UserTable);
  const existingUser = await userRepository.findOneBy({ email });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = userRepository.create({ name, password:hashedPassword, email });
  return await userRepository.save(user);
};

export const getAllUsers = async (): Promise<UserTable[]> => {
  const userRepository = AppSource.getRepository(UserTable);
  return await userRepository.find();
};

export const getUserById = async (id: number): Promise<UserTable | null> => {
  const userRepository = AppSource.getRepository(UserTable);
  return await userRepository.findOneBy({ id });
};

export const updateUser = async (id: number, name: string, password: string, email: string): Promise<UserTable | null> => {
  const userRepository = AppSource.getRepository(UserTable);
  const user = await userRepository.findOneBy({ id });
  if (!user) return null;

  const existingUser = await userRepository.findOneBy({ email });
  if (existingUser && existingUser.id !== id) {
    throw new Error('Email already in use by another user');
  }

  user.name = name;
  user.password = password;
  user.email = email;
  return await userRepository.save(user);
};

export const deleteUser = async (id: number): Promise<boolean> => {
  const userRepository = AppSource.getRepository(UserTable);
  const result = await userRepository.delete(id);
  return result.affected !== 0;
};
