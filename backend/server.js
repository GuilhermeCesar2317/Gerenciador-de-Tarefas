const express = require("express");

const fs = require("fs");

const cors = require("cors");

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());

const FILE_PATH = "./tasks.json";

function readTasks() {
    if (!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(FILE_PATH, "[]");
    }

    return JSON.parse(fs.readFileSync(FILE_PATH));
}

function writeTasks(tasks) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(taskSignal, null, 2));
}

//Definição de rotas da API(Endpoints)

//GET /tasks (Lista todas as tarefas)
app.get("/tasks", (req, res) => {
    res.json(readTasks());
})

//GET /tasks/:id (Buscar uma tarefa específica por ID)
app.get("/tasks/:id", (req, res) => {
    const tasks = readTasks();
    const task = tasks.find(t => t.id == (req.params.id));
    task ? res.json(task): res.status(404).json
    ({message: "Task not found"});
});

//POST /tasks (Criar uma nova tarefa)
app.post("/tasks", (req, res) => {
    const tasks = readTasks();
    const newTask = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description || "",
        completed: false
    }
})

//PUT /tasks:id (Atualizar uma tarefa existente)
app.put("/tasks:id", (req, res) => {
    const tasks = readTasks();
    const taskIndex = task.findIndex(t => t.id ==req.params.id);
    if (taskIndex === -1) return res.status(404).json({message: "Task not found"});
    tasks[taskIndex] = {...tasks[taskIndex], ...req.body};

    writeTasks(tasks);
    res.json(tasks[taskIndex]);

})

//DELETE /tasks/:id(excluir uma tafera)

app.delete("/tasks:id",(req,res) => {
    let tasks = readTasks();

    tasks = tasks.filter(t => t.id != req.params.id);
    writeTasks(tasks);
    res.status(204).send()
})


app.listen(PORT, () => console.log(`Server running on http://locahost:${PORT}`));