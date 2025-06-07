import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Fonction améliorée pour calculer la luminosité d'une couleur
const getLuminance = (hex: string) => {
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  // Formule WCAG 2.0 pour le calcul de la luminosité relative
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const palettes = [
  {
    colors: ['#692e88', '#8c9cf2', '#1d1903'],
  },
  {
    colors: ['#21add4', '#17072b', '#145c80'],
  },
];

interface ColorContextType {
  activePalette: number;
  updatePalette: (index: number) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider = ({ children }: { children: ReactNode }) => {
  const [activePalette, setActivePalette] = useState(0);

  const updatePalette = (index: number) => {
    const root = document.documentElement;
    const palette = palettes[index];

    // Définir les couleurs principales
    root.style.setProperty('--primary', palette.colors[0]);
    root.style.setProperty('--secondary', palette.colors[1]);
    root.style.setProperty('--accent', palette.colors[2]);

    // Calculer et définir les couleurs de texte en fonction de la luminosité
    const primaryLuminance = getLuminance(palette.colors[0]);
    const secondaryLuminance = getLuminance(palette.colors[1]);
    const accentLuminance = getLuminance(palette.colors[2]);

    // Définir les couleurs de texte avec un seuil ajusté pour les couleurs vives
    const getTextColor = (luminance: number) => {
      // Ajuster le seuil pour les couleurs vives
      const threshold = 0.3; // Seuil plus bas pour mieux gérer les couleurs vives
      return luminance > threshold ? '#000000' : '#ffffff';
    };

    root.style.setProperty('--text-primary', getTextColor(primaryLuminance));
    root.style.setProperty('--text-secondary', getTextColor(secondaryLuminance));
    root.style.setProperty('--text-accent', getTextColor(accentLuminance));

    // Ajouter des variables pour les contrastes
    root.style.setProperty('--text-on-primary', getTextColor(primaryLuminance));
    root.style.setProperty('--text-on-secondary', getTextColor(secondaryLuminance));
    root.style.setProperty('--text-on-accent', getTextColor(accentLuminance));

    setActivePalette(index);
  };

  useEffect(() => {
    // Sélection aléatoire d'une palette au chargement
    const randomPalette = Math.floor(Math.random() * palettes.length);
    updatePalette(randomPalette);
  }, []);

  return (
    <ColorContext.Provider value={{ activePalette, updatePalette }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error('useColor must be used within a ColorProvider');
  }
  return context;
};
