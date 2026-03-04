const apiUrl = 'http://localhost:3000/tasks';

const form = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('taskInput').value;
    const description = document.getElementById('taskDescription').value;

try {
    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ title, description })
    });

    if (!res.ok) throw new Error('Erro ao adicionar tarefa');

    const task = await res.json();
    form.reset();
    addTaskToUl(task);
    
    } catch (error) {
        alert("Erro ao salvar tarefa: " + error.message);
    }

});

function addTaskToUl(task) {
    const li = document.createElement('li');
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
    <span>${task.title} - ${task.description}</span>
    <div>
    <button class="li-button" onclick="toggleComplete(${task.completed})">✅</button>
    <button class="li-button" onclick="deleteTask(${task.id})">🗑️</button>
    </div>
    `;
    task.appendChild(li);
}

async function loadTasks() {
    try {
        const res = await fetch(apiUrl);
        if (res.ok) throw new Error('Erro ao carregar tarefas');
        const tasks = await res.json();
        taskList.innerHTML = "";
        tasks.forEach(addTaskToUl);
        
    } catch (error) {
        alert("Erro ao carregar tarefas: " + error.message);
    }

    async function toggleComplete(id, completed) {
        try{
            await fetch(`${apiUrl}/${id}`), {
                method: "PUT",
                headers: {"Content-Type": "application.json"},
                body: JSON.stringify({completed: !completed})
            }

        } catch (error) {
            alert(`Erro ao atualizar tarefa: ${error.message}`)
        }

        async function deleteTask(id) {
            try{
                await fetch(`${apiURL}/${id}`, {
                    method: "DELETE"
                });

                loadTasks();
            } catch (error) {
                alert(`Erro ao excluir tarefa(s): ${error.message}`);

            }
        }

        loadTasks();
        
    }
}