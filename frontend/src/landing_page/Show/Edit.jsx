import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Edit() {
  const { id } = useParams();
  const location = useLocation();
  const listing = location.state.listing;

  const [value, setValue] = useState({
    title: listing.title,
    description: listing.description,
    image: listing?.image?.url || "",
    country: listing.country,
    location: listing.location,
    price: listing.price,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <div className="container">
      <form method="POST" action={`http://localhost:5001/listing/${listing._id}?_method=PUT`}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="title">Title</label>
            <input name="title" type="text" className="form-control" id="title" value={value.title} onChange={handleChange} required/>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input name="description" type="text" className="form-control" id="description" value={value.description} onChange={handleChange} required/>
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input name="image" type="text" className="form-control" id="image" value={value.image} onChange={handleChange} required/>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="country">Country</label>
            <input name="country" type="text" className="form-control" id="country" value={value.country} onChange={handleChange} required/>
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="location">Location</label>
            <input name="location" type="text" className="form-control" id="location" value={value.location} onChange={handleChange} required/>
          </div>

          <div className="form-group col-md-2">
            <label htmlFor="price">Price</label>
            <input name="price" type="number" className="form-control" id="price" value={value.price} onChange={handleChange} required/>
          </div>
        </div>

        <br />
        <button type="submit" className="btn btn-primary">Make changes</button>
      </form>
    </div>
  );
}
