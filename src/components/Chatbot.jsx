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
            
            const qaPairs = [
                { keys: ['mindset', 'mentality'], response: "Transforming Mindset Before the Body: The Real Start of Fitness at Fit24 Gym in JP Nagar is key to long-term success." },
                { keys: ['workout working', 'results'], response: "Not seeing results? Learn how to know if your workout is actually working at Fit24 with structured, trackable training." },
                { keys: ['injury', 'safe', 'safety'], response: "Learn how smart, structured training at Fit24 Gym in JP Nagar reduces injury risk while helping you train safely." },
                { keys: ['quality', 'environment', 'value'], response: "Fitness is a long-term investment. Training in a quality environment like Fit24 delivers better consistency and results." },
                { keys: ['psychology', 'design', 'space'], response: "Your workout space affects your mindset. Fit24's well-designed space improves focus, confidence, and consistency." },
                { keys: ['recovery', 'rest', 'sleep'], response: "Recovery is where results happen. Fit24 treats rest, sleep, and recovery as essential parts of the workout." },
                { keys: ['cardio', 'myths', 'fat loss'], response: "Cardio myths can slow you down. Learn what really works for fat loss at Fit24 with smart, balanced training." },
                { keys: ['plateau', 'stuck', 'stall'], response: "Stuck with no progress? Fit24 helps you break through fitness plateaus with structured training and smart recovery." },
                { keys: ['habit', 'consistency', 'burnout'], response: "Building sustainable fitness habits is key. Fit24 helps you stay consistent without burnout." },
                { keys: ['technology', 'tracking', 'accountability'], response: "Technology is your accountability partner. Fit24 uses smart tracking and structured training for consistent results." },
                { keys: ['science', 'structure', 'random'], response: "Random training fails. Fit24 uses smart programming and structured workouts for consistent, science-based results." },
                { keys: ['premium', 'inside', 'look'], response: "What makes a gym 'premium'? Fit24 delivers a superior experience through space, guidance, and personalization." },
                { keys: ['professional', 'busy', 'guide'], response: "Busy schedule? Fit24's efficient, structured workouts help professionals stay fit without spending hours." },
                { keys: ['personalized', 'routine', 'generic'], response: "Personalized routines beat generic workouts. Fit24 focuses on custom plans for faster, safer, visible results." },
                { keys: ['equipment', 'modern', 'machine'], response: "Modern equipment isn’t just for looks. Advanced machines at Fit24 improve safety, efficiency, and results." },
                { keys: ['smart fitness', 'matters'], response: "Smart fitness focuses on structure and intention. Structured workouts lead to sustainable progress." },
                { keys: ['wellness', 'mind and body', 'detox'], response: "Mental wellness is vital. A daily workout at Fit24 becomes your mental detox ritual for mind and body." },
                { keys: ['progressive overload', 'hard'], response: "Progressive overload matters more than just working hard. It drives strength and consistent results." },
                { keys: ['strength training', 'muscle'], response: "Strength training is for everyone. It improves mobility, metabolism, and long-term health." },
                { keys: ['12 weeks', 'consistent'], response: "Staying consistent for 12 weeks requires structure. Fit24 supports you with realistic routines and tracking." },
                { keys: ['mental barrier', 'mind stops'], response: "Mental barriers often stop progress before the body does. Fit24 helps you influence mindset through structure." },
                { keys: ['ambience', 'focus'], response: "Space and ambience shape workout quality. They influence focus, consistency, and long-term results." },
                { keys: ['weight loss', 'fat loss'], response: "Fat loss and weight loss are different. Real fat loss requires structured training and understanding the science." },
                { keys: ['discipline', '9-5', '5 km'], response: "Discipline, structure, and consistency are the trap most people miss. Sustainable fitness is the real lesson." },
                { keys: ['willpower'], response: "Relying on willpower alone fails. Fit24 provides the structure and environment to keep you consistent." },
                { keys: ['trial and error'], response: "Random plans leave people stuck. Structured training at Fit24 creates sustainable, long-term progress." },
                { keys: ['price', 'cost'], response: "Our premium plans start at ₹1,499/month. You can find more details in the Pricing section!" }
            ];

            const found = qaPairs.find(qa => qa.keys.some(key => lowerInput.includes(key)));
            if (found) {
                botResponse = found.response;
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
