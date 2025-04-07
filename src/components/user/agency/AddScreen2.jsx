import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const AddScreen2 = () => {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);

    useEffect(() => {
        getAllStates();
    }, []);

    const getAllStates = async () => {
        const res = await axios.get("/state/getallstates");
        setStates(res.data.data);
    };

    const getCityByStateId = async (id) => {
        const res = await axios.get("/city/getcitybystate/" + id);
        setCities(res.data.data);
    };

    const getAreaByCityId = async (id) => {
        const res = await axios.get("/area/getareabycity/" + id);
        setAreas(res.data.data);
    };

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const submitHandler = async (data) => {
        data.userId = localStorage.getItem("id");

        const formData = new FormData();
        formData.append("hoardingDimension", data.hoardingDimension);
        formData.append("hoardingType", data.hoardingType);
        formData.append("hourlyRate", data.hourlyRate);
        formData.append("latitude", data.latitude);
        formData.append("longitude", data.longitude);
        formData.append("stateId", data.stateId);
        formData.append("cityId", data.cityId);
        formData.append("areaId", data.areaId);
        formData.append("image", data.image[0]);
        formData.append("userId", data.userId);

        await axios.post("/hording/addWithFile", formData);
        navigate("/agency/myscreens");
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                maxHeight: "100vh",
                overflowY: "auto",
                background: "linear-gradient(135deg, #0f0f0f, #1a1a2e)",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div style={{ 
                width: "100%",
                maxWidth: "800px",
                margin: "20px 0"
            }}>
                <div
                    style={{
                        background: "rgba(0, 0, 0, 0.7)",
                        backdropFilter: "blur(10px)",
                        padding: "30px",
                        borderRadius: "16px",
                        color: "white",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                        border: "1px solid rgba(255, 255, 255, 0.1)"
                    }}
                >
                    <h2
                        style={{
                            textAlign: "center",
                            marginBottom: "30px",
                            background: "linear-gradient(to right, #00c6ff, #0072ff)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontWeight: "bold",
                            fontSize: "2rem",
                            letterSpacing: "1px"
                        }}
                    >
                        Add Your Hoarding
                    </h2>
                    <form 
                        onSubmit={handleSubmit(submitHandler)} 
                        encType="multipart/form-data" 
                        style={{ 
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: "20px"
                        }}
                    >
                        <div style={{ gridColumn: "span 2" }}>
                            <label style={labelStyle}>Hoarding Dimension</label>
                            <input 
                                type="text" 
                                {...register("hoardingDimension")} 
                                style={inputStyle} 
                                placeholder="e.g., 10ft x 20ft"
                            />
                        </div>
                        
                        <div style={{ gridColumn: "span 2" }}>
                            <label style={labelStyle}>Hoarding Type</label>
                            <select {...register("hoardingType")} style={inputStyle}>
                                <option value="">Select Type</option>
                                <option value="Unipole">Unipole</option>
                                <option value="Billboard">Billboard</option>
                                <option value="Gantry">Gantry</option>
                                <option value="Digital">Digital</option>
                            </select>
                        </div>
                        
                        <div style={{ gridColumn: "span 2" }}>
                            <label style={labelStyle}>Hourly Rate</label>
                            <input 
                                type="number" 
                                {...register("hourlyRate")} 
                                style={inputStyle} 
                                placeholder="Enter rate per hour"
                            />
                        </div>
                        
                        <div>
                            <label style={labelStyle}>Latitude</label>
                            <input 
                                type="text" 
                                {...register("latitude")} 
                                style={inputStyle} 
                                placeholder="e.g., 40.7128"
                            />
                        </div>
                        
                        <div>
                            <label style={labelStyle}>Longitude</label>
                            <input 
                                type="text" 
                                {...register("longitude")} 
                                style={inputStyle} 
                                placeholder="e.g., -74.0060"
                            />
                        </div>
                        
                        <div>
                            <label style={labelStyle}>State</label>
                            <select 
                                {...register("stateId")} 
                                onChange={(e) => getCityByStateId(e.target.value)} 
                                style={inputStyle}
                            >
                                <option value="">Select State</option>
                                {states.map((state) => (
                                    <option key={state._id} value={state._id}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label style={labelStyle}>City</label>
                            <select 
                                {...register("cityId")} 
                                onChange={(e) => getAreaByCityId(e.target.value)} 
                                style={inputStyle}
                                disabled={!cities.length}
                            >
                                <option value="">Select City</option>
                                {cities.map((city) => (
                                    <option key={city._id} value={city._id}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label style={labelStyle}>Area</label>
                            <select 
                                {...register("areaId")} 
                                style={inputStyle}
                                disabled={!areas.length}
                            >
                                <option value="">Select Area</option>
                                {areas.map((area) => (
                                    <option key={area._id} value={area._id}>
                                        {area.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div style={{ gridColumn: "span 2" }}>
                            <label style={labelStyle}>Hoarding Image</label>
                            <input 
                                type="file" 
                                {...register("image")} 
                                style={{
                                    ...inputStyle,
                                    padding: "8px",
                                    background: "transparent",
                                    border: "1px solid rgba(255, 255, 255, 0.2)"
                                }} 
                                accept="image/*"
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            style={{
                                ...buttonStyle,
                                gridColumn: "span 2",
                                marginTop: "20px"
                            }}
                        >
                            Add Screen
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Styles
const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontWeight: "500",
    color: "rgba(121, 89, 89, 0.8) ",
    fontSize: "0.9rem"
};

const inputStyle = {
    width: "100%",
    padding: "12px 15px",
    background: "rgba(255, 255, 255, 0.1)",
    color: "black",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "8px",
    outline: "none",
    transition: "all 0.3s ease",
    fontSize: "0.95rem"
};

const buttonStyle = {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: "1rem",
    letterSpacing: "0.5px"
};
