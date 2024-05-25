window.addEventListener("DOMContentLoaded", () => {
    const inputText = document.querySelector(".todoTask-text");
    const todoTime = document.querySelector("#time");
    const todoAdd = document.querySelector(".add");
    const todoList = document.querySelector(".todo-list");
    console.log(todoList.children);
    let listTodo = localStorage != null && localStorage.length > 0 ? JSON.parse(localStorage.getItem("todolist")) : [];
    function createElement(value, time) {
        const template = ` 
    <div class="todo-item">
        <span class="todo-time">${time}</span>
        <textarea name="" id="item" cols="30" rows="1" >${value}</textarea>
        <i class="delete-item fa-solid fa-delete-left"></i>
    </div>`;
        todoList.insertAdjacentHTML("beforeend", template);
    }

    if (listTodo.length > 0) {
        [...listTodo].forEach(value => {
            const tmp = value.split(",");
            createElement(tmp[0], tmp[1]);
            
        });
    }
    
    inputText.addEventListener("keyup", (e) => {
        let value = inputText.value;
        if(e.code==="Enter"){
            addItem();
        }
        if (value.trim() != "") {
            todoAdd.classList.add("add-active")
        } else {
            todoAdd.classList.remove("add-active")
        }
       
    });
    function addItem() {
        todoAdd.classList.remove("add-active");
        let valueText = inputText.value;
        let valueTime = (todoTime.value);
        createElement(valueText, valueTime)
        listTodo.push(`${valueText},${valueTime}`);
        inputText.value = "";
        localStorage.setItem("todolist", JSON.stringify(listTodo));
    }
    todoAdd.addEventListener("click", addItem)
    const editTexTodo = document.querySelectorAll(".edit-text");
    const deleteTask = document.querySelectorAll(".delete-item");
    function todoDelete(e) {
        if(e.target.matches(".delete-item")){
        let parentElement = e.target.parentNode.parentNode;
        console.log(parentElement);
        let childElement = e.target.parentNode;
        console.log(childElement.children);
        let time = childElement.children[0];
        let item = childElement.children[1];
        console.log(time,item);
        let check = `${item.value},${time.innerText}`;
        parentElement.removeChild(childElement);
        const newListTodo = listTodo.filter(value => {
            return value != check;
        });
        
        localStorage.setItem("todolist",JSON.stringify(newListTodo));
        listTodo = [...newListTodo];
        console.log(listTodo);
    }
    }
    todoList.addEventListener("click",todoDelete);
})