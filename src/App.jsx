import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './components/Home';
import Admin from './components/Admin';

function App() {
    useEffect(() => {
        // Global Cursor Logic
        const cursor = document.getElementById('cursor');
        const cursorRing = document.getElementById('cursorRing');

        const moveCursor = (e) => {
            if (cursor && cursorRing) {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';

                setTimeout(() => {
                    cursorRing.style.left = e.clientX + 'px';
                    cursorRing.style.top = e.clientY + 'px';
                }, 50);
            }
        };

        const onMouseDown = () => {
            if (cursor && cursorRing) {
                cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
                cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorRing.style.borderColor = 'rgba(232,37,26,1)';
            }
        };

        const onMouseUp = () => {
            if (cursor && cursorRing) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorRing.style.borderColor = 'rgba(232,37,26,0.5)';
            }
        };

        document.addEventListener('mousemove', moveCursor);
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);

        // Hover effects for clickables
        const addHoverEffects = () => {
            const clickables = document.querySelectorAll('a, button, input, select');
            clickables.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    if (cursorRing) {
                        cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
                        cursorRing.style.backgroundColor = 'rgba(255, 221, 0, 0.1)';
                    }
                });
                el.addEventListener('mouseleave', () => {
                    if (cursorRing) {
                        cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
                        cursorRing.style.backgroundColor = 'transparent';
                    }
                });
            });
        };

        setTimeout(addHoverEffects, 500);

        return () => {
            document.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    return (
        <>
            <div className="cursor" id="cursor"></div>
            <div className="cursor-ring" id="cursorRing"></div>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </>
    );
}

export default App;
