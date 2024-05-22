import React, { ReactNode, createContext, useContext, useState } from 'react';

// Tipos de fontes disponíveis
type FontType = 'Nunito_700Bold' | 'Pacifico_400Regular';

interface FontContextProps {
  font: FontType;
  isUpperCase: boolean;
  setFont: (font: FontType) => void;
  setIsUpperCase: (isUpperCase: boolean) => void;
}

const FontContext = createContext<FontContextProps | undefined>(undefined);

export const FontProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [font, setFont] = useState<FontType>('Nunito_700Bold');
  const [isUpperCase, setIsUpperCase] = useState<boolean>(true);

  return (
    <FontContext.Provider value={{ font, isUpperCase, setFont, setIsUpperCase }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = (): FontContextProps => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
};
