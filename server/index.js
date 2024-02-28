import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import cors from "cors";

import { createUser, getUserByEmail, getUserById } from "./modules/user.mjs";
import { createCategory } from "./modules/category.mjs";

const app = express();
const port = 8080;
const saltRounds = 10;

app.use(bodyParser.json());
app.use(cors());

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

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (user === null) {
      try {
        bcrypt.hash(password, saltRounds, async (error, hash) => {
          if (error) {
            console.error(error);
            res.sendStatus(500);
          } else {
            try {
              const newUser = await createUser(email, hash);
              res.status(201).json({ id: newUser.id, email: newUser.email });
            } catch (error) {
              console.error(error);
              res.sendStatus(500);
            }
          }
        });
      } catch (error) {
        console.error(error);
        res.sendStatus(500);
      }
    } else {
      res.status(400).json({ message: "User already exits." });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post("/category", async (req, res) => {
  const { name, userId } = req.body;
  try {
    const user = await getUserById(userId);
    if (user === null) {
      res.sendStatus(404);
    } else {
      const category = await createCategory(name, userId);
      console.log(category.json());
      res.status(201).json(category);
    }
  } catch (error) {
    if (error.code === "P2002") {
      res
        .status(409)
        .json({ message: `${name} category already exists for user` });
    } else {
      console.error(error);
      res.sendStatus(500);
    }
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
