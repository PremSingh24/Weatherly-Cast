import express from "express";
import cors from "cors";
import { connectDB } from "./database/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Allowing Requests from Specific Hosts
    credentials: true,
  })
);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server is listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database Connection Error!!", err); //// remove this at the time of hosting
  });

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server Working Properly" });
});

///Routes
import userRouter from "./routes/auth.routes.js";
import cityRouter from "./routes/city.routes.js";

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/city", cityRouter);

app.use("/*", (req, res) => {
  res.status(404).json({ message: "Invalid Route" });
});

export default app;
