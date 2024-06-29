document.addEventListener('DOMContentLoaded', () => {
    // acessar os elementos via DOM
    let taskInput = document.getElementById('novatask');
    let addTaskButton = document.getElementById('addtask');
    let taskList = document.getElementById('tasklist');
    
    // carrega tasks salvas
    loadTask();
    
    // evento de conexão com a função addTask()
    addTaskButton.addEventListener('click', addTask);

    // função que adiciona tarefa na lista
    function addTask(){
        // pega o texto do input
        const textTask = taskInput.value.trim();
        // condicional para verificar string vazia
        if (textTask === ''){ return };       

        // Verifica se a tarefa já existe antes de adicionar
        if (!taskDuplicada(textTask)) {
            // Cria o elemento li
            let taskItem = criaElementoTask(textTask);
            // Inclui o item na lista de tarefas
            taskList.appendChild(taskItem);
            // Salva a tarefa no localStorage
            saveTask(textTask);
        } else {
            alert("Esta tarefa já existe!");
        }
    }
    
    // função que cria o elemento li: <p> e <button>
    function criaElementoTask(text){
        //criar um elemento li
        const itemLi = document.createElement('li');
        //criar um paragrafo
        const itemP = document.createElement('p');
        //criar um botão
        const itemButton = document.createElement('button');
        
        //li vai adotar filhos
        itemLi.appendChild(itemP);
        itemLi.appendChild(itemButton);

        //mudar o conteúdo dos elementos
        itemP.textContent = text;
        itemButton.textContent = 'Remover';

        // deleta a tarefa
        itemButton.addEventListener('click', () =>{
            taskList.removeChild(itemLi);
            // Não esqueça de remover a tarefa do localStorage também
            deleteTask(text);
        });

        // Adiciona evento de duplo clique para editar a tarefa
        itemP.addEventListener('dblclick', () => {
            // Salva o texto original para posterior comparação
            const originalText = itemP.textContent;
            // Cria um campo de entrada para edição
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = originalText;
            // Substitui o parágrafo pelo campo de entrada
            itemLi.replaceChild(inputField, itemP);
            // Foca no campo de entrada
            inputField.focus();
            // Adiciona evento de pressionar Enter para salvar a edição
            inputField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const newText = inputField.value.trim();
                    // Verifica se o novo texto não está vazio e é diferente do original
                    if (newText !== '' && newText !== originalText) {
                        itemP.textContent = newText;
                        // Atualiza a tarefa no localStorage
                        updateTask(originalText, newText);
                    }
                    // Substitui o campo de entrada pelo parágrafo novamente
                    itemLi.replaceChild(itemP, inputField);
                }
            });
        });
        
        // retorna o elemento criado
        return itemLi;
    }    

    // função que salva a tarefa no localStorage
    function saveTask(textTask){
        // acesso os dados do localStorage e converto em objeto JS
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        tasks.push({
            text: textTask,
            completa: false
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // função que carrega a tarefa do localStorage
    function loadTask(){
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
        tasks.forEach(task => {
            const taskItem = criaElementoTask(task.text);

            if (task.completa) {
                taskItem.classList.add('completo');
            }

            taskList.appendChild(taskItem);
        });
    }
    
    // função para verificar se a tarefa já existe no array de tarefas
    function taskDuplicada(textTask){
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        return tasks.some(task => task.text === textTask);
    }

    // função que atualiza a tarefa no localStorage
    function updateTask(oldText, newText){
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Encontra a tarefa pelo texto antigo e atualiza o texto
        tasks.forEach(task => {
            if (task.text === oldText) {
                task.text = newText;
            }
        });

        // Salva as alterações de volta no localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // função que deleta a tarefa do localStorage
    function deleteTask(textTask){
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Remove a tarefa pelo texto
        tasks = tasks.filter(task => task.text !== textTask);

        // Atualiza o localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
