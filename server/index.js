import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";

import { getUserByEmail } from "./modules/login.mjs";

const app = express();
const port = 8080;
const saltRounds = 10;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Hi!" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (user === null) {
      res.sendStatus(404);
    } else {
      const storedPassword = user.password;
      const loginPassword = password;

      bcrypt.compare(loginPassword, storedPassword, (error, result) => {
        if (error) {
          console.error(error);
          res.sendStatus(500);
        } else {
          if (result) {
            res.sendStatus(202);
          } else {
            res
              .status(401)
              .json({ message: "Invalid email or password submitted" });
          }
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
