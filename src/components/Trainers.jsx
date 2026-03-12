import React, { useState, useEffect } from 'react';

const Trainers = () => {
    const [trainers, setTrainers] = useState([]);

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/trainers');
                const data = await res.json();
                setTrainers(data);
            } catch (err) {
                console.error('Error fetching trainers:', err);
            }
        };
        fetchTrainers();
    }, []);

    return (
        <section id="trainers" className="trainers-section">
            <div style={{ padding: '0 60px' }}>
                <div className="section-label reveal">Our Experts</div>
                <h2 className="section-title reveal">LEADERS IN<br /><span style={{ color: 'var(--red)' }}>FITNESS</span></h2>

                <div className="trainers-grid reveal">
                    {trainers.map((trainer) => (
                        <div key={trainer.id} className="trainer-card">
                            <div className="trainer-img" style={{ backgroundImage: `url('${trainer.image_url}')` }}>
                                <div className="trainer-exp-badge">{trainer.experience}</div>
                            </div>
                            <div className="trainer-info">
                                <h3 className="trainer-name">{trainer.name}</h3>
                                <span className="trainer-spec">{trainer.specialization}</span>
                                <ul className="trainer-certs">
                                    {trainer.certifications.split(',').map((cert, index) => (
                                        <li key={index}>{cert}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Trainers;
