import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'

export const ForgotPassword = () => {
    const {register,handleSubmit}=useForm();

    const submitHandler = async (data) => {
        try {
            console.log("Form data:", data);
    
            const res = await axios.post(
                "/user/forgotpassword",
                {
                    email: data.email,  // assuming your form field is named "email"
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
    
            console.log("Server response:", res.data);
            // Show success toast or message if needed
        } catch (err) {
            console.error("Error in forgot password:", err);
            // Show error message to user
        }
    };
    
  return (
    <div>
    <form onSubmit={handleSubmit(submitHandler)}>
    <input type="email" placeholder='enter email' {...register("email")}/>
    <input type="submit"/>  
    </form>
    </div>
  )
}
