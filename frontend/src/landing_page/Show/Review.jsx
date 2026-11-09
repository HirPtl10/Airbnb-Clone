import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Review() {
    let { id } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:5001/listing/${id}/getreview`);
                setReviews(response.data);
            } catch (err) {
                console.error("Failed to fetch reviews:", err);
            }
        }
        fetchData();
    }, [id]);

    return (
        <div className="container my-4">
            <h3 className="text-center mb-4">Reviews</h3>

            <form method="POST" action={`http://localhost:5001/listing/${id}/review`} className="mb-5">
                <div className="mb-3">
                    <label htmlFor="comment" className="form-label" style={{ fontSize: "20px" }}>Enter Review</label>
                    <textarea name="comment" id="comment" className="form-control" rows="4" style={{ width: "100%" }} required></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="customRange2" className="form-label" style={{ fontSize: "20px" }}>Rating</label>
                    <input type="range" className="form-range" min="0" max="5" id="customRange2" name="rating" />
                </div>

                <button className="btn btn-primary" type="submit">Submit Rating</button>
            </form>

            <hr />

            <div className="row justify-content-center">
                {reviews.length === 0 && (
                    <p className="text-muted text-center">No reviews yet.</p>
                )}
                {reviews.map((review) => (
                    <div key={review._id} className="col-md-6 col-sm-10 mb-3">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Random User <small className="text-muted">({review.rating}/5)</small></h5>
                                <p className="card-text">{review.comment}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
