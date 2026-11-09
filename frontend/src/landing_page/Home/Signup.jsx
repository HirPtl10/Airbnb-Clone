import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Signup() {
  let location = useLocation();
  let navigate = useNavigate();
    let [value, setValue]  = useState({
        email: "",
        password: "",
        username: "",
    })
    function handleChange(e) {
        let {name, value} = e.target;
        setValue((prevValue) => {
            return {...prevValue, [name]: value};
        })
    }
    useEffect(() => {
      let params = new URLSearchParams(location.search);
      let error = params.get('error')
      if(error) {
        toast.error(error);

        navigate({
          pathname: location.pathname,
          search: "",
        }, {replace: true})
      }
    }, [location])
    return (
        <div className="container  justify-content-center align-items-center">
      <form method="POST" action={`http://localhost:5001/signup`}>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input value={value.email} name="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange}/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
    <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Username</label>
    <input value={value.username} name="username" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input value={value.password} name="password" type="password" class="form-control" id="exampleInputPassword1" onChange={handleChange}/>
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>
<  ToastContainer />
</div>
    )
}