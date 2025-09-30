import React, { useEffect } from "react";

// Minimal particles.js loader using CDN
export default function ParticlesBackground() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
        script.async = true;
        script.onload = () => {
            if (window.particlesJS) {
                window.particlesJS('particles-js', {
                    particles: {
                        number: { value: 60, density: { enable: true, value_area: 800 } },
                        color: { value: ["#56ab2f", "#06b6d4", "#2563eb"] },
                        shape: { type: "circle" },
                        opacity: { value: 0.4, random: false },
                        size: { value: 3, random: true },
                        line_linked: { enable: true, distance: 150, color: "#a8e063", opacity: 0.25, width: 1 },
                        move: { enable: true, speed: 1.2, direction: "none", out_mode: "out" }
                    },
                    interactivity: {
                        detect_on: "canvas",
                        events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
                        modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } }
                    },
                    retina_detect: true
                });
            }
        };
        document.body.appendChild(script);
        return () => {
            const el = document.getElementById('particles-js');
            if (el) el.innerHTML = '';
        };
    }, []);

    return <div id="particles-js" style={{position:'fixed', inset:0, zIndex:0, pointerEvents:'none'}}/>;
}


