// Seletores
const todoInput = document.querySelector('#todo');
const todoButton = document.querySelector('#todo-button');
const todoList = document.querySelector('.todo-list');

// Eventos
todoButton.addEventListener('click', addToDoItem);
todoList.addEventListener('click', removeOrCheckItem);
window.onload =  loadLocalStorage;
   


// Funções
function addToDoItem(event) {

    if (!(todoInput.value == null || todoInput.value === '')) {

        // Prevent
        event.preventDefault();

        // Criando uma div para agrupar os elementos
        const toDoItensArea = document.createElement('div');
        toDoItensArea.classList.add('todo-itens-area');

        // Criando o item da lista
        const newToDoItem = document.createElement('li');
        newToDoItem.innerText = todoInput.value;
        newToDoItem.classList.add('todo-item');
        toDoItensArea.appendChild(newToDoItem);

        saveTodoLocalStorage(todoInput.value);

        // Criando botão check
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>'
        completeButton.classList.add('complete-btn');
        toDoItensArea.appendChild(completeButton);

        // Criando botão remover
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-btn');
        toDoItensArea.appendChild(trashButton);

        todoList.appendChild(toDoItensArea);

        todoInput.value = '';
    }

}

function removeOrCheckItem(event) {

    const item = event.target;

    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        removeTodoLocalStorage(todo);
        todo.remove();
    }

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }

}

// LocalStorage
function getLocalStorage(){
    
    // Cria a LocalStorage e retorna um array para permitir manipular os valores que estão no LocalStorage
    const localStorageTodos = JSON.parse(localStorage.getItem('todos'));
    return localStorage.getItem('todos') !== null ? localStorageTodos : [];
}

function saveTodoLocalStorage(todo) {
    
    const todos = getLocalStorage();

    // Adiciona no localStorage
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadLocalStorage(){
    
    // Pega o LocalStorage
    const todos = getLocalStorage();

    // Percorre cada elemento do LocalStorage e adiciona como item da lista.
    todos.forEach(element => {

         // Criando uma div para agrupar cada elemento da lista
         const toDoItensArea = document.createElement('div');
         toDoItensArea.classList.add('todo-itens-area');
 
         // Criando o item da lista
         const newToDoItem = document.createElement('li');
         newToDoItem.innerText = element;
         newToDoItem.classList.add('todo-item');
         toDoItensArea.appendChild(newToDoItem);

         // Criando botão check
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>'
        completeButton.classList.add('complete-btn');
        toDoItensArea.appendChild(completeButton);

        // Criando botão remover
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-btn');
        toDoItensArea.appendChild(trashButton);

        todoList.appendChild(toDoItensArea);

        todoInput.value = '';

    });
}

function removeTodoLocalStorage(todo){
    
    // Pega o LocalStorage
    const todos = getLocalStorage();

    // Busca o texto do item da lista
    let indexItemToBeRemove = todo.children[0].innerText;

    // Busca o índice através do texto e depois remove apenas o primeiro que encontrar
    todos.splice(todos.indexOf(indexItemToBeRemove), 1);

    // Atualiza o LocalStorage
    localStorage.setItem('todos', JSON.stringify(todos));

}
