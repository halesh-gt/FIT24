import React, { useState } from 'react';
import { Send, X, MessageSquare } from 'lucide-react';

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
                botResponse = "We are open 24/7! You can train without limits, anytime.";
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
                    backgroundColor: '#fde047',
                    color: '#050505',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(253, 224, 71, 0.4)',
                    zIndex: 1000,
                    transition: 'transform 0.3s ease'
                }}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div
                    className="chat-window"
                    style={{
                        position: 'fixed',
                        bottom: '100px',
                        right: '30px',
                        width: '350px',
                        height: '500px',
                        backgroundColor: '#1a1a1a',
                        borderRadius: '15px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                        display: 'flex',
                        flexDirection: 'column',
                        zIndex: 1000,
                        border: '1px solid #333',
                        overflow: 'hidden'
                    }}
                >
                    {/* Header */}
                    <div style={{
                        padding: '20px',
                        backgroundColor: '#111',
                        borderBottom: '1px solid #333',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px'
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#fde047',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#050505',
                            fontWeight: 'bold'
                        }}>
                            AI
                        </div>
                        <div>
                            <h3 style={{ margin: 0, color: 'white', fontSize: '1.1rem' }}>FIT24 Assistant</h3>
                            <p style={{ margin: 0, color: '#fde047', fontSize: '0.8rem' }}>Online</p>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div style={{
                        flex: 1,
                        padding: '20px',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px'
                    }}>
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                style={{
                                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                    maxWidth: '80%',
                                    padding: '12px 16px',
                                    borderRadius: msg.sender === 'user' ? '15px 15px 0 15px' : '15px 15px 15px 0',
                                    backgroundColor: msg.sender === 'user' ? '#fde047' : '#2a2a2a',
                                    color: msg.sender === 'user' ? '#050505' : 'white',
                                    fontSize: '0.9rem',
                                    lineHeight: '1.4'
                                }}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div style={{
                        padding: '15px',
                        backgroundColor: '#111',
                        borderTop: '1px solid #333'
                    }}>
                        <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px' }}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                style={{
                                    flex: 1,
                                    padding: '12px 15px',
                                    borderRadius: '25px',
                                    border: '1px solid #333',
                                    backgroundColor: '#222',
                                    color: 'white',
                                    outline: 'none'
                                }}
                            />
                            <button
                                type="submit"
                                style={{
                                    width: '45px',
                                    height: '45px',
                                    borderRadius: '50%',
                                    backgroundColor: '#fde047',
                                    border: 'none',
                                    color: '#050505',
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
