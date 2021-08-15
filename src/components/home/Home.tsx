import React,{useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import { getUser,addUser, deleteUser } from '../../actions/userActions'
import { User, UserState } from '../../reducers/userReducer'
import { useSelector} from '../../store'
import './Home.css'


const Home = () => {

   const dispatch=useDispatch()
   const {data}=useSelector(state=>state.getUsers)
   const [user, setUser] = useState<UserState['data']>([])
   const [clicked, setClicked] = useState<boolean>(false)

   const {success}=useSelector(state=>state.addUser)
   const {success:deleteSuccess}=useSelector(state=>state.deleteUser)
   

   const [values, setValues] = useState<User>({
       id:0,
       name:'',
       role:''
   })

   const handleChange=(fieldName:keyof User)=>(e:React.ChangeEvent<HTMLInputElement>)=> {
       setValues({...values,[fieldName]:e.currentTarget.value})
   }
  
    function handleClick(){
        if(!clicked){
        dispatch(getUser())
        setClicked(true)
        }else{
            setUser([])
            setClicked(false)
        }
    }

    function addUserToStorage(data:User){
        if(values.id===0||values.name===''||values.role===''){
         window.alert('please add the fields')
         return
        }
        dispatch(addUser(data)) 
        setValues({id:0,name:'',role:''})
    }

    function deleteHandler(id:User['id']) {
        dispatch(deleteUser(id))
    }

    useEffect(()=>{
        if(data){
            setUser(data)
        }
        if(success||deleteSuccess){
            dispatch(getUser())
        }
    },[data,success,deleteSuccess])

   

  return (
    <div className='home'>
        <div className='btn-container'>
        <button onClick={handleClick}>
        {clicked?'Click To Hide':'Click To See Users'}
         </button>
         <input type="number" value={values.id} placeholder='id' 
         onChange={handleChange("id")}/>
         <input type="text" value={values.name} placeholder='name' 
         onChange={handleChange("name")}/>
         <input type="text" value={values.role} placeholder='role'
         onChange={handleChange("role")}/>
         <button type='button' onClick={(e)=>addUserToStorage({id:values.id,name:values.name,role:values.role})}>
             ADD USER
         </button>
        </div>
      <div className='table-section'>
      {clicked && <table className='table'>
          <thead>
              <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>ROLE</th>
                  <th>EDIT</th>
                  <th>DELETE</th>
              </tr>
          </thead>
          <tbody>
              {
                  user && user.map((item)=>{
                      return <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.role}</td>
                          <td><button className='table-btn-edit'>Edit</button></td>
                          <td><button className='table-btn-delete' 
                          onClick={()=>deleteHandler(item.id)}>Delete</button></td>
                      </tr>
                  })
              }
          </tbody>
      </table>}
      </div>
    </div>
  )
}

export default Home
