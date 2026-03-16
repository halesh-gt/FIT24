import React from 'react';

const Facilities = () => {
    const images = [
        '/img/gym-img1.jpeg',
        '/img/gym-img2.jpeg',
        '/img/gym-img3.jpeg',
        '/img/gym-img4.jpeg',
        '/img/gym-img5.jpeg',
        '/img/gym-img6.jpeg',
        '/img/gym-img7.jpeg',
        '/img/gym-img8.jpeg',
        '/img/gym-img9.jpeg',
    ];

    return (
        <section id="facilities" className="facilities-section">
            <div className="facilities-container">
                <div className="section-label reveal">Our Environment</div>
                <h2 className="section-title reveal">WORLD CLASS<br /><span style={{ color: 'var(--red)' }}>FACILITIES</span></h2>
                
                <div className="facilities-grid reveal">
                    {images.map((img, index) => (
                        <div key={index} className="facility-card">
                            <div className="facility-img-wrapper">
                                <img src={img} alt={`Facility ${index + 1}`} className="facility-img" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Facilities;
