
// Elements
// // querySelector - Retorna o primeiro elemento que corresponde aos seletores especificados 
const inputBox = document.querySelector(".input-box input");
const addButton = document.querySelector(".input-box button");
const todoBox = document.querySelector(".todo-box");
const clearAll = document.querySelector(".pending button");

// onkeyup - Evento disparado assim que a tecla ao pressionada
inputBox.onkeyup = ()=> {
    let userData = inputBox.value; // Recebe valor dentro da inputBox
    if(userData.trim() !=0) { // Se os valores digitados nao forem espacos
        addButton.classList.add("active"); // Ativa o ADD Button
    } else {
        addButton.classList.remove("active"); // Remove o ADD Button
    }
}

showTasks(); // Chamando funcao showTasks()

// onclick - aciona uma funcao quando um elemento Ã© clicado
addButton.onclick = () => {
    let userData = inputBox.value; // Recebe valor dentro da inputBox
    let getLocalStorage = localStorage.getItem("Novo"); // Recebendo local storage (armazenamento local)
    if(getLocalStorage == null) { // Se local storage for vazio, entao criar array vazio
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage); // JSON.parse analisa uma string e retorna um objeto JS
    }
    listArr.push(userData); // Pucha os dados do usuarios
    localStorage.setItem("Novo", JSON.stringify(listArr)); // Converte objeto javascript para objeto JSON
    showTasks(); // Chamando funcao showTasks()
}

// Funcao adiciona <li> preenchida com o que o usuarios inseriu dentro da <ul>
function showTasks() {
    let getLocalStorage = localStorage.getItem("Novo"); // Recebendo local storage (armazenamento local)
    if(getLocalStorage == null) { // Se local storage for vazio, entÃ£o criar array vazio
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage); // JSON.parse analisa uma string e retorna um objeto JS
    }
    const pendingNumb = document.querySelector(".number-pending");
    pendingNumb.textContent = listArr.length; // A propriedade length obtem o tamanho de elementos em um Array ou String
    // Se o tamanho da lista for maior que 0, ativar clearAll, se nao desativar clearAll
    if(listArr.length > 0) { 
        clearAll.classList.add("active");
    } else {
        clearAll.classList.remove("active");
    }
    let newLiTag = '';
    // O metodo forEach() executa uma dada funcao em cada elemento de um array
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="removeTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoBox.innerHTML = newLiTag; // Adicionando nova tag <li> dentro da tag <ul>
    inputBox.value = ""; // Uma vez que a tarefa ao adicionada, deixe o campo de entrada em branco
}

// Funcao remove tarefa
function removeTask(index) {
    let getLocalStorage = localStorage.getItem("Novo"); // Recebendo local storage (armazenamento local)
    listArr = JSON.parse(getLocalStorage); // JSON.parse analisa uma string e retorna um objeto JS
    listArr.splice(index, 1); // O metodo splice() altera o conteÃºdo de uma lista, adicionando novos elementos enquanto remove elementos antigos
    localStorage.setItem("Novo", JSON.stringify(listArr)); // Converte objeto javascript para objeto JSON
    showTasks(); // Chamando funcao showTasks()
}

// onclick - aciona a funcao clearAll quando o button ao clicado
clearAll.onclick = () => {
    listArr = []; // Array vazio 
    localStorage.setItem("Novo", JSON.stringify(listArr)); // Converte objeto javascript para objeto JSON
    showTasks(); // Chamando funcao showTasks()
}