import React, { ReactNode, createContext, useContext, useState } from 'react';

// Tipos de fontes disponíveis
type FontType = 'Nunito_700Bold' | 'DancingScript_700Bold';

interface FontContextProps {
  font: FontType;
  setFont: (font: FontType) => void;
}

const FontContext = createContext<FontContextProps | undefined>(undefined);

export const FontProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [font, setFont] = useState<FontType>('Nunito_700Bold');

  return <FontContext.Provider value={{ font, setFont }}>{children}</FontContext.Provider>;
};

export const useFont = (): FontContextProps => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
};
