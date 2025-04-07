import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Container = styled.div`
   background: linear-gradient(135deg, #000000 70%, #7b2cbf 90%, #c77dff 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
`;

const Form = styled.div`
  background: linear-gradient(135deg, #000000 70%, #7b2cbf 90%, #c77dff 100%);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.1);
  width: 350px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const InputField = styled.div`
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #000000 70%, #7b2cbf 90%, #c77dff 100%);
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  color: #bbb;
`;

const Input = styled.input`
  background: none;
  border: none;
  outline: none;
  color: white;
  padding-left: 10px;
  flex: 1;
`;

const Button = styled.button`
   background: #7b2cbf;
  border: none;
  color: white;
  padding: 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    background: #5a1a8e;
  }
`;

const LinkText = styled.p`
  margin-top: 10px;
  font-size: 14px;
  cursor: pointer;
  color: #bbb;
  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
 
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/user/login", formData);
      if (res.status === 200) {
        toast.success("Login successful!", { position: "top-left", theme: "dark", transition: Bounce });
        localStorage.setItem("id", res.data.data._id);
        localStorage.setItem("role", res.data.data.roleId.name);
    
        setTimeout(() => {
          const role = res.data.data.roleId.name;
          if (role === "admin") {
            navigate("/admin");
          } else if (role === "Agency") {
            navigate("/Agency");
          } else {
            navigate("/user");
          }
        }, 3000);
      }
    } catch (error) {
      toast.error("Login failed. Please try again.", { position: "top-left", theme: "dark", transition: Bounce });
    }
    
  };

  return (
    <Container>
      <ToastContainer />
      <Form>
        <h1 style={{padding:"30px"}}>Login</h1>
        <InputField>
          <FaEnvelope />
          <Input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} />
        </InputField>
        <InputField>
          <FaLock />
          <Input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} />
        </InputField>
        <Button onClick={handleSubmit}>Login</Button>
        
        <LinkText onClick={() => navigate("/forgot-password")}>Forgot Password?</LinkText>
        <LinkText onClick={() => navigate("/signup")}>Don't have an account? Sign Up</LinkText>
      </Form>
    </Container>
  );
};

export default Login;
