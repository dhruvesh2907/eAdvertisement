import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const ViewMyScreens = () => {
    const [screens, setScreens] = useState([]);
    const [modalImage, setModalImage] = useState(null);
    const [show, setShow] = useState(false);

    const getAllMyScreens = async () => {
        try {
            const res = await axios.get("/hording/getHordingsbyuserid/" + localStorage.getItem("id"));
            console.log(res.data);
            setScreens(res.data.data || []);
        } catch (error) {
            console.error("Error fetching screens:", error);
        }
    };

    useEffect(() => {
        getAllMyScreens();
    }, []);

    const handleImageClick = (imageURL) => {
        setModalImage(imageURL);
        setShow(true);
    };

    return (
        <div className="container-fluid bg-dark text-white min-vh-100 d-flex flex-column align-items-center">
            <h2 className="text-primary my-4">My Screens</h2>

            <div className="card bg-dark border-light shadow-lg w-75 p-3">
                <div className="table-responsive" style={{ maxHeight: "65vh", overflowY: "auto" }}>
                    <table className="table table-dark table-striped text-center">
                        <thead className="sticky-top bg-secondary">
                            <tr>
                                <th style={{ width: "40%" }}>Hoarding Dimension</th>
                                <th style={{ width: "30%" }}>Image</th>
                                <th style={{ width: "30%" }}>Actions</th> {/* Added Actions column */}
                            </tr>
                        </thead>
                        <tbody>
                            {screens.length > 0 ? (
                                screens.map((sc, index) => (
                                    <tr key={index}>
                                        <td className="align-middle">{sc.hoardingDimension || "N/A"}</td>
                                        <td>
                                            {sc.hordingURL ? (
                                                <img
                                                    src={sc.hordingURL}
                                                    alt="Hoarding"
                                                    className="rounded border img-thumbnail"
                                                    style={{ height: "100px", width: "100px", objectFit: "cover", cursor: "pointer" }}
                                                    onClick={() => handleImageClick(sc.hordingURL)}
                                                    onError={(e) => (e.target.src = "https://via.placeholder.com/100?text=No+Image")}
                                                />
                                            ) : (
                                                <span className="text-danger">No Image</span>
                                            )}
                                        </td>
                                        <td>
                                            {/* Update Button */}
                                            <Link to={`/agency/updateScreen/${sc._id}`} className="btn btn-info">
                                                UPDATE
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center text-warning">No screens found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Enlarged Image */}
            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Body className="bg-dark text-white text-center">
                    {modalImage ? (
                        <img
                            src={modalImage}
                            alt="Enlarged View"
                            className="img-fluid rounded border"
                            style={{ maxHeight: "80vh", maxWidth: "100%" }}
                        />
                    ) : (
                        <p>No Image Available</p>
                    )}
                </Modal.Body>
                <Modal.Footer className="bg-dark border-0">
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
