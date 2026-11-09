import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function New() {
    const navigate = useNavigate();
    let [value, setValue] = useState({
        title: "",
        description: "",
        image: "",
        country: "",
        location: "",
        price: "",
    });
    let [id, setId] = useState("");
    function handleChange(e) {
        let { name, value } = e.target;
        setValue((prevData) => {
            return { ...prevData, [name]: value }
        })
    }
    useEffect(() => {
        axios.get("http://localhost:5001/isloggedin", { withCredentials: true })
            .then(res => {
                console.log(res.data);
                if (!res.data.loggedIn) {
                    navigate("/login");
                } else {
                    setId(res.data.user._id);
                }
            });
    }, [navigate])
    return (
        <div className="container">
            <form method="POST" action={`http://localhost:5001/listings/new`} novalidate className="needs-validation">
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label htmlFor="title">Title</label>
                        <input name="title" type="text" class="form-control" id="title" onChange={handleChange} required/>
                        <div class="valid-feedback">
      Looks good!
    </div>
                    </div>
                </div>
                <div class="form-group">
                    <label htmlFor="description">Description</label>
                    <input name="description" type="text" class="form-control" id="description" onChange={handleChange} required />
                </div>
                <div class="form-group">
                    <label htmlFor="image">Image</label>
                    <input name="image" type="text" class="form-control" id="image" onChange={handleChange} required/>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label htmlFor="country">Country</label>
                        <input name="country" type="text" class="form-control" id="conutry" onChange={handleChange} required/>
                    </div>

                    <div class="form-group col-md-6">
                        <label htmlFor="location">Location</label>
                        <input name="location" type="text" class="form-control" id="location" onChange={handleChange} required/>
                    </div>

                    <div class="form-group col-md-2">
                        <label htmlFor="price">Price</label>
                        <input name="price" type="number" class="form-control" id="price" onChange={handleChange} required/>
                    </div>
                </div>
                <br></br>
                <input type="hidden" name="owner" value={id} />
                <button type="submit" class="btn btn-primary">Add Listing</button>
            </form>
        </div>
    )
}