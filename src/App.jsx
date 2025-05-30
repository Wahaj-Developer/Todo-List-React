import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



function App() {


const [todo, settodo] = useState("")
const [todos, settodos] = useState([])
const [showFinished, setshowFinished] = useState(true)


useEffect(() => {
  let todoString = localStorage.getItem("todos")
  if(todoString){
  let todos = JSON.parse(localStorage.getItem("todos")) 
  settodos(todos)
  }
}, [])



const saveToLs = () => {
  localStorage.setItem("todos", JSON.stringify(todos))
}


const togleFinished = () => {

setshowFinished(!showFinished);

}


const handleEdit = (e, id)=> {
let t = todos.filter(i=>i.id === id)

  settodo(t[0].todo)

   let newTodos = todos.filter(item=>{
      return item.id!== id;
    });
 
    settodos(newTodos)
saveToLs();

}

const handleDelete = (e,id)=> {
   

    let newTodos = todos.filter(item=>{
      return item.id!== id;
    });
 
    settodos(newTodos)
saveToLs();


}

const handleAdd = ()=> {
settodos([... todos,{id: uuidv4(), todo, isCompleted: false}])
settodo("")

saveToLs();

}

const handleChange = (e)=> {

  settodo(e.target.value)


}

 const handleCheckbox = (e) => { 
    let id = e.target.name;  
    let index = todos.findIndex(item=>{
      return item.id === id;
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)
    saveToLs();
  }




  return (
    <>

      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-center text-2xl'>iTask - Manage your todo at one place</h1>
        <div className="addTodo my-5 gap-3 flex flex-col">
          <h1 className="text-xl font-bold">Add Todo</h1>
          <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className='bg-white px-5 py-1 rounded-xl w-full ' />
          <button onClick={handleAdd} disabled={todo.length<3}  className='bg-violet-700 disabled:bg-violet-700 hover:bg-violet-400 cursor-pointer rounded-full text-white text-sm font-bold mx-2  p-2 py-1 '>save</button>
          </div>

        </div>

        <input onChange={togleFinished} type="checkbox" checked={showFinished} /> Show finished todos
        <div className="h-[1px] mt-5 bg-black"></div>
        <h1 className='text-xl my-2 font-bold'>Your Todo</h1>
        <div className="todos">
          {todos.length === 0 && <div className='text-lg m-1 '>No todos to diplay</div>}
          {todos.map(item=>{

         
          return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex my-3 justify-between ">


            <div className='flex gap-5'>

            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted}
            id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>

            <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e, item.id)} className='bg-violet-700 hover:bg-violet-400 cursor-pointer text-white text-sm font-bold rounded-md p-2  py-1 mx-1'><FaEdit /></button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-700 hover:bg-violet-400 cursor-pointer text-white text-sm font-bold rounded-md p-2  py-1 mx-1'><MdDelete /></button>
            </div>
          </div>
           })}
        </div>



      </div>









    </>
  )
}

export default App
