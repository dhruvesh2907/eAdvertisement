import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/mybookings")
            .then(res => setBookings(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div style={{ padding: "2rem", backgroundColor: "#121212", minHeight: "100vh", color: "white" }}>
            <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>📒 My Bookings</h2>
            
            {bookings.length === 0 ? (
                <p style={{ textAlign: "center" }}>You have no bookings yet.</p>
            ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", justifyContent: "center" }}>
                    {bookings.map((b, i) => (
                        <div 
                            key={i} 
                            style={{
                                backgroundColor: "#1e1e1e",
                                borderRadius: "12px",
                                padding: "1.5rem",
                                width: "280px",
                                boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)"
                            }}
                        >
                            <h3 style={{ margin: "0 0 0.5rem 0" }}>{b.hoardingDimension}</h3>
                            <p>💰 Rate: ${b.hourlyRate}/hr</p>
                            <p>🗓 Date: {new Date(b.date).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;
