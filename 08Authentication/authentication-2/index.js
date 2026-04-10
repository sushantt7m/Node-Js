import express from "express";
import userRouter from "./routes/user.route.js";
import { authorisationMiddleware } from "./middlewares/index.js";

const app = express();
const PORT = process.env.PORT ?? 8000;

// middlewares
app.use(express.json());
app.use(authorisationMiddleware);

app.get("/", (req, res) => {
  return res.json({ message: "Server is up and running" });
});

app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server running on PORT:${PORT}`));
