import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
function App() {

  const [todo, settodo] = useState("")
  const [todoArr, settodoArr] = useState([])
  const [showFinished, setshowFinished] = useState(true)

useEffect(() => {
  let todos = localStorage.getItem("todos")
  if(todos){
    let loadTodos = JSON.parse(localStorage.getItem("todos"))
    settodoArr(loadTodos)
  }
  console.log(todoArr)
 
}, [])


  const saveToLocal = () => {
    localStorage.setItem("todos" , JSON.stringify(todoArr))
  }

  const finishHandle = (e)=>{
    setshowFinished(!showFinished)

  }

  const editHandle = (e,id)=>{
    let td = todoArr.filter(e=>{
      return e.id===id
    })
    settodo(td[0].todo)

    deleteHandle(e,id)
    saveToLocal()

  }

  const deleteHandle = (e,id)=>{
    let newTodos = todoArr.filter(e=>{
      return e.id!==id
    })
    settodoArr(newTodos)
    saveToLocal()

  }

  useEffect(() => {
    alert("todo added") 
  },[todo])
  
  const addHandle = () => {
    settodoArr([...todoArr, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    console.log(todoArr);
    saveToLocal()
  }
  
  const changeHandle = (e)=>{
    settodo(e.target.value)
  }
  const checkHandle = (e) => {
    let id = e.target.name
    let index = todoArr.findIndex(e=>{
      return e.id === id
    })
    let newTodos = [...todoArr]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    settodoArr(newTodos)
    saveToLocal()

  }
  

  return (
   <>
    <Navbar/>
      <div className="container bg-[#9adcec81] md:mx-auto md:my-5 md:p-5 rounded-lg md:min-h-[80vh] md:w-3/4 p-14 my-44">
       <div className='inputContainer'>
        <h2 className='text-lg font-bold text-center'>Add A Task</h2>
        <div className=' flex gap-5'>
          <input onChange={changeHandle} value={todo} className=' rounded-lg w-full py-2 text-center text-black focus:outline-none focus:ring-2 focus:border-[#5f5dbd] focus:ring-[#5f5dbd]' type="text" name="" id="" placeholder='Add something'/>
          {todo.length ? (
          <button onClick={addHandle} className='btn-all'>Save Me</button>
          ) : null}
          </div>

       </div>
        <br />
       <div className="todosContainer md:w-1/2 m-auto">
          <h2 className=' text-center font-bold text-2xl cursor-default '>My To-Dos</h2>
          <input onChange={finishHandle} type="checkbox" checked={showFinished} name="Completed Task" id="" /> Show Finished
          {todoArr.length===0&& <div className=' text-lg font-bold text-center'>.........WHAT A BORING DAY NO TO-DOS</div>}
          {todoArr.map((items)=>{
          return (showFinished || !items.isCompleted)&& <div key={items.id} className="todoList flex justify-between my-7">
            <div className=' flex gap-5 justify-between w-screen'>
            <input onChange={checkHandle} type="checkbox" name={items.id} id="" />
            <p className={items.isCompleted ? "line-through uppercase text-lg  whitespace-normal break-all w-[100%] md:w-4/6" : "  text-lg whitespace-normal break-all w-[100%] md:w-4/6"}>{items.todo}</p>
            <div className="buttonsTodos flex justify-center items-center gap-2">
            <button onClick={(e)=>editHandle(e,items.id)} className='btn-all'><FaRegEdit />
            </button>
            <button onClick={(e)=>deleteHandle(e,items.id)} className='btn-all'><MdDelete />
            </button>
            </div>
            </div>
          </div>
            })}
       </div>
      </div>
    </>
  )
}

export default App
