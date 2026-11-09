import React, { use } from "react";
import "../../index.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Navbar({searchValue, setSearchValue}) {

    let [logged, setLogged] = useState(false);
    let [user, setUser] = useState("");
    let [search, setSearch] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:5001/isloggedin", { withCredentials: true })
            .then(res => {
                if (res.data.loggedIn) {
                    setLogged(true);
                    setUser(res.data.user.username); 
                }
            })
    }, [])

    function handleSearch() {
       setSearch(prev => !prev);
    }

    function handleSearchValue(e) {
        setSearchValue(e.target.value);
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary ps-5 pe-5 pt-3 pb-3 mb-4 border-bottom" style={{ fontSize: "19px" }}>
            <div className="container-fluid navnav">

                {/* Left: Logo */}
                <div className="">
                    <a className="navbar-brand" href="/listings">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png"
                            alt="Logo"
                            style={{ width: "5.3rem", height: "auto", maxWidth: "10vh" }}
                        />
                    </a>
                </div>

                {/* Center: Navigation Links */}
                <div className="">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item pe-3">
                            <a className="nav-link active" href="/listings">Home</a>
                        </li>
                        <li className="nav-item pe-3">
                            <a className="nav-link" href="/new">New Listing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Services</a>
                        </li>
                        <li className="nav-item pe-3">
                            <a className="nav-link" href="#" onClick={handleSearch}><i className="bi bi-search"></i></a>
                        </li>
                        {search && <li> 
                            <input className="form-control me-2" type="search" placeholder="Serch" value={searchValue} onChange={handleSearchValue}>
                            
                            </input>
                        </li>
}
                    </ul>
                </div>

                {/* Right: Login / Signup */}

                <div className="">
                    {!logged && (
                        <ul className="navbar-nav mb-2 mb-lg-0">

                            <li className="nav-item pe-3">
                                <a className="nav-link" href="">Become a Host</a>
                            </li>
                            <li className="nav-item pe-3">
                                <a className="nav-link" href="/signup">Signup</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Login</a>
                            </li>

                        </ul>
                    )}
                    {logged && (
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link">{user}</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="http://localhost:5001/logout">Logout</a>
                            </li>
                        </ul>
                    )}
                </div>


            </div>
        </nav>
    );
}
