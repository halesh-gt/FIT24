import React, { useState } from 'react';
import { Send, X } from 'lucide-react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Clean phone number - remove spaces, dashes, +, and ensure country code
        const cleanPhone = formData.phone.replace(/[\s\-\+]/g, '');
        const phoneWithCode = cleanPhone.startsWith('91') && cleanPhone.length === 12
            ? cleanPhone
            : '91' + cleanPhone.slice(-10);

        const msgText = `Hello, my name is ${formData.name}. I hope you are doing well. I would like to kindly enquire about the fitness programs available at FIT24.\n\nCould you please share more details regarding the available programs, membership options, and any other relevant information?\n\nThank you, and I look forward to your response.`;

        // Save to database (name, email, phone, plan, message all stored)
        try {
            await fetch(`http://${window.location.hostname}:5000/api/chatbot-lead`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name: formData.name,
                    email: formData.email,
                    phone: phoneWithCode
                })
            });
        } catch (err) {
            console.error("Failed to save lead:", err);
        }

        setIsSubmitted(true);

        const whatsappMsg = encodeURIComponent(msgText);
        const whatsappUrl = `https://wa.me/919743777871?text=${whatsappMsg}`;
        
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            setIsOpen(false);
            setIsSubmitted(false);
            setFormData({ name: '', email: '', phone: '' });
        }, 1500);
    };

    return (
        <>
            {/* Floating Action Button */}
            <button
                className={`chat-toggle ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Chat"
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#25D366',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
                    zIndex: 1000,
                    transition: 'transform 0.3s ease'
                }}
            >
                {isOpen ? (
                    <X size={24} />
                ) : (
                    <svg 
                        viewBox="0 0 24 24" 
                        width="30" 
                        height="30" 
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.63 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                )}
            </button>

            {/* Form Window */}
            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '100px',
                        right: '30px',
                        width: '350px',
                        backgroundColor: '#ffffff',
                        borderRadius: '20px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        zIndex: 1000,
                        border: '1px solid #eee',
                        padding: '25px',
                        color: '#333'
                    }}
                >
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#25D366' }}>WhatsApp Enquiry</h3>
                    <p style={{ margin: '0 0 20px 0', fontSize: '0.9rem', color: '#666' }}>Please fill in your details to connect with us.</p>
                    
                    {isSubmitted ? (
                        <div style={{ textAlign: 'center', padding: '20px 0' }}>
                            <p style={{ color: '#25D366', fontWeight: 'bold' }}>Thank you!</p>
                            <p>Redirecting to WhatsApp...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <label style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <label style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <label style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Contact Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter contact number"
                                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' }}
                                />
                            </div>
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: '#25D366',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    marginTop: '10px',
                                    boxShadow: '0 4px 10px rgba(37, 211, 102, 0.3)'
                                }}
                            >
                                Submit & Chat
                            </button>
                        </form>
                    )}
                </div>
            )}
        </>
    );
};

export default Chatbot;
