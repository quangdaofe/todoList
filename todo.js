const input = document.querySelector(".input-text");
const addTodo = document.querySelector(".button-add");
const listTodo = document.querySelector(".list");
let listArray =localStorage.length > 0 ? JSON.parse(localStorage.getItem("dotolist")):[];
function createElement(value){
    const template = `<li class="item"> <i class="check fa-solid fa-check"></i>${value} <button
class="delete"><i
    class="delete-todo fa-regular fa-trash-can"></i></button>
</li> `;
   listTodo.insertAdjacentHTML("beforeend",template);
}
  if(listArray.length>0&&Array.isArray(listArray)){
     [...listArray].forEach(value=>{
        createElement(value);
     })
  }
input.addEventListener("keyup",(e)=>{
    let value = input.value;
    if(value.trim()!=""){
          addTodo.classList.add("active");
    }else{
        addTodo.classList.remove("active");
    }
});

addTodo.addEventListener("click",()=>{
    let value = input.value;
    createElement(value);
    listArray.push(value); 
    input.value="";
    console.log(listArray);
    localStorage&&localStorage.setItem("dotolist",JSON.stringify(listArray));
});
listTodo.addEventListener("click",(e)=>{
    if(e.target.matches(".delete-todo")){
        let elementPar = e.target.parentNode.parentNode.parentNode;
        let deleteElm = e.target.parentNode.parentNode;  
        const arr=  [...listArray].filter(value=>value!=deleteElm.innerText); 
        elementPar.removeChild(deleteElm); 
        localStorage.setItem("dotolist",JSON.stringify(arr));  
        listArray    = JSON.parse(localStorage.getItem("dotolist"))
    }  
})