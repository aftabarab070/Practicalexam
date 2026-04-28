import { useState, useEffect } from "react"
import Http from "../Http"
import { Link } from "react-router-dom";

export default function Home() {
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        fetchAllUser();
    },[],);

    const fetchAllUser = () => {
        Http.get('/users').then(res=>{
            setUsers(res.data);
        })
    }

    const deleteUser = (id) => {
        Http.delete('/users/'+id).then(res=>{
            fetchAllUser();
        })
    }
  return (
    <div>
      <table className="table">
        <thead>	
            <tr>
                <th>Sr No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user,index)=>(
                <tr key={user.id}>
                    <td>{++index}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <Link className="btn btn-warning" to={{pathname:"/edit/"+user.id}}>Edit</Link>&nbsp;
                        <button onClick={()=>{deleteUser(user.id)}} className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
