import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './Components/Navbar.jsx'
import { FaEdit, FaPlus, FaRecycle, FaTrash } from 'react-icons/fa'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  const handleAdd = () => {
    if (!todo.trim()) return;
    const newTodo = {
      text: todo,
      isCompleted: false
    }

    setTodos(prev => [...prev, newTodo])
    setTodo("")
  }

  const handleEdit = (index) => {
    setTodo(todos[index].text)
    handleDelete(index)
  }

  const handleDelete = (delIndex) => {
    setTodos(prev => prev.filter((_, index) => index !== delIndex))
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleToggle = (toggleIndex) => {
    setTodos(prev => prev.map((item, index) => {
      if (index === toggleIndex) {
        return { ...item, isCompleted: !item.isCompleted }
      }
      return item
    }))
  }

  const handleClearAll = () => {
    setTodos([])
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto my-7 p-5 bg-[#DED6EB] w-[60vw] min-h-[80vh] rounded-2xl">
        <div className="add">
          <span className='text-2xl font-bold border-b-4 border-purple-600 rounded'>Add your TODO</span>
          <div className="flex py-10 gap-2">
            <input type="text" value={todo} onChange={handleChange} placeholder='New TODO' className='outline-none border-b-4 border-purple-500 w-[60vw]' />
            <button onClick={handleAdd} className='flex items-center justify-center bg-purple-600 w-[60px] h-[30px] rounded-md cursor-pointer text-white transform transition-transform hover:scale-[1.1]'><FaPlus /></button>
          </div>
        </div>
        <div className="todos">
          <div className="flex justify-between">
            <span className='text-2xl font-bold border-b-4 border-purple-600 rounded'>Your TODOs</span>
            <button onClick={handleClearAll} className={`deleteall bg-purple-600 w-[80px] h-[30px] rounded-md cursor-pointer text-white transform transition-transform hover:scale-[1.1] ${todos.length === 0 ? "hidden" : ""}`}>Clear All</button>
          </div>
          {todos.map((item, index) => {
            return (
              <div key={index} className="todo flex justify-between pt-5">
                <div className="check flex justify-center items-center">
                  <input className='accent-purple-600 w-5 h-5 align-middle' type="checkbox" name={`box${index + 1}`} id={`box${index + 1}`} checked={item.isCompleted} onChange={() => handleToggle(index)} />
                  <span className={`text mx-3 ${item.isCompleted ? "opacity-50 line-through" : ""}`}>{item.text}</span>
                </div>
                <div className="btns flex gap-2">
                  <button onClick={() => handleEdit(index)} className="flex items-center justify-center edit bg-purple-600 w-[40px] h-[30px] rounded-md cursor-pointer text-white transform transition-transform hover:scale-[1.1]"><FaEdit /></button>
                  <button onClick={() => handleDelete(index)} className="flex items-center justify-center delete bg-purple-600 w-[40px] h-[30px] rounded-md cursor-pointer text-white transform transition-transform hover:scale-[1.1]"><FaTrash /></button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App
