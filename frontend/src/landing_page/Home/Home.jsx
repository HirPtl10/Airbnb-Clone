import React, { useState, useEffect } from "react";
import axios from 'axios';
import Listing from "./Listing";
import {toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Universal/Navbar";

export default function Home() {
  let location = useLocation();
  let navigate = useNavigate();
  let [listings, setListings] = useState([]);
  let [searchValue, setSearchvalue] = useState("");
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    let params = new URLSearchParams(location.search);
    let success = params.get('success');
    if(success) {
      toast.success(success);

      navigate({
        pathname: location.pathname,
        search: ""
      }, {replace: true})
    }
  }, [location, navigate])
  useEffect(() => {
    axios.get("http://localhost:5001/listings")
      .then((response) => {
        setListings(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

  }, [])
   
    const filteredListing = listings.filter(listing => listing.title.toLowerCase().includes(searchValue.toLowerCase()) || listing.description.toLowerCase().includes(searchValue.toLowerCase()) || listing.country.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <>
    <Navbar searchValue={searchValue} setSearchValue={setSearchvalue}/>
    <div className="container-fluid ps-5 pe-5">
      <div className="row g-sm-3">
        {filteredListing.map((listing) => (
          <div key={listing._id} className="col-sm-12 col-md-4 col-lg-2 g-2.5" >
            <Listing listing={listing} key={listing._id} />
          </div>
        ))}
        {
          !loading && filteredListing.length == 0 && 
          <h1>No listing found</h1>
        }
            <ToastContainer />
        </div>
    </div>
    </>
  );
}
