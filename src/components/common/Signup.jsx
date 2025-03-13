import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import { FaUser, FaEnvelope, FaLock, FaBirthdayCake } from "react-icons/fa";

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
  background: #28a745;
  border: none;
  color: white;
  padding: 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    background: #218838;
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

const SignUp = () => {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", age: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      formData.roleId = "67be8f6378f28218ef82b36b";
      const res = await axios.post("/user", formData);
      if (res.status === 201) {
        toast.success("Signup successful!", { position: "top-left", theme: "dark", transition: Bounce });
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch {
      toast.error("Signup failed. Try again.", { position: "top-left", theme: "dark", transition: Bounce });
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Form>
        <h2>Sign Up</h2>
        <InputField>
          <FaUser />
          <Input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
        </InputField>
        <InputField>
          <FaUser />
          <Input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
        </InputField>
        <InputField>
          <FaBirthdayCake />
          <Input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
        </InputField>
        <InputField>
          <FaEnvelope />
          <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        </InputField>
        <InputField>
          <FaLock />
          <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        </InputField>
        <Button onClick={handleSubmit}>Sign Up</Button>
        <LinkText onClick={() => navigate("/login")}>Already have an account? Login</LinkText>
      </Form>
    </Container>
  );
};

export default SignUp;
  