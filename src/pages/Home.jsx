import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";


const Home = () => {


  return (
    <div className="container mt-5">
      <h1>Welcome to the Home Page  <br /> </h1>
    </div>
  );
};

export default Home;
