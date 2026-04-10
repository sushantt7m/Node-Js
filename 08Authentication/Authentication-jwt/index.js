import express from "express";
import { authenticationMiddleware } from "./middlewares/auth.middleware.js";
import adminRouter from "./routes/admin.routes.js";
import userRouter from "./routes/user.route.js";

const app = express();
const PORT = 8000;

// json middleware
app.use(express.json());
app.use(authenticationMiddleware);

app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => console.log(`Server started on port:${PORT}`));
