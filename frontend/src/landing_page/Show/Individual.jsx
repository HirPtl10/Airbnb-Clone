import React from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import Edit from "./Edit";
import Review from "./Review";
import { config, Map } from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import New from "./New";

export default function Individual() {
    let [user, setUser] = useState({});
    let {id}  = useParams();
    const [listing, setListing] = useState({});
    const [error, setError] = useState({
      isError: false,
      errMsg: "",
    });
    useEffect(() => {
        let fetchData = async () => {
                await axios.get(`http://localhost:5001/listings/${id}`)
                .then((response) => { 
                    setListing(response.data);
                    setError({
                      isError: false,
                      errMsg: "",
                    });
                })
                .catch((err) => {
                  console.log(err);
                  setError({
                    isError: true,
                    errMsg: err.response.data.msg,
                  });
                })
        }
        axios.get("http://localhost:5001/isloggedin", { withCredentials: true })
        .then(res => {
            if (res.data.loggedIn) {
                    setUser(res.data.user);
                }
        })
        fetchData();
    }, [])
  const navigate = useNavigate();

 const handleEditClick = () => {
    navigate(`/listing/${listing._id}/edit`, { state: { listing } });
  };

useEffect(() => {
    if (!listing.location) return;
  if (!listing.location) return;

  const fetchCoordinates = async () => {
    try {
      const res = await fetch(
        `https://api.maptiler.com/geocoding/${encodeURIComponent(
          listing.location
        )}.json?key=YT9CXcLb4FnRfnaGOBzd`
      );
      const data = await res.json();

      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        console.log("Coordinates:", lat, lng);

        // Now create the map
        config.apiKey = "YT9CXcLb4FnRfnaGOBzd";
        const map = new Map({
          container: "map-container",
          style: maptilersdk.MapStyle.STREETS,
          zoom: 8,
          center: [lng, lat],
          controls: [],
        });

        // Add marker
        new maptilersdk.Marker().setLngLat([lng, lat]).addTo(map);
      }
    } catch (err) {
      console.error("Geocoding failed:", err);
    }
  };

  fetchCoordinates();
}, [listing.location]);

    return ( error.isError ? (
      <div>
        <div className="container">
          <h1>{error.errMsg}</h1>
        </div>
      </div>
    ) : (
     
        <div className="container">
            <div className="row">
        <h2 className="pb-3 pt-2 col-12 ps-3">{listing.title}</h2>
        <img src={listing?.image?.url}  alt="..." className="col-lg-12 col-md-6 col-sm-1 pb-3 ps-3" style={{width: "90%", height: "50vh", objectFit: "cover", borderRadius: "50px"}}/>
        <div className="info-container col-12 pb-3">
        <h4 className="pb-2" style={{fontWeight: "450"}}>{listing.description}</h4>
        <h5 className="text-start fw-normal">{listing.location} &middot; {listing.country} &middot; {listing.price?.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })} &middot; By <u>{listing.owner?.username} </u></h5>
        </div>
        {user._id == listing.owner?._id && (
            <>
        <div className="buttons pb-3 text-center" style={{display: "inline-flex", justifyContent: "center"}}>
        <button className="btn btn-primary" onClick={handleEditClick} >Edit Listing</button> 
        &nbsp;&nbsp;&nbsp;&nbsp;
        <form method="POST" action={`http://localhost:5001/listing/${listing._id}/delete?_method=DELETE`}>
        <button className="btn btn-danger">Delete Listing</button>
        </form>
        </div>
        <hr style={{width: "90%"}}></hr>
        <br></br>
        </>
        )}
        
      <div id="map-container" style={{ height: "300px", borderRadius: "20px" }} />

        < Review/>
        </div>
        </div>
    )
)
}