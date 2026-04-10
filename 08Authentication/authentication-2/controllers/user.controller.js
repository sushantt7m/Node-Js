import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { usersTable, userSessions } from "../db/schema.js";
import bcrypt from "bcrypt";

// import { randomBytes, createHmac } from "node:crypto";

const hashPassword = async (myPassword, saltRound) => {
  return await bcrypt.hash(myPassword, saltRound);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const handleUserSignup = async (req, res) => {
  const { name, email, password } = req.body;

  // check if user already exists
  const [existingUser] = await db
    .select({
      email: usersTable.email,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (existingUser) {
    return res.status(400).json({
      error: `User with email:${email} already exists`,
    });
  }

  const saltRounds = 10;
  const hashedPassword = await hashPassword(password, saltRounds);

  // if user doesnot exist, create new user
  const [user] = await db
    .insert(usersTable)
    .values({
      name,
      email,
      password: hashedPassword,
      // salt,
    })
    .returning({ id: usersTable.id });

  return res.status(201).json({
    status: "Success",
    data: { userId: user.id },
  });
};

export const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;

  const [existingUser] = await db
    .select({
      id: usersTable.id,
      password: usersTable.password,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (!existingUser) {
    return res.status(400).json({
      error: "Invalid credentials",
    });
  }

  const isCorrect = await comparePassword(
    password,
    existingUser.password,
  );

  if (!isCorrect) {
    return res.status(400).json({
      error: "Invalid credentials",
    });
  }

  // generate a session for user, if isCorrect is true

  const [session] = await db
    .insert(userSessions)
    .values({
      userId: existingUser.id,
    })
    .returning({ id: userSessions.id });

  return res.json({
    status: "Success",
    sessionId: session.id,
  });
};

export const handleGetUser = async (req, res) => {
  // we will extract the session id from the headers
  // we will pass the session id in the header as an authentications
  // if the session id would have matchMedia, then
  // req.user woud not be null
  const userData = req.user;
  if (!userData) {
    return res.status(401).json({ error: "You are not logged in " });
  }

  // if there is user data , then we need to print it
  return res.status(200).json({ user: userData });
};

export const handleUpdateUser = async (req, res) => {
  const user = req.user;
  const { name } = req.body;

  if (!user) {
    return res.status(401).json({ error: "You are not logged in" });
  }

  // but if there is valid session header available, the user wouldnot be null
  // we would take the id from the user and patch it

  const result = await db
    .update(usersTable)
    .set({ name: name })
    .where(eq(usersTable.id, user.id))
    .returning();

  return res
    .status(200)
    .json({ msg: "UsersTable Successfully patched", user: result });
};
