import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { usersTable } from "../db/schema.js";
import {
  hashPassword,
  compareHashedPassword,
} from "../services/auth.service.js";

import jwt from "jsonwebtoken";

export const handleUserSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(401)
        .json({ error: "all the fields are required" });
    }

    const existingUser = await db
      .select({ email: usersTable.email })
      .from(usersTable)
      .where(eq(usersTable.email, email));
    if (existingUser.length !== 0) {
      return res.status(401).json({ error: "user Already exists" });
    }

    // we will hash the password
    const hashedPassword = await hashPassword(password);
    // now we are gonna store these in our database
    const result = await db.insert(usersTable).values({
      name: name,
      email: email,
      password: hashedPassword,
    });
    console.log([result]);
    return res.json({ msg: "data successfully inserted", result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Internal Server Error" });
  }
};

export const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // first we check if the email exists or not
    const [user] = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        name: usersTable.name,
        role: usersTable.role,
        hashedPassword: usersTable.password,
      })
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      return res.status(404).json({ error: "Invalid Credentials" });
    }

    //   if user exists
    //   check the password
    const isCorrect = await compareHashedPassword(
      password,
      user.hashedPassword,
    );

    if (!isCorrect) {
      return res.status(404).json({ error: "Invalid Credentials" });
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return res.json({ status: "Success", token: token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const handleGetUser = async (req, res) => {
  const userData = req.user;

  // if there is user data , then we need to print it
  return res.status(200).json({ user: userData });
};

export const handleUpdateUser = async (req, res) => {
  const { name } = req.body;

  //   we will take the user from req.user
  const user = req.user;
  const result = await db
    .update(usersTable)
    .set({ name: name })
    .where(eq(usersTable.id, user.id))
    .returning();

  return res.status(200).json({
    message: "User patched Succesfully",
    patchedUserData: result,
  });
};

export const handleGetAllUsers = async (req, res) => {
  const allUsers = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
    })
    .from(usersTable);
  return res.json({ allUsers });
};
