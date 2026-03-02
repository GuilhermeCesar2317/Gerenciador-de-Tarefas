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

})