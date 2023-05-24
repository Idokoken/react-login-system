import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      <h3>Welcome Home</h3>
      <h4>hello {location.state.id}, welocome to home</h4>
    </div>
  );
};

export default Home;
