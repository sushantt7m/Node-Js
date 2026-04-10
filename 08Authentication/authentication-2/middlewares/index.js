import { usersTable, userSessions } from "../db/schema";
import db from "../db/index.js";
import { eq } from "drizzle-orm";

export const authorisationMiddleware = async (req, res, next) => {
  const sessionId = req.headers["session-id"];

  if (!sessionId) {
    return next();
  }

  // but if there is session id
  // then we are gonna match that with the userSessions

  const [data] = await db
    .select({
      sessionId: userSessions.id,
      id: usersTable.id,
      userId: userSessions.userId,
      name: usersTable.name,
      email: usersTable.email,
      hashedPassword: usersTable.password,
    })
    .from(userSessions)
    .innerJoin(usersTable, eq(usersTable.id, userSessions.userId))
    .where(eq(userSessions.id, sessionId));

  // if the data is null then the session id has not matched with that of the userSessions.id
  if (!data) {
    return next();
  }

  //   but if there is data
  // we will create a new property in req
  req.user = data;
  next();
};
