import React, { useRef, useEffect } from "react";

function ParticleAnimation({ colorParticule }) {
  const canvasRef = useRef(null);
  const particlesArray = useRef([]);
  const animationFrameId = useRef(null);
  const numberOfParticles = 100;
  const currentDimensions = useRef({ width: 0, height: 0 }); // Store dimensions

  // Particle Class (nested or defined outside)
  class Particle {
    constructor(x, y, canvasWidth, canvasHeight, ctx) {
      this.x = x;
      this.y = y;
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.ctx = ctx;
      this.color = colorParticule; // Use the destructured prop
      this.size = 1.5; // Slightly larger for visibility
      this.resetPosition(true); // Initialize position and speed
    }

    // Method to reset particle to a border position with inward speed
    resetPosition(isInitial = false) {
      const edge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
      const padding = 10; // Start slightly away from the absolute edge

      switch (edge) {
        case 0: // Top edge
          this.x = Math.random() * this.canvasWidth;
          this.y = padding;
          break;
        case 1: // Right edge
          this.x = this.canvasWidth - padding;
          this.y = Math.random() * this.canvasHeight;
          break;
        case 2: // Bottom edge
          this.x = Math.random() * this.canvasWidth;
          this.y = this.canvasHeight - padding;
          break;
        case 3: // Left edge
          this.x = padding;
          this.y = Math.random() * this.canvasHeight;
          break;
      }

      // Set speed towards the center initially or after reset
      const centerX = this.canvasWidth / 2;
      const centerY = this.canvasHeight / 2;
      const dx = centerX - this.x;
      const dy = centerY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const initialSpeedMagnitude = 0.2; // Randomize initial speed slightly
      const tangentialFactor = 1 + Math.random() * 0.8; // Strong tangential component for orbit

      if (dist > 0) {
        // Calculate normalized direction vector (towards center)
        const normX = dx / dist;
        const normY = dy / dist;

        // Calculate initial speed components (mostly tangential)
        const inwardSpeed = initialSpeedMagnitude * 0.2; // Small initial push inwards
        const tangentialSpeed = initialSpeedMagnitude * tangentialFactor;

        // Tangential vector is perpendicular to inward vector (-normY, normX)
        this.speedX = normX * inwardSpeed - normY * tangentialSpeed;
        this.speedY = normY * inwardSpeed + normX * tangentialSpeed;
      } else {
        // If starting exactly at center (unlikely), give random initial speed
        this.speedX = (Math.random() - 0.5) * initialSpeedMagnitude;
        this.speedY = (Math.random() - 0.5) * initialSpeedMagnitude;
      }

      // Add slight outward push if not initial placement to avoid instant reset
      if (!isInitial && dist > 0) {
        const outwardPush = 0.1;
        this.x -= (dx / dist) * outwardPush;
        this.y -= (dy / dist) * outwardPush;
      }
    }

    update() {
      const centerX = this.canvasWidth / 2;
      const centerY = this.canvasHeight / 2;
      const dx = centerX - this.x;
      const dy = centerY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const centerThreshold = 7;

      // Check if near the center
      if (dist <= centerThreshold) {
        this.resetPosition();
        return; // Skip the rest of the update for this frame
      }

      if (dist > 0) {
        // Calculate gravitational acceleration towards center
        // Simple linear pull: stronger further away (less realistic, but stable)
        // const accelX = (dx / dist) * gravityFactor * dist * 0.1;
        // Inverse distance pull (more realistic, can get very fast near center):
        const pullStrength = 0.15; // Avoid extreme pull very close
        const accelX = (dx / dist) * pullStrength;
        const accelY = (dy / dist) * pullStrength;

        // Apply acceleration to velocity
        this.speedX += accelX;
        this.speedY += accelY;
      }

      // Apply velocity
      this.x += this.speedX;
      this.y += this.speedY;
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
    const container = canvas.parentElement; // Get the container div
    if (!container) return; // Exit if container not found immediately

    const ctx = canvas.getContext("2d");
    let observer;

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
      // ctx.fillStyle = "rgba(34, 34, 34, 0.2)"; // Use a fillStyle that allows seeing particles
      // ctx.fillRect(0, 0, width, height);
      particlesArray.current.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      animationFrameId.current = requestAnimationFrame(animate);
    };

    const handleResize = (entries) => {
      // Use contentRect for observed size
      const entry = entries[0];
      const { width, height } = entry.contentRect;

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

    // Initialize with container's current size
    const initialWidth = container.clientWidth;
    const initialHeight = container.clientHeight;
    init(initialWidth, initialHeight);
    animate(); // Start animation loop

    // Set up ResizeObserver
    observer = new ResizeObserver(handleResize);
    observer.observe(container);

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId.current);
      if (observer) {
        observer.disconnect(); // Disconnect observer
      }
    };
  }, []); // Empty dependency array ensures effect runs once on mount

  // Make canvas position relative/absolute to be contained by parent styling
  return <canvas ref={canvasRef} />;
}

// Rename the export to App to match main.jsx expectation
export default function Particules({ colorParticule }) {
  // Add a container div with specific dimensions and relative positioning
  return (
    <div className="particules-container">
      <ParticleAnimation colorParticule={colorParticule} />
    </div>
  );
}
