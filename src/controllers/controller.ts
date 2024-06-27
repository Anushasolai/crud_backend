import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from "../services/service";


export const postUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, password, email } = req.body;
 

  try {
    
    const newUser = await createUser(name, password, email);
    res.status(201).json({data:newUser,message:'User created successsfully'});
  } catch (error) {
    res.status(300).json({message:'Email already in use'})
    if (error === 'Email already in use') {
      res.status(400).json({ message: 'Email already in use' });
    } else {
      res.status(500).json({ message: 'Internal server error', error });
    }
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.json({data:users,message:'FindallUsers Successfully'});
};

export const getUser = async (req: Request, res: Response) => {
  const user = await getUserById(parseInt(req.params.id));
  if (user) {
    res.json({data:user,message:'Successfully find the user id'});
  } else {
    res.status(404).json({ message: "User not found" });
  }
};



export const putUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, password, email } = req.body;
  try {
    const updatedUser = await updateUser(parseInt(req.params.id), name, password, email);
    if (updatedUser) {
      res.json({data:updatedUser,message:'updatedUser successsfully'});
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    if (error === 'Email already in use') {
      res.status(400).json({ message: 'Email already in use' });
    } else {
      res.status(500).json({ message: 'Internal server error', error });
    }
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  const success = await deleteUser(parseInt(req.params.id));
  if (success) {
    res.status(204).json({message:'DeleteUser successsfully'});
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
