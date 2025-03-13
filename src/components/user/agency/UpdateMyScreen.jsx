import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";

export const UpdateMyScreen = () => {
  const id = useParams().id;
  const navigate = useNavigate();

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
    const res = await axios.get(`/city/getcitybystate/${id}`);
    setCities(res.data.data);
  };

  const getAreaByCityId = async (id) => {
    const res = await axios.get(`/area/getareabycity/${id}`);
    setAreas(res.data.data);
  };

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const fetchHoardingData = async () => {
      try {
        const res = await axios.get(`/hording/getHordingById/${id}`);
        const data = res.data.data;
        if (data) {
          Object.keys(data).forEach((key) => setValue(key, data[key]));
        }
      } catch (error) {
        console.error("Error fetching hoarding details:", error);
      }
    };
    fetchHoardingData();
  }, [id, setValue]);

  const submitHandler = async (data) => {
    data.userId = localStorage.getItem("id");
    delete data._id;
    try {
      await axios.put(`/hording/updatehording/${id}`, data);
      navigate("/agency/myscreens");
    } catch (error) {
      console.error("Error updating hoarding:", error);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="row w-100 d-flex justify-content-center">
        <div className="col-md-8 col-lg-7 col-xl-6 w-75">
          <div className="card p-4 shadow-lg rounded-3 bg-dark text-white vh-90" style={{ maxHeight: "90vh", overflow: "hidden" }}>
            <h2 className="text-center mb-3 text-primary">Update Screen</h2>
            <div className="overflow-auto" style={{ maxHeight: "80vh", paddingRight: "5px" }}>
              <form onSubmit={handleSubmit(submitHandler)}>
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

                <div className="mb-3">
                  <label className="form-label text-primary">Hoarding URL</label>
                  <input type="text" className="form-control bg-secondary text-white border-light" {...register("hordingURL")} />
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
                  <select className="form-select bg-secondary text-white border-light" {...register("stateId")} onChange={(e) => getCityByStateId(e.target.value)}>
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
                  <select className="form-select bg-secondary text-white border-light" {...register("cityId")} onChange={(e) => getAreaByCityId(e.target.value)}>
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

                <button type="submit" className="btn btn-primary w-100">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
