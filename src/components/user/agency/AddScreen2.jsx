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
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-dark overflow-x-hidden">
            <div className="row w-100 d-flex justify-content-center">
                <div className="col-md-8 col-lg-7 col-xl-6 w-75">
                    <div className="card p-4 shadow-lg rounded-3 bg-dark text-white vh-90 overflow-auto">
                        <h2 className="text-center mb-4 text-primary">Add Screen</h2>
                        <form
                            onSubmit={handleSubmit(submitHandler)}
                            encType="multipart/form-data"
                            className="overflow-y-auto"
                            style={{ maxHeight: "80vh" }} // Ensures only vertical scroll
                        >
                            <div className="mb-3">
                                <label className="form-label text-primary">Hoarding Dimension</label>
                                <input type="text" className="form-control bg-secondary text-white border-light" {...register("hoardingDimension")} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-primary">Hoarding Type</label>
                                <select className="form-select bg-secondary text-white border-light" {...register("hoardingType")}>
                                    <option value="Unipole">Unipole</option>
                                    <option value="Billboard">Billboard</option>
                                    <option value="Gantry">Gantry</option>
                                    <option value="Digital">Digital</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-primary">Hourly Rate</label>
                                <input type="number" className="form-control bg-secondary text-white border-light" {...register("hourlyRate")} />
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label text-primary">Latitude</label>
                                    <input type="text" className="form-control bg-secondary text-white border-light" {...register("latitude")} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label text-primary">Longitude</label>
                                    <input type="text" className="form-control bg-secondary text-white border-light" {...register("longitude")} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-primary">Select State</label>
                                <select className="form-select bg-secondary text-white border-light" {...register("stateId")} onChange={(event) => getCityByStateId(event.target.value)}>
                                    <option>SELECT STATE</option>
                                    {states?.map((state) => (
                                        <option key={state._id} value={state._id}>
                                            {state.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-primary">Select City</label>
                                <select className="form-select bg-secondary text-white border-light" {...register("cityId")} onChange={(event) => getAreaByCityId(event.target.value)}>
                                    <option>SELECT CITY</option>
                                    {cities?.map((city) => (
                                        <option key={city._id} value={city._id}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-primary">Select Area</label>
                                <select className="form-select bg-secondary text-white border-light" {...register("areaId")}>
                                    <option>SELECT AREA</option>
                                    {areas?.map((area) => (
                                        <option key={area._id} value={area._id}>
                                            {area.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-primary">Select Hoarding Image</label>
                                <input type="file" className="form-control bg-secondary text-white border-light" {...register("image")} />
                            </div>
                            <button type="submit" className="btn btn-dark text-white w-100">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
