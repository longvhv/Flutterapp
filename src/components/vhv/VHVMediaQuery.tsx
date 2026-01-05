import React, { createContext, useContext, useState, useEffect } from 'react';

export interface VHVMediaQueryData {
  size: {
    width: number;
    height: number;
  };
  devicePixelRatio: number;
  textScaleFactor: number;
  platformBrightness: 'light' | 'dark';
  padding: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  viewInsets: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

const MediaQueryContext = createContext<VHVMediaQueryData | null>(null);

export const useMediaQuery = () => {
  const context = useContext(MediaQueryContext);
  if (!context) {
    throw new Error('useMediaQuery must be used within VHVMediaQuery');
  }
  return context;
};

interface VHVMediaQueryProps {
  children: React.ReactNode;
  data?: Partial<VHVMediaQueryData>;
}

export const VHVMediaQuery: React.FC<VHVMediaQueryProps> = ({ children, data: customData }) => {
  const [mediaData, setMediaData] = useState<VHVMediaQueryData>(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    return {
      size: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      devicePixelRatio: window.devicePixelRatio || 1,
      textScaleFactor: 1,
      platformBrightness: isDark ? 'dark' : 'light',
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      viewInsets: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      ...customData,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      setMediaData((prev) => ({
        ...prev,
        size: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
      }));
    };

    const handleColorSchemeChange = (e: MediaQueryListEvent) => {
      setMediaData((prev) => ({
        ...prev,
        platformBrightness: e.matches ? 'dark' : 'light',
      }));
    };

    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    window.addEventListener('resize', handleResize);
    darkModeQuery.addEventListener('change', handleColorSchemeChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      darkModeQuery.removeEventListener('change', handleColorSchemeChange);
    };
  }, []);

  return (
    <MediaQueryContext.Provider value={mediaData}>
      {children}
    </MediaQueryContext.Provider>
  );
};

// MediaQuery.of helper
export const MediaQueryOf = {
  of: (context: React.Context<VHVMediaQueryData | null>) => {
    const data = useContext(context);
    if (!data) {
      throw new Error('MediaQuery.of must be used within VHVMediaQuery');
    }
    return data;
  },
};
