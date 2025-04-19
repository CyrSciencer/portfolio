import React, { useRef, useEffect } from "react";

function ParticleBackgroundAnimation({ colorParticule }) {
  const canvasRef = useRef(null);
  const particlesArray = useRef([]);
  const animationFrameId = useRef(null);
  const numberOfParticles = 300;
  const currentDimensions = useRef({ width: 0, height: 0 }); // Store dimensions

  // Particle Class (nested or defined outside)
  class Particle {
    constructor(x, y, canvasWidth, canvasHeight, ctx) {
      this.x = Math.random() * x;
      this.y = Math.random() * y;
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.ctx = ctx;
      this.color = colorParticule; // Use the destructured prop
      this.size = Math.random() * 10;
      this.resetPosition(true); // Initialize position and speed
    }

    // Method to reset particle to a border position with inward speed
    resetPosition(isInitial = false) {
      if (isInitial) {
        this.x = Math.random() * this.canvasWidth;
        this.y = Math.random() * this.canvasHeight;
        isInitial = false;
      } else {
        this.x = Math.random() * this.canvasWidth;
        this.y = this.canvasHeight;
      }
      // Start at the bottom edge with a random x position

      // Set speed straight upwards (negative Y direction)
      this.speedX = 0;
      this.speedY = -(Math.random() * 1 + 0.5); // Random upward speed (adjust range as needed)
    }

    update() {
      // Just apply velocity for straight upward movement
      this.x += this.speedX;
      this.y += this.speedY;

      // Reset if particle goes off the top edge
      if (this.y + this.size < 0) {
        // Check against top edge
        this.resetPosition();
        return; // Skip drawing this frame as it just reset
      }
    }

    draw() {
      if (!this.ctx) return; // Guard clause

      // Draw the particle
      this.ctx.fillStyle = this.color;
      this.ctx.beginPath();
      this.ctx.fillRect(this.x, this.y, this.size, this.size);
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Exit if canvas not found

    const ctx = canvas.getContext("2d");

    const init = (width, height) => {
      canvas.width = width;
      canvas.height = height;
      currentDimensions.current = { width, height }; // Store current dimensions
      particlesArray.current = [];
      for (let i = 0; i < numberOfParticles; i++) {
        // Initialize particles using the reset logic (placing them at borders)
        // Pass width, height, ctx directly. resetPosition is called inside constructor.
        particlesArray.current.push(new Particle(0, 0, width, height, ctx));
      }
    };

    const animate = () => {
      // Use stored dimensions for clearing
      const { width, height } = currentDimensions.current;
      if (!width || !height) {
        // Skip frame if dimensions are zero
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }
      // Clear the canvas for transparency
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(34, 34, 34, 0.2)"; // Use a fillStyle that allows seeing particles
      // ctx.fillRect(0, 0, width, height);
      particlesArray.current.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      animationFrameId.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      // Use window dimensions
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (
        width === currentDimensions.current.width &&
        height === currentDimensions.current.height
      ) {
        return; // No actual size change
      }

      // Update canvas and stored dimensions
      canvas.width = width;
      canvas.height = height;
      currentDimensions.current = { width, height };

      // Update existing particles' knowledge of bounds
      // Optional: Re-initialize all particles with init(width, height) for different behavior
      particlesArray.current.forEach((p) => {
        p.canvasWidth = width;
        p.canvasHeight = height;
        p.ctx = canvas.getContext("2d"); // Ensure context is fresh if needed (though usually not)

        // Optional: Clamp particles to new bounds immediately
        if (p.x > width) p.x = width - p.size;
        if (p.y > height) p.y = height - p.size;
        if (p.x < 0) p.x = p.size;
        if (p.y < 0) p.y = p.size;
      });
    };

    // Initialize with window's current size
    const initialWidth = window.innerWidth;
    const initialHeight = window.innerHeight;
    init(initialWidth, initialHeight);
    animate(); // Start animation loop

    // Set up window resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener("resize", handleResize); // Remove listener
    };
  }, [colorParticule]); // Add colorParticule dependency if Particle color needs to react to prop changes

  // Apply fixed positioning and z-index via inline style
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
    />
  );
}

// Export the animation component directly
export default function ParticulesBackground({ colorParticule }) {
  return <ParticleBackgroundAnimation colorParticule={colorParticule} />;
}
