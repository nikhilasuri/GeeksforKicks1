import "./Home.css";
import shoeImage from "../../../assets/home.png";
import React from "react";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <section className="home">
      <div className="home__content">
        <div className="home__shoe">
          <div className="home__shoe-bg"></div>
          <img src={shoeImage} alt="Shoe image" className="home__shoe-img" />
        </div>

        <div className="home__text">
          <h2 className="home__title">Adidas SPLY-350</h2>
          <p className="home__description">
            Adidas' SPLY-350 is a lightweight, breathable, comfortable shoe. Go
            shop and see more shoes like this. Add them to the cart and
            checkout.
          </p>
          <Link to="/products" className="btn home__btn">
            Go shop
            </Link>
          
        </div>
      </div>
    </section>
  );
};

export default Home;
