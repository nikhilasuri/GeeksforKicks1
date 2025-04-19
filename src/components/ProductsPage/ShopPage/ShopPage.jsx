import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Shoe from "./Shoe/Shoe";
import "./ShopPage.css";

const ShopPage = () => {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchShoes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "shoes"));
      const shoesData = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .slice(0, 6); // 👈 Limit to 6 shoes
      setShoes(shoesData);
    } catch (error) {
      console.error("Error fetching shoes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShoes();
  }, []);

  return (
    <section className="shop" id="shop">
      <div className="shop__content">
        <h2>Our offers</h2>

        {loading ? (
          <p>Loading shoes...</p>
        ) : shoes.length === 0 ? (
          <p>No shoes available.</p>
        ) : (
          <div className="shop__grid">
            {shoes.map((shoe) => (
              <Shoe
                key={shoe.id}
                id={shoe.id}
                image={shoe.image}
                name={shoe.name}
                price={shoe.price}
                size={shoe.size}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopPage;
