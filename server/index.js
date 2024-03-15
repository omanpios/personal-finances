import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import cors from "cors";

import { createUser, getUserByEmail, getUserById } from "./modules/user.mjs";
import { createCategory, readCategoriesByUserId } from "./modules/category.mjs";
import {
  createSubcategory,
  getSubcategoriesByCategoryId,
  getSubcategory,
  getSubcategoryBySubcategoryAndUserId,
} from "./modules/subcategory.mjs";
import {
  createTransaction,
  getTransactionsBySubcategoryId,
  getTransactionsByUserId,
} from "./modules/transaction.mjs";

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
            res.status(202).json({ userId: user.id });
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

app.get("/user/:id/categories", async (req, res) => {
  const { id } = req.params;
  const formattedUserID = parseInt(id);
  try {
    const user = await getUserById(formattedUserID);
    if (user === null) {
      res.sendStatus(404);
    } else {
      const categories = await readCategoriesByUserId(formattedUserID);
      res.json(categories);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post("/subcategory", async (req, res) => {
  const subcategory = req.body;
  try {
    const response = await getSubcategory({
      name: subcategory.name,
      categoryId: subcategory.categoryId,
    });
    if (response === null) {
      const newSubcategory = await createSubcategory(subcategory);
      res.status(201).json(newSubcategory);
    } else {
      res
        .status(400)
        .json({ error: `Subcategory '${subcategory.name}' already exists` });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get("/subcategory", async (req, res) => {
  const data = req.query;
  try {
    const subcategory = await getSubcategory(data);
    if (subcategory === null) {
      res.sendStatus(404);
    } else {
      res.json(subcategory);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get("/category/:id/subcategories", async (req, res) => {
  const { id } = req.params;
  try {
    const subcategories = await getSubcategoriesByCategoryId(id);
    const totalProvision = subcategories.reduce((acc, subcategory) => {
      return acc + subcategory.monthlyProvision;
    }, 0);
    const count = subcategories.length;
    res.json({ subcategories, totalProvision, count });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post("/transaction", async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const response = await getSubcategoryBySubcategoryAndUserId(
      data.subcategoryId,
      data.userId
    );
    if (response === null) {
      res.status(409).json({ error: "Subcategory does not belong to userId" });
    } else {
      try {
        const transaction = await createTransaction(data);
        res.status(201).json(transaction);
      } catch (error) {
        console.error(error);
        res.sendStatus(500);
      }
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get("/subcategory/:id/transactions", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getTransactionsBySubcategoryId(id);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get("/user/:id/transactions", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getTransactionsByUserId(id);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
