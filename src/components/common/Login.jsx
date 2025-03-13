import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Container = styled.div`
  background-color: #121212;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
`;

const Form = styled.div`
  background-color: #1e1e1e;
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
  background: #333;
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
  background: #007bff;
  border: none;
  color: white;
  padding: 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    background: #0056b3;
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
        if (res.data.data.roleId.name === "Agency") setTimeout(() => navigate("/Agency"), 3000);
      }
    } catch {
      toast.error("Invalid credentials. Try again.", { position: "top-left", theme: "dark", transition: Bounce });
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Form>
        <h2>Login</h2>
        <InputField>
          <FaEnvelope />
          <Input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} />
        </InputField>
        <InputField>
          <FaLock />
          <Input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} />
        </InputField>
        <Button onClick={handleSubmit}>Login</Button>
        <LinkText onClick={() => navigate("/signup")}>Don't have an account? Sign Up</LinkText>
      </Form>
    </Container>
  );
};

export default Login;
