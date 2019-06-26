import { useState, useEffect } from 'react';
import * as Font from 'expo-font';

export type Fonts = Readonly<{ [fontName: string]: any }>;

export const useFonts = (fonts: Fonts) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync(fonts);

      setFontsLoaded(true);
    }

    loadFonts();
  }, [fonts]);

  return fontsLoaded;
};
