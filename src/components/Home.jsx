// src/pages/Home.jsx
import React, { useState } from "react";
import "./Home.css";
import finImg from "../assets/fin.jpg";
import finImgg from "../assets/girl.jpg";
import finImgg1 from "../assets/girl2.jpg";

const Home = ({ onGetStarted }) => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const facts = [
    "The average menstrual cycle is 28 days long, but a healthy cycle can range from 21 to 35 days.",
    "Tracking your cycle can help you predict mood changes and energy levels.",
    "Stress can significantly impact your menstrual cycle.",
    "The follicular phase is when your energy levels are typically highest.",
    "Over 2 billion people worldwide menstruate, yet the topic is often surrounded by stigma."
  ];

  const testimonials = [
    {
      text: "HerWellness has changed my life! I finally understand my body and can predict my moods and energy levels.",
      name: "— Sarah M."
    },
    {
      text: "The personalized insights are amazing. The AI predictions are spot-on and help me prepare for my cycle.",
      name: "— Jessica L."
    },
    {
      text: "This app is more than a tracker; it's a wellness companion. The daily tips are so helpful.",
      name: "— Emily R."
    }
  ];

  const faqs = [
    {
      question: "How does the AI provide personalized insights?",
      answer: "Our AI analyzes your logged data to generate predictions unique to you."
    },
    {
      question: "Is my personal health data secure?",
      answer: "Yes, all information is encrypted and never shared with third parties."
    },
    {
      question: "Can I use this app if my cycles are irregular?",
      answer: "Absolutely. Our AI learns from your patterns, even with irregular cycles."
    },
    {
      question: "Is HerWellness free to use?",
      answer: "You can start with our free version, and upgrade to premium for more insights."
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      {/* Hero Section */}
<section className="hero-section text-center">
  <h1 className="display-4  fw-bold text-danger">
    Your Personal Menstrual and Wellness Tracker
  </h1>
    <p className="lead mt-3 text-muted hero-paragraph mx-auto">
    HerWellness is more than a tracker — it’s your personal guide to understanding and embracing your body. Every day, it helps you tune into your cycle, track your moods, and discover insights tailored just for you. With HerWellness, menstrual health becomes empowerment, not confusion. Celebrate your rhythm, honor your body, and thrive with confidence, knowing that every phase of your cycle is an opportunity to nurture yourself and live your best life.
  </p>
  <button
    onClick={onGetStarted}
    className="btn btn-lg btn-danger mt-4 shadow"
  >
    Get Started
  </button>
</section>

<section className="about-section my-5">
  <div className="row align-items-center g-4">
    <div className="col-md-4">
      <img
        src={finImgg1}
        alt="Wellness"
        className="img-fluid rounded-4 shadow w-100"
      />
    </div>
    <div className="col-md-6">
      <h2 className="fw-bold text-danger">Understand Your Body, Naturally.</h2>
      <p className="text-muted">
        our cycle is not a burden, it’s a gift.
It reminds you of the strength flowing within.
Through every ache and challenge, you rise.
Your body is powerful, resilient, and wise.
Honor yourself, and let your confidence shine.
      </p>
    </div>
  </div>
</section>


      {/* Facts */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="fw-bold text-center text-danger mb-4">Interesting Facts</h2>
          <div className="row">
            {facts.map((fact, i) => (
              <div key={i} className="col-md-6 mb-4">
                <div className="p-4 border rounded-4 shadow-sm fact-card">
                  {fact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-5">
        <h2 className="fw-bold text-center text-danger mb-4">What Our Users Say</h2>
        <div className="row">
          {testimonials.map((t, i) => (
            <div key={i} className="col-md-4 mb-4">
              <div className="p-4 bg-light rounded-4 shadow-sm testimonial-card">
                <p className="fst-italic">"{t.text}"</p>
                <p className="fw-bold text-danger text-end">{t.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="fw-bold text-center text-danger mb-4">FAQs</h2>
          <div className="accordion" id="faqAccordion">
            {faqs.map((faq, i) => (
              <div key={i} className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button ${openFAQ === i ? "" : "collapsed"}`}
                    type="button"
                    onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  >
                    {faq.question}
                  </button>
                </h2>
                <div
                  className={`accordion-collapse collapse ${openFAQ === i ? "show" : ""}`}
                >
                  <div className="accordion-body">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
