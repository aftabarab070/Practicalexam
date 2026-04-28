import { useEffect, useState } from "react";
import Http from "../Http";
import {useNavigate, useParams} from 'react-router-dom';

export default function Edit() {

  const navigate = useNavigate();
  // Initialize state with empty strings to avoid "controlled vs uncontrolled" warnings
  const [inputs, setInputs] = useState({ name: '', email: '', password: '' });
  const {id} = useParams();

  useEffect(()=>{
    fetchUser();
  },[])

  const fetchUser = () =>{
    Http.get('/users/'+id+'/edit').then((res)=>{
      setInputs({
        name:res.data.name,
        email:res.data.email,
        name:res.data.name,
      });
    });
  }

  const handleChange = (event) => {
    const name = event.target.name; // This requires the 'name' attribute on the input
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };

  const submitForm = async () => {
        Http.put('/users/'+id,inputs).then((res)=>{
          navigate('/');
        })
   };

  return (
    <div>
      <h2>Edit User</h2>
      <div className="row">
        <div className="col-sm-6">
          <div className="card p-4">
            <label>Name</label>
            <input 
              type="text" 
              name="name"  // CRITICAL: Must match the state key
              value={inputs.name || ''} 
              onChange={handleChange} 
              className="form-control mb-2" 
            />

            <label>Email</label>
            <input 
              type="email" 
              name="email" // CRITICAL: Must match the state key
              value={inputs.email || ''} 
              onChange={handleChange} 
              className="form-control mb-2" 
            />


            <button type="button" onClick={submitForm} className="btn btn-primary mt-2">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}