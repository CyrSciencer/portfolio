import { FC, useEffect, useRef } from "react";
import "./ParticulesBackground.css";

interface ParticulesBackgroundProps {
  colorParticule?: string;
}

const ParticulesBackground: FC<ParticulesBackgroundProps> = ({ colorParticule = "rgba(79, 79, 79, 0.5)" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Array of alchemical, mathematical and programming symbols
  const symbols = [
    // Alchemical and planetary symbols
    "☉", "☽", "☿", "♀", "♂", "♃", "♄", "♅", "♆", "♇",
    "⚉", "⚊", "⚋", "⚌", "⚍", "⚎", "⚏", "⚐", "⚑", "⚒",
    "⚔", "⚕", "⚖", "⚗", "⚘", "⚙", "⚚", "⚛", "⚜",
    "⚝", "⚞", "⚟", "⚠", "⚢", "⚣", "⚤", "⚥", "⚦",
    "⚧", "⚨", "⚩", "⚬", "⚭", "⚮", "⚯", "⚰",
    "⚱", "⚲", "⚳", "⚴", "⚵", "⚶", "⚷", "⚸", "⚹", "⚺",
    "⚻", "⚼", "⚿", "⛀", "⛁", "⛂", "⛃",
    
    // Mathematical symbols
    "∀", "∂", "∃", "∄", "∅", "∆", "∇", "∈", "∉", "∊",
    "∋", "∌", "∍", "∎", "∏", "∐", "∑", "−", "∓", "∔",
    "∕", "∖", "∗", "∘", "∙", "√", "∛", "∜", "∝", "∞",
    "∟", "∡", "∢", "∣", "∤", "∥", "∦", "∧", "∨", "∩",
    "∪", "∫", "∬", "∭", "∮", "∯", "∰", "∱", "∲", "∳",
    
    // Programming and technical symbols
    "⌘", "⌥", "⌦", "⌧", "⌨", "⌫", "⌬", "⌭", "⌮", "⌯",
    "⌰", "⌱", "⌲", "⌳", "⌴", "⌵", "⌶", "⌷", "⌸", "⌹",
    "⌺", "⌻", "⌼", "⌽", "⌾", "⌿", "⍀", "⍁", "⍂", "⍃",
    "⍄", "⍅", "⍆", "⍇", "⍈", "⍉", "⍊", "⍋", "⍌", "⍍",
    "⍎", "⍏", "⍐", "⍑", "⍒", "⍓", "⍔", "⍕", "⍖", "⍗",
    "⍘", "⍙", "⍚", "⍛", "⍜", "⍝", "⍞", "⍟", "⍠", "⍡",
    "⍢", "⍣", "⍤", "⍥", "⍦", "⍧", "⍨", "⍩", "⍪", "⍫",
    "⍬", "⍭", "⍮", "⍯", "⍰", "⍱", "⍲", "⍳", "⍴", "⍵",
    "⍶", "⍷", "⍸", "⍹", "⍺"
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle settings
    const particles: {
      x: number;
      y: number;
      size: number;
      speedY: number;
      symbol: string;
    }[] = [];
    const particleCount = 300;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 10,
        speedY: -(Math.random() * 1 + 0.5),
        symbol: symbols[Math.floor(Math.random() * symbols.length)]
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Update position
        particle.y += particle.speedY;

        // Reset particle if it goes off the top
        if (particle.y + particle.size < 0) {
          particle.y = canvas.height;
          particle.x = Math.random() * canvas.width;
          particle.symbol = symbols[Math.floor(Math.random() * symbols.length)];
        }

        // Draw particle as a symbol
        ctx.fillStyle = colorParticule;
        ctx.font = `${particle.size}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(particle.symbol, particle.x, particle.y);
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [colorParticule]);

  return <canvas ref={canvasRef} className="particules-background" />;
};

export default ParticulesBackground;