import { FC, useState, useRef, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const Contact: FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateResponseID = import.meta.env.VITE_EMAILJS_TEMPLATE_RESPONSE_ID;
    const templateAskID = import.meta.env.VITE_EMAILJS_TEMPLATE_ASK_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Ensure the variables are actually loaded (replace placeholders in check if needed)
    if (
      !serviceID ||
      !templateResponseID ||
      !templateAskID ||
      !publicKey ||
      serviceID === "TEMP_SERVICE_ID"
    ) {
      console.error(
        "EmailJS environment variables are not loaded or are placeholders!"
      );
      setStatus("Configuration error: Could not load EmailJS credentials.");
      return; // Stop submission if keys are missing or placeholders
    }

    try {
      if (!form.current) return;
      
      await emailjs.sendForm(
        serviceID,
        templateResponseID,
        form.current,
        publicKey
      );
      await emailjs.sendForm(serviceID, templateAskID, form.current, publicKey);
      console.log("SUCCESS!");
      setStatus("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
      navigate("/");
    } catch (error: any) {
      console.log("FAILED...", error.text || error); // Log error object too
      setStatus(
        `Failed to send message: ${
          error.text || "Unknown Error"
        }. Please try again.`
      );
    }
  };

  return (
    <main className="contact-main">
      <h1>Contact</h1>
      <form ref={form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="user_name"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="user_email"
          required
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          name="message"
          required
        />
        <button type="submit">Envoyer</button>
      </form>
      {status && <p className="status-message">{status}</p>}
    </main>
  );
};

export default Contact; 