const express = require("express");

const fs = require("fs");

const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const FILE_PATH = "./tasks.json";

function readTasks(){
    if (!fs.existsSync(FILE_PATH)){
        fs.writeFileSync(FILE_PATH, "[]")
    }

    return JSON.parse(fs.readFileSync(FILE_PATH));
}

function writeTasks(tasks) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null,2));
}

// Definição de rotas da API(Endpoints)

//GET /tasks (Lista todas as tarefas)
app.get("/tasks", (req, res) => {
    res.json(readTasks());
})

//GET /taks/:id (Buscar por tarefa específica)
app.get("/tasks/ :id", (req, res) => {
    const tasks = readTasks();
    const task = tasks.find(t => t.id == req.params.id)
    task ? res.json(task): res.status(404).json({message:"Task not found"});
})

//POST /tasks (Criar uma nova tarefa)
app.post("/tasks", (req, res) => {
    const tasks = readTasks();
    const newTask = {
        id: Date.now(),
        tile: req.body.title,
        description: req.body.description || "",
        completed: false
    };
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(new5Task);
});

// PUT /tasks/:id (atualizar tarefa existente)
app.put("/tasks/:id", (req, res) => {
    const tasks = readTasks();
    const taskIndex = tasks.findIndex(t => t.id == req.params.id);
    if(taskIndex === -1) return res.status(404).json({message: "Task not found"});
    tasks[taskIndex] = {...tasks[taskIndex], ...req.body };

    writeTasks(tasks);
    res.json(tasks[taskIndex]);
})

// DELETE /tasks/:id (Excluir uma tarefa)

app.delete("/tasks/:id", (req, res) => {
    let tasks = readTasks();

    tasks = tasks.filter(t => t.id != req.params.id);
    writeTasks(tasks);
    res.status(204).send();
}) 
app.listen(PORT, () => console.log(`server runnig on http://local:${PORT}`));


