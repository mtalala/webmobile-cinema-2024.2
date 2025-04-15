"use client";

import styles from "./page.module.css";
import "./globals.css";
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [purchaseConfirmed, setPurchaseConfirmed] = useState(false);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (!data) return <div>Loading...</div>;

  const selectSeat = (number) => {
    setSelectedSeats((prev) =>
      prev.includes(number)
        ? prev.filter((n) => n !== number)
        : [...prev, number]
    );
  };

  const calculateTotalPrice = () => {
    return selectedSeats.length * data.price;
  };

  const confirmPurchase = () => {
    const updatedSeats = data.seats.map((seat) =>
      selectedSeats.includes(seat.number)
        ? { ...seat, available: false }
        : seat
    );

    setData({ ...data, seats: updatedSeats });
    setSelectedSeats([]); 
    setPurchaseConfirmed(true);

    setTimeout(() => setPurchaseConfirmed(false), 3000);
  };

  return (
    <div className={styles.container}>

      <h1>{data.title}</h1>
      <p className={styles.showtime}>{data.showtime}</p>

      <div className={styles.layout}>

        <div className={styles.seating}>

          <div className={styles.seats}>
            {data.seats.map((seat) => (
              <div
                key={seat.number}
                className={`${styles.seat} ${
                  seat.available ? (selectedSeats.includes(seat.number) ? styles.selected : styles.available) : styles.unavailable
                }`}
                onClick={() => seat.available && selectSeat(seat.number)}
                aria-label={`Seat ${seat.number} ${seat.available ? "available" : "unavailable"}`}
              ></div>
            ))}
          </div>

          <div className={styles.screenInfo}>

            <p className={styles.screenLabel}>Screen</p>
            <div className={styles.screen}></div>

            <div className={styles.statusIcons}>
              <div className={styles.availableIcon}></div>
              <p className={styles.statusLabel}>Available</p>
              <div className={styles.selectedIcon}></div>
              <p className={styles.statusLabel}>Selected</p>
              <div className={styles.unavailableIcon}></div>
              <p className={styles.statusLabel}>Unavailable</p>
            </div>

          </div>
          
        </div>

        <div className={styles.movieDetails}>
          <h3>Movie Synopsis:</h3>
          <p className={styles.synopsis}>{data.synopsis}</p>
          <h3>Release Date:</h3>
          <p className={styles.releaseDate}>{data.releaseDate}</p>
          <h3>Director:</h3>
          <p className={styles.director}>{data.director}</p>
        </div>

      </div>

      <div className={styles.priceSection}>
        <button
          className={styles.purchaseButton}
          onClick={confirmPurchase} 
          disabled={selectedSeats.length === 0} 
        >
          Buy <br /> $ {calculateTotalPrice().toFixed(2)}
        </button>
      </div>

      {purchaseConfirmed && (
        <div className={styles.confirmation}>
          <p>Purchase confirmed!</p>
        </div>
      )}

    </div>
  );
}
