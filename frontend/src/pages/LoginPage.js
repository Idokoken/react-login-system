import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Tablet, Desktop } from "../Responsive";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const Wrapper = styled.div`
  color: var(--primary-color);
  background-color: var(--secondary-color);
  position: relative;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  place-items: center;
  overflow: hidden;
  font-family: "Poppins", sans-serif;

  .register {
    background: var(--bg-color);
    border: 1px solid #e7e7e7;
    border-radius: 15px;
    position: relative;
    width: 80%;
    height: 500px;
    padding: 20px 30px;
    ${Tablet({ width: "50%" })}
    ${Desktop({ width: "30%" })}
  }

  .brand-logo {
    height: 70px;
    width: 50px;
    margin: auto;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .brand-logo img {
    height: 100%;
    width: 100%;
  }
  h3 {
    font-size: 20px;
    text-align: center;
    font-weight: 700;
  }

  .inputs {
    text-align: left;
    margin-top: 15px;
  }

  label,
  input,
  button {
    display: block;
    width: 100%;
    padding: 0;
    border: none;
    outline: none;
    box-sizing: border-box;
  }

  label {
    margin-bottom: 2px;
    font-size: 12px;
  }

  input::placeholder {
    color: rgba(52, 52, 52, 1);
  }

  input {
    background: var(--bg-color);
    border: 1px solid #e7e7e7;
    border-radius: 40px;
    padding: 10px;
    padding-left: 20px;
    height: 40px;
    font-size: 12px;
  }

  button {
    background: var(--secondary-color);

    border-radius: 40px;
    color: white;
    margin-top: 20px;
    height: 40px;
    cursor: pointer;
    font-weight: 700;
    font-style: normal;
    font-size: 12px;
    line-height: 18px;
  }
  .remember {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }
  .account {
    font-size: 12px;
    text-align: center;
  }

  a {
    margin-left: 10px;
    color: rgba(16, 13, 177, 1);
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { setUser, user } = useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    // if (!email || !password) {
    //   console.log("enter all fields");
    //   alert("invalid cridentials");
    // }
    try {
      const resp = await axios.post("/user/login", { email, password });
      // setUser(resp.data);
      if (resp.data == "email already in use") {
        navigate("/", { state: { id: email } });
      }

      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/patient");
    }
  }, [user, navigate]);

  return (
    <Wrapper>
      <div className="register">
        <h3 className="mt-2">LOGIN</h3>

        <form onSubmit={handleSubmit} className="input">
          <div className="mb-3">
            <label className="form-label mt-3 mb-1">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="enter email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label mt-3 mb-1">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="enter password"
            />
          </div>
          <div className="remember">
            <p>Remember Me</p>
            <Link>Forgot Password?</Link>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <div className="mt-4 account">
          <p className="">
            Dont't have an account?
            <Link to="/register">Create an account</Link>
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default LoginPage;
