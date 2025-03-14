import { useState } from "react";
import styles from "./SignUpForm.module.scss";
// import { HorizontalLine } from "../HorizoantalLine/HorizontalLine";
// import { DonationBanner } from "../DontationBanner/DonationBanner";

export const SignUpForm = ({ setShowSignUp }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    address: "",
    city: "",
    zipcode: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("Sending signup request");

    const body = { 
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      password: formData.password,
      address: formData.address,
      city: formData.city,
      zipcode: formData.zipcode, 
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch("http://localhost:4242/users", options);
      const data = await response.json();
      console.log("Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Cant create account");
      }

      alert("Konto oprettet! Du kan nu logge ind.");
      setShowSignUp(false);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <div className={styles.signUpContainer}>
        <h2 className={styles.title}>Opret en konto</h2>

        <form onSubmit={handleSignUp} className={styles.signUpForm}>
          {/* Email */}
          <div className={styles.inputGroup}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              className={styles.inputField}
              placeholder="Din email..."
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className={styles.inputGroup}>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              className={styles.inputField}
              placeholder="Dit password..."
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Fornavn */}
          <div className={styles.inputGroup}>
            <label>Fornavn:</label>
            <input
              type="text"
              name="firstname"
              className={styles.inputField}
              placeholder="Dit fornavn..."
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>

          {/* Efternavn */}
          <div className={styles.inputGroup}>
            <label>Efternavn:</label>
            <input
              type="text"
              name="lastname"
              className={styles.inputField}
              placeholder="Dit efternavn..."
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>

          {/* Adresse */}
          <div className={styles.inputGroup}>
            <label>Adresse:</label>
            <input
              type="text"
              name="address"
              className={styles.inputField}
              placeholder="Din adresse..."
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* By */}
          <div className={styles.inputGroup}>
            <label>By:</label>
            <input
              type="text"
              name="city"
              className={styles.inputField}
              placeholder="Din by..."
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          {/* Postnummer */}
          <div className={styles.inputGroup}>
            <label>Postnummer:</label>
            <input
              type="text"
              name="zipcode"
              className={styles.inputField}
              placeholder="Dit postnummer..."
              value={formData.zipcode}
              onChange={handleChange}
              required
            />
          </div>
                <p className={styles.loginRedirect}>
                Har du allerede en konto hos os? Klik{" "}
                <span
                    onClick={() => setShowSignUp(false)}
                    className={styles.toggleLink}
                >
                    her
                </span>{" "}
                for at vende tilbage til login
                </p>

          <div className={styles.termsAndButton}>
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                name="termsAccepted"
                className={styles.checkbox}
                checked={formData.termsAccepted}
                onChange={handleChange}
                required
              />
              <label className={styles.termsText}>
                Jeg har læst og forstået de gældende betingelser for oprettelse af
                kundekonto og brug af denne side
              </label>
            </div>

            <button type="submit" className={styles.signUpButton}>
              Opret
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
