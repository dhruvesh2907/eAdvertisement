import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

export const ResetPassword = () => {
    const { token } = useParams(); // ✅ extract token string directly
    const { register, handleSubmit } = useForm()

    const submitHandler = async (data) => {
        try {
            const payload = {
                ...data,
                token: token, // ✅ send string not object
            };

            const res = await axios.post("/user/resetpassword", payload, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log(res.data);
            alert("Password updated successfully!");
        } catch (err) {
            console.error("Reset failed:", err);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div>
            <h1>RESET PASSWORD COMPONENT</h1>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div>
                    <label>NEW PASSWORD</label>
                    <input type='password' {...register("password")} />
                </div>
                <div>
                    <input type='submit' value="Reset Password" />
                </div>
            </form>
        </div>
    )
}
