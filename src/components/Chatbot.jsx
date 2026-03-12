import React, { useState } from 'react';
import { Send, X } from 'lucide-react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi there! Welcome to FIT24. How can I help you regarding your fitness goals today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState("");

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add user message
        const userMsg = input;
        setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
        setInput("");

        // Simulate bot response
        setTimeout(() => {
            let botResponse = "I can definitely help with that. Could you provide a bit more detail?";

            const lowerInput = userMsg.toLowerCase();
            if (lowerInput.includes('price') || lowerInput.includes('cost')) {
                botResponse = "Our plans start at ₹1,499/month. You can find more details in the Pricing section!";
            } else if (lowerInput.includes('class') || lowerInput.includes('schedule')) {
                botResponse = "We have a variety of classes including HIIT, Yoga, and Boxing. Check out our Schedule for timings.";
            } else if (lowerInput.includes('time') || lowerInput.includes('open')) {
                botResponse = "We are available anytime! You can train without limits, whenever you want.";
            }

            setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
        }, 1000);
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

            {/* Chat Window */}
            {isOpen && (
                <div
                    className="chat-window active"
                    style={{
                        position: 'fixed',
                        bottom: '100px',
                        right: '30px',
                        width: '350px',
                        height: '500px',
                        backgroundColor: '#ffffff',
                        borderRadius: '20px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        zIndex: 1000,
                        border: '1px solid #eee',
                        overflow: 'hidden'
                    }}
                >
                    {/* Header */}
                    <div style={{
                        padding: '20px',
                        backgroundColor: '#ffffff',
                        borderBottom: '1px solid #eee',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px'
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#25D366',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontWeight: 'bold'
                        }}>
                            AI
                        </div>
                        <div>
                            <h3 style={{ margin: 0, color: '#333', fontSize: '1.1rem' }}>FIT24 Assistant</h3>
                            <p style={{ margin: 0, color: '#25D366', fontSize: '0.8rem' }}>Online</p>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div style={{
                        flex: 1,
                        padding: '20px',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        backgroundColor: '#f7f7f7'
                    }}>
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                style={{
                                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                    maxWidth: '80%',
                                    padding: '12px 16px',
                                    borderRadius: msg.sender === 'user' ? '15px 15px 0 15px' : '15px 15px 15px 0',
                                    backgroundColor: msg.sender === 'user' ? '#25D366' : '#ffffff',
                                    color: msg.sender === 'user' ? '#ffffff' : '#333',
                                    fontSize: '0.9rem',
                                    lineHeight: '1.4',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                                }}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div style={{
                        padding: '15px',
                        backgroundColor: '#ffffff',
                        borderTop: '1px solid #eee'
                    }}>
                        <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px' }}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                style={{
                                    flex: 1,
                                    padding: '12px 18px',
                                    borderRadius: '25px',
                                    border: '1px solid #eee',
                                    backgroundColor: '#fdfdfd',
                                    color: '#333',
                                    outline: 'none',
                                    fontSize: '0.9rem'
                                }}
                            />
                            <button
                                type="submit"
                                style={{
                                    width: '45px',
                                    height: '45px',
                                    borderRadius: '50%',
                                    backgroundColor: '#25D366',
                                    border: 'none',
                                    color: '#fff',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    opacity: input.trim() ? 1 : 0.5
                                }}
                                disabled={!input.trim()}
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
