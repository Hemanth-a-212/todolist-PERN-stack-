import express from "express";
import cors from "cors";
import pg from "pg";

const app = express();
const port=5000;
const db= new pg.Client({
    user:"postgres",
    host:'localhost',
    password:"Hemanth@0201",
    database:"tododatabase",
    port:5432
})

db.connect();

//middleware
app.use(cors());
app.use(express.json()); 

//ROUTES//

app.post("/todo", async (req, res) => {
  try {
    const { task } = req.body;
    const newTodo = await db.query(
      "INSERT INTO todo (task) VALUES($1) RETURNING *",
      [task]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});



app.get("/todo", async (req, res) => {
  try {
    const allTodos = await db.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});



app.get("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await db.query("SELECT * FROM todo WHERE id = $1", [
      id
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});



app.put("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;
    const updateTodo = await db.query(
      "UPDATE todo SET task = $1 WHERE id = $2",
      [task, id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});


app.delete("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await db.query("DELETE FROM todo WHERE id = $1", [
      id
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});
