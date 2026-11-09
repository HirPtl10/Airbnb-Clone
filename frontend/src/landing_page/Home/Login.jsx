import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    let location = useLocation();
    const navigate = useNavigate();
    console.dir(navigate);
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const error = params.get('error');
        if (error) {
            toast.error(error);
            navigate({
                pathname: location.pathname,
                search: ""
            }, { replace: true });
        }
    }, [location, navigate]);
    let [value, setValue] = useState({
        username: "",
        password: ""
    })
    function handleChange(e) {
        let { name, value } = e.target;
        setValue((prevValue) => {
            return { ...prevValue, [name]: value };
        })
    }
    return (
        <div className="container  justify-content-center align-items-center">
            <form method="POST" action={`http://localhost:5001/login`}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Username</label>
                    <input value={value.username} name="username" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input value={value.password} name="password" type="password" class="form-control" id="exampleInputPassword1" onChange={handleChange} />
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <ToastContainer />

        </div>
    )
}