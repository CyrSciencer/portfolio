import { FC, useState, useRef, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact: FC<{ setPageLink: (pageLink: string) => void }> = ({ setPageLink }) => {
  const form = useRef<HTMLFormElement>(null);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  setPageLink('home');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Envoi en cours...');

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateResponseID = import.meta.env.VITE_EMAILJS_TEMPLATE_RESPONSE_ID;
    const templateAskID = import.meta.env.VITE_EMAILJS_TEMPLATE_ASK_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceID || !templateResponseID || !templateAskID || !publicKey) {
      console.error('EmailJS environment variables are not loaded!');
      setStatus('Erreur de configuration: Impossible de charger les identifiants EmailJS.');
      return;
    }

    try {
      await emailjs.sendForm(serviceID, templateAskID, form.current!, publicKey);
      await emailjs.sendForm(serviceID, templateResponseID, form.current!, publicKey);
      setStatus('Message envoyé avec succès!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus("Erreur lors de l'envoi du message. Veuillez réessayer.");
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-info">
          <h1>Contactez-moi</h1>
          <p>
            Je suis toujours ouvert pour:
            <ul>
              <li>des stages</li>
              <li>des alternances</li>
            </ul>
            Également, si vous avez des projets bien définis et que vous cherchez quelqu'un pour les
            coder.
            <br />
            je travail en:
            <ul>
              <li>front-end</li>
              <li>back-end</li>
              <li>full-stack</li>
            </ul>
            alors n'hésitez pas à me contacter.
          </p>
        </div>

        <form ref={form} onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              name="user_name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              placeholder="Votre nom"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="user_email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="Votre email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
              placeholder="Votre message"
              rows={6}
            />
          </div>

          <button type="submit" className="submit-button">
            Envoyer le message
          </button>

          {status && <p className="status-message">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
