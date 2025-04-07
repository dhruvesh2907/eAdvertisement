import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {loadStripe} from "@stripe/stripe-js"

export const GetAllScreens = () => {
    const [screens, setScreens] = useState([]);
    const [modalImage, setModalImage] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        getAllScreens();
    }, []);

    const getAllScreens = async () => {
        try {
            const res = await axios.get("/hording/all");
            setScreens(res.data.data || []);
        } catch (error) {
            console.error("Error fetching screens:", error);
        }
    };
    console.log("SCREEN OBJECT:", screens);
    const makePayment = async (hoardingDimension, hourlyRate, hoardingId) => {
        try {
            const stripe = await loadStripe("pk_test_51R9eMUGggoLgE1WDAvxMdxB8VgI9ruzbalOhjhrpXCIHb9FYYfXpvjLpryO09XXnsKgFyMCVpJbZGJk0PpoD0LSj00SqcIqDY5");
    
            const res = await axios.post("api/stripe/create-checkout-session", { // ✅ Corrected API URL
                hoardingDimension,
                hourlyRate,
                hoardingId,
            });
            console.log("hordingId"+ hoardingId)
            const session = res.data;
    
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });
    
            if (result.error) {
                console.error(result.error);
            }
        } catch (error) {
            console.error("Error creating checkout session:", error);
        }
    };
    
    
    

    const handleImageClick = (imageURL) => {
        setModalImage(imageURL);
        setShow(true);
    };

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                background: "linear-gradient(135deg, #0f0f0f, #1a1a2e)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "auto",
            }}
        >
            <div
                style={{
                    width: "95%",
                    height: "90vh",
                    background: "rgba(0, 0, 0, 0.8)",
                    backdropFilter: "blur(10px)",
                    padding: "20px",
                    borderRadius: "12px",
                    color: "white",
                    boxShadow: "0px 4px 12px rgba(255, 255, 255, 0.2)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <h2
                    style={{
                        marginBottom: "20px",
                        background: "linear-gradient(to right, #00c6ff, #0072ff)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: "bold",
                        textAlign: "center",
                    }}
                >
                   Available Billboard
                </h2>

                <div style={{ width: "100%", height: "100%", overflowY: "auto", borderRadius: "10px" }}>
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            borderRadius: "12px",
                            overflow: "hidden",
                            textAlign: "center",
                        }}
                    >
                        <thead style={{ background: "linear-gradient(135deg, #7b2cbf, #c77dff)", color: "white" }}>
                            <tr>
                                <th style={thStyle}>Hoarding Dimension</th>
                                <th style={thStyle}>Image</th>
                                <th style={thStyle}>Hourly Rate</th>
                                <th style={thStyle}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {screens.length > 0 ? (
                                screens.map((sc, index) => (
                                    <tr key={index} style={{ background: index % 2 === 0 ? "#282c34" : "#1e1e1e", color: "white" }}>
                                        <td style={tdStyle}>{sc.hoardingDimension || "N/A"}</td>
                                        <td>
                                            {sc.hordingURL ? (
                                                <img
                                                    src={sc.hordingURL}
                                                    alt="Hoarding"
                                                    style={imageStyle}
                                                    onClick={() => handleImageClick(sc.hordingURL)}
                                                    onError={(e) => (e.target.src = "https://via.placeholder.com/100?text=No+Image")}
                                                />
                                            ) : (
                                                <span style={{ color: "red" }}>No Image</span>
                                            )}
                                        </td>
                                        <td style={tdStyle}>{sc.hourlyRate ? `$${sc.hourlyRate}/hr` : "N/A"}</td>
                                        <td>
                                         <button 
                                            onClick={() => makePayment(sc.hoardingDimension,sc.hourlyRate,sc._id)} 
                                            style={rentButtonStyle}
                                                                                    >
                                                RENT NOW
                                            </button>

                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: "center", padding: "20px", color: "yellow" }}>No screens found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Enlarged Image */}
            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Body style={{ background: "black", color: "white", textAlign: "center" }}>
                    {modalImage ? (
                        <img src={modalImage} alt="Enlarged View" style={{ maxHeight: "80vh", maxWidth: "100%", borderRadius: "8px" }} />
                    ) : (
                        <p>No Image Available</p>
                    )}
                </Modal.Body>
                <Modal.Footer style={{ background: "black", border: "none" }}>
                    <Button variant="secondary" onClick={() => setShow(false)} style={modalButtonStyle}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

// ** Styles **
const thStyle = {
    padding: "14px",
    fontWeight: "bold",
    textAlign: "center",
};

const tdStyle = {
    padding: "12px",
    textAlign: "center",
};

const imageStyle = {
    height: "100px",
    width: "100px",
    objectFit: "cover",
    cursor: "pointer",
    borderRadius: "6px",
    border: "2px solid white",
};

const rentButtonStyle = {
    display: "inline-block",
    padding: "10px 18px",
    borderRadius: "6px",
    textDecoration: "none",
    background: "linear-gradient(135deg, #00c6ff, #0072ff)",
    color: "white",
    fontWeight: "bold",
    transition: "0.3s",
    textAlign: "center",
};

const modalButtonStyle = {
    background: "linear-gradient(135deg, #7b2cbf, #c77dff)",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "6px",
};

export default GetAllScreens;