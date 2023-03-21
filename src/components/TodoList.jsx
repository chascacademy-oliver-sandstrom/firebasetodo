import Todo from './Todo'
import React, {useState, useEffect} from "react"
import { addTodosDB, fetchFromDB, updateTodosDB, deleteTodoDB } from '../db/operation';

function TodoList() {

    const [input, setInput] = useState("");
    const [todos, setTodos] = useState([])
    const [toggle, setToggle] = useState(false)


    const handleChange = (event) => {
        setInput(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Lägger till to do, både i UI och DB
        console.log("input-value:", input)
        addTodo();
        setInput("")
    }

    const toggleCompleted = (id) => {
        toggle ? setToggle(false) : setToggle(true)

        const editedList = todos.map((item) => {
            if(id === item.id) {
                updateTodosDB(id, {...item, completed: !item.completed})
                return {...item, completed: !item.completed}
            }
            return item
        })
        setTodos(editedList)
    }

    const addTodo = () => {
        const newTodo = {
            description: input,
            completed: false
        }
        addTodosDB(newTodo)
        setTodos([...todos, newTodo])
    }

    const editTodo = (id, newDescription) => {
        const editedList = todos.map((item) => {
            if(id === item.id) {
                updateTodosDB(id, {...item, description: newDescription})
                return {...item, description: newDescription}
            }
            return item
        })
        setTodos(editedList)
    }

    const deleteTodo = (id) => {
        console.log("delete todo")
        const remainingTodos = todos.filter(item => {
            return id !== item.id
        })

        deleteTodoDB(id)
        setTodos(remainingTodos)
    }

    useEffect(() => {
        console.log("useEffect running")
        fetchFromDB().then((newTodo) => {
            setTodos(newTodo)
        })
    }, [todos.length])
    
    return (
      <div>
        <h1>ToDoList</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="">Add to do </label>
            <input type="text" onChange={handleChange} value={input}/>
            <button type="submit">Add</button>
        </form>
        <ul>
            {todos.map((item) => {
                return <Todo
                key={item.id}
                id={item.id}
                description={item.description}
                completed={item.completed}
                toggleCompleted={toggleCompleted}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
                />
            })}
        </ul>
      </div>
    )
  }

export default TodoList