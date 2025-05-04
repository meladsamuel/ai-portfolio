import { useState, useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);

  // Set up canvas and animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Initialize particles
    function initParticles() {
      particles = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 8000);

      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          speed: Math.random() * 0.5 + 0.2,
          angle: Math.random() * Math.PI * 2,
          color: `rgba(88, 88, 88, ${Math.random() * 0.5 + 0.2})`,
          connections: []
        });
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Move particles
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.angle = Math.PI - particle.angle;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.angle = -particle.angle;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Reset connections
        particle.connections = [];

        // Find connections
        particles.forEach((otherParticle, j) => {
          if (i !== j) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
 
            if (distance < 150) {
              particle.connections.push({
                particle: otherParticle,
                distance: distance
              });
            }
          }
        });

        // Draw connections
        particle.connections.forEach(connection => {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(connection.particle.x, connection.particle.y);
          const opacity = 1 - (connection.distance / 150);
          ctx.strokeStyle = `rgba(150,150, 150, ${opacity * 0.2})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      });

      animationFrameId = window.requestAnimationFrame(animate);
    };

    // Start animation
    setTimeout(() => {
      setAnimationStarted(true);
      animate();

      // Show title after animation starts
      setTimeout(() => {
        setTitleVisible(true);
      }, 500);
    }, 200);

    // Clean up
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle scroll opacity
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const fadeStart = 50;
      const fadeEnd = 200;
      const opacity = 1 - Math.min(Math.max((scrollPosition - fadeStart) / (fadeEnd - fadeStart), 0), 1);
      setScrollOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-50 transition-opacity duration-1000 ${animationStarted ? 'opacity-100' : 'opacity-0'}`}
    />
  );
}
