import React, { useState } from 'react';
import { Minus, Plus, HelpCircle, MessageCircle } from 'lucide-react';
import './FAQSection.css';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How does MediNear work?",
      answer: "MediNear helps you find medicines, pharmacies and hospitals near you. Just search, compare and choose the best option."
    },
    {
      question: "Is MediNear free to use?",
      answer: "Yes, MediNear is 100% free for patients and users. You can search for medicines, compare pharmacy prices, and locate hospitals near you without any subscription fee."
    },
    {
      question: "How are pharmacies and hospitals verified?",
      answer: "All pharmacies and hospitals listed on MediNear undergo a rigorous verification process, checking drug licenses, physical addresses, operating hours, and customer compliance."
    },
    {
      question: "Can I order medicines through MediNear?",
      answer: "Yes! You can reserve medicines for instant pickup at your nearest pharmacy or place direct online orders with home delivery through our partner pharmacies."
    }
  ];

  return (
    <section className="faq-section">
      <div className="container">
        {/* Section Heading */}
        <div className="section-header">
          <h2 className="section-title">
            Frequently Asked <span className="text-green">Questions</span>
          </h2>
        </div>

        <div className="faq-container-grid">
          {/* Left Accordion List */}
          <div className="faq-accordion-list">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div 
                  key={idx} 
                  className={`faq-item ${isOpen ? 'open' : ''}`}
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                >
                  <div className="faq-header">
                    <h3 className="faq-question">{faq.question}</h3>
                    <button className="faq-toggle-btn">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </button>
                  </div>
                  {isOpen && (
                    <div className="faq-body animate-fade-in">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right 3D Visual Graphic */}
          <div className="faq-visual-wrapper">
            <div className="faq-illustration-card">
              <div className="3d-question-graphic">
                <div className="chat-bubble-floating bubble-1 float-animation">
                  <MessageCircle size={22} className="text-blue" />
                </div>
                <div className="main-question-circle">
                  <span className="question-mark-text">?</span>
                </div>
                <div className="chat-bubble-floating bubble-2 float-animation" style={{ animationDelay: '1.5s' }}>
                  <div className="dots-icon">•••</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
