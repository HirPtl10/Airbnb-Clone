import React from "react";

export default function Listing({listing}) {
    let linkToInfo = `http://localhost:5173/listing/${listing._id}`
    return (
        <a href={linkToInfo} style={{ textDecoration: "none" }}>
              <div className="card h-100 d-flex flex-column border-0">
                <img
                  src={listing?.image?.url}
                  className="card-img-top"
                  alt={listing.title}
                  style={{
                    height: "200px",
                    borderRadius: "20px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body">
                  <h6
                    className="card-title"
                    style={{ fontSize: "14px", fontWeight: "600" }}
                  >
                    {listing.title}
                  </h6>
                  <p className="card-text">
                    {listing.price?.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}{" "}
                    for 2 nights
                  </p>
                </div>
              </div>
            </a>
    )
}