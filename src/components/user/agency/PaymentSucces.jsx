import React, { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const hasConfirmed = useRef(false); // prevent double run

    useEffect(() => {
        if (hasConfirmed.current) return; // stop if already run
        hasConfirmed.current = true;

        const hoardingId = params.get("hoardingId");
        const hoardingDimension = params.get("hoardingDimension");
        const hourlyRate = params.get("hourlyRate");
        const userId = localStorage.getItem("id");

        const confirmBooking = async () => {
            try {
                await axios.post("/api/mybookings/create", {
                    hoardingDimension,
                    hourlyRate,
                    hoardingId,
                    userId,
                });

                console.log("Payment success");

                await axios.delete(`/hording/hording/${hoardingId}`);

                navigate("/mybookings");
            } catch (err) {
                console.error("Post-payment actions failed:", err);
            }
        };

        confirmBooking();
    }, [params, navigate]);

    return (
        <div style={{ color: "white", textAlign: "center", paddingTop: "30px" }}>
            Processing your booking...
        </div>
    );
};

export default PaymentSuccess;
