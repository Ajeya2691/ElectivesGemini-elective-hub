import React, { useEffect, useRef } from 'react';

const StarBackground = ({ isDark }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // --- Configuration ---
    // Light Mode: Orange/Amber stars (Sunset Theme)
    // Dark Mode: White/Blueish stars (Midnight Theme)
    const starColor = isDark ? '255, 255, 255' : '234, 88, 12'; // RGB values
    const bgFill = isDark ? '#09090b' : '#fafaf9'; // zinc-950 vs stone-50
    const starCount = isDark ? 150 : 80; // Fewer stars in light mode for cleanliness

    // Resize canvas
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Star Object
    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.5; // Drift speed
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random();
        this.twinkleSpeed = Math.random() * 0.02 + 0.005;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Twinkle effect (sine wave)
        this.opacity += this.twinkleSpeed;
        if (this.opacity > 1 || this.opacity < 0) {
          this.twinkleSpeed = -this.twinkleSpeed;
        }
      }

      draw() {
        // Use Math.abs to handle the oscillating opacity
        const currentOpacity = Math.abs(this.opacity);
        ctx.fillStyle = `rgba(${starColor}, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize stars
    const stars = Array.from({ length: starCount }, () => new Star());

    // Animation Loop
    const animate = () => {
      // Clear with background color (creates the base layer)
      ctx.fillStyle = bgFill;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        star.update();
        star.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]); // Re-run when theme changes

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none transition-colors duration-500"
    />
  );
};

export default StarBackground;