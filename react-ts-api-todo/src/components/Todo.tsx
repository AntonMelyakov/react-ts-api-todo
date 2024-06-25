import React, { useState } from 'react'

interface Todo {
    name: string,
    done: boolean,
    id: number
}

export default function Todo() {
    const [todoList, setTodoList] = useState<Todo[]>([]);

    //inputs
    const [todoName, setTodoName] = useState<string>('');
    const [editedName, setEditedName] = useState<string>('')
    const [selectedId, setSelectedId] = useState<number | null>(null)

    function newId() :number {
        if(todoList.length == 0) {
            return 0;
        }else{
            let lastNumberid:number = todoList[todoList.length - 1].id;
            return lastNumberid + 1;     
        }
    }

    function addTask(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        
        let newTodo: Todo = {
            name: todoName,
            done: false,
            id: newId()
        }

        setTodoList([...todoList, newTodo])
        setTodoName('')
    }

    function deleteTask(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) {
        setTodoList(todoList.filter((todo) => todo.id !== id))
    }

    function doneTask(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) {
       let newTodo =  todoList.map((todo) => {
            if(todo.id == id) {
                todo.done = true;
            }

            return todo
        })

         setTodoList(newTodo);
         console.log(todoList);
    }

    function editTask(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number, name: string) {
        setSelectedId(id);
        setEditedName(name)
    }

    function changeTaskName(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {

        e.preventDefault();
        let newList = todoList.map((todo) => {
            if(todo.id == selectedId) {
                todo.name = editedName
            }

            return todo;
        })

        setTodoList(newList)
        setSelectedId(null)
        setEditedName("")

    }



    return (
        <div>

           <h1>Your Todo:</h1> 
           <form>
            <input type='text' name='todoName' value={todoName} onChange={(e) => setTodoName(e.target.value)} />
            <button onClick={(e) => addTask(e)}>Set your task</button>
           </form>

           {todoList.length > 0 && (
            <ul>
                {todoList.map((todoItem) => <li key={todoItem.id}>{todoItem.name} 
                        <button onClick={(e) => doneTask(e, todoItem.id)}>Done</button> 
                        <button onClick ={(e) => editTask(e, todoItem.id, todoItem.name)}>Edit Task</button>
                        <button onClick={(e) => deleteTask(e, todoItem.id)}>Delete</button>
                    </li>)}
            </ul>
           )}

           {selectedId !== null && (
            <form>
                 <input type='text' name='editName' value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                 <button onClick={(e) => changeTaskName(e)}>Change</button>
            </form>
           
           )}
            
        </div>
    )
}