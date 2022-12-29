import express from "express";
import { config } from "dotenv";
import { userRoutes } from "./controller/user.controller";
import Cors from "cors";
config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(Cors({ origin: "*" }));
app.use(express.json());

app.use("/api/users", userRoutes.router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
