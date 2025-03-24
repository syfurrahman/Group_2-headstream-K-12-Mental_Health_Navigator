// src/pages/HomePage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles.css';

const HomePage = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setChatOpen(prev => !prev);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("http://localhost:3001/api/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = { sender: "grok", text: data.reply };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error("Error sending message:", err);
      setMessages(prev => [...prev, { sender: "grok", text: "Oops! Something went wrong." }]);
    }
  };

  return (
    <>
      <div className="home-page">
        <Navbar />

        <div className="hero-section">
          <div className="hero-text">
            <h1>A guide to choosing and using digital interventions for student well-being</h1>
            <p>
              The K-12 Mental Health Tech Navigator is here to help schools and
              districts choose and use effective digital tools for student mental health
              and well-being. Wherever possible, we've included guidance on how to
              integrate these digital health products into a broader, more
              comprehensive approach to student mental health. To get the most from
              it, we recommend following our digital health product procurement
              journey.
            </p>
            <Link to="/journey" className="cta-button">Start Your Journey</Link>
          </div>
          <div className="hero-image">
            <img src="/img/main_page.jpg" alt="Students studying" />
          </div>
        </div>

        <section className="journey-overview">
          <h2>Explore The K-12 Mental Health Tech Navigator</h2>
          <p>
            Follow our digital health product procurement journey to get information and
            resources at each stage of the process.
          </p>
        </section>

        <section className="featured-resources">
          <h2>Featured Resources</h2>
          <div className="resource-cards">
            <div className="resource-card">
              <h3>Assessment Tools</h3>
              <p>Survey templates and tools to help identify student mental health needs.</p>
              <Link to="/resources/assessment">Learn More</Link>
            </div>
            <div className="resource-card">
              <h3>Implementation Guides</h3>
              <p>Best practices for rolling out digital mental health tools in schools.</p>
              <Link to="/resources/implementation">Learn More</Link>
            </div>
            <div className="resource-card">
              <h3>Technology Directory</h3>
              <p>A curated list of evidence-based digital mental health tools for K-12 settings.</p>
              <Link to="/resources/directory">Learn More</Link>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <h2>Success Stories</h2>
          <div className="testimonial-grid">
            <div className="testimonial">
              <blockquote>
                "This navigator helped us find the right digital tools to complement our existing mental health initiatives. Our students now have 24/7 access to resources they need."
              </blockquote>
              <cite>— School Counselor, Washington Elementary</cite>
            </div>
            <div className="testimonial">
              <blockquote>
                "The procurement journey saved us months of research and helped us avoid costly mistakes when selecting digital mental health resources."
              </blockquote>
              <cite>— District Administrator, Lakeside School District</cite>
            </div>
          </div>
        </section>

        <footer className="site-footer">
          <div className="footer-content">
            <div className="footer-column">
              <h4>K-12 Mental Health Tech Navigator</h4>
              <p>Supporting schools in implementing effective digital mental health solutions.</p>
            </div>
            <div className="footer-column">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/explore">Explore</Link></li>
                <li><Link to="/case-studies">Case Studies</Link></li>
                <li><Link to="/resources">Resources</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Contact</h4>
              <p>Email: info@k12mentalhealthnav.org</p>
              <p>Phone: (555) 123-4567</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 K-12 Mental Health Tech Navigator. All rights reserved.</p>
          </div>
        </footer>
      </div>

      {/* Floating Chat Button */}
      <button className="floating-chat-button" onClick={toggleChat}>
        💬
      </button>

      {chatOpen && (
        <div className="chat-modal">
          <div className="chat-header">
            <span>Ask Us Anything</span>
            <button onClick={toggleChat}>✕</button>
          </div>

          <div className="chat-body">
            {messages.length === 0 ? (
              <p><em>Hi! How can we help you today?</em></p>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={msg.sender === "user" ? "user-msg" : "bot-msg"}>
                  {msg.text}
                </div>
              ))
            )}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
