import { Router } from "express";
import { check } from "express-validator";
import { getUsers, getUser, postUser, putUser, deleteUserById } from "../controllers/controller";

const router = Router();

router.get("/alluser", getUsers);
router.get("/user/:id", getUser);

router.post(
  "/create",
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    check("email").isEmail().withMessage("Invalid email")
  ],
  postUser
);

router.put(
  "/update/:id",
  [
    check("name").optional().notEmpty().withMessage("Name is required"),
    check("password").optional().isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    check("email").optional().isEmail().withMessage("Invalid email")
  ],
  putUser
);

router.delete("/:id", deleteUserById);

export default router;
