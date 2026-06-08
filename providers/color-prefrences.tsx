'use client'

import { useEffect, useState, createContext, useContext, FC, ReactNode } from "react";

type Colors = 'blue' | 'green' | '';

type ColorPrefrencesContext = {
    color: Colors;
    selectColor: (color: Colors) => void;
};

const ColorPrefrencesContext = createContext<ColorPrefrencesContext | undefined>(undefined);

export const useColorPreferences = () => {
    const context = useContext(ColorPrefrencesContext);

    if (!context) {
        throw new Error(
            'useColorPreferences must be used within ColorPrefrencesProvider'
        );
    }

    return context;
};

export const ColorPrefrencesPrrovider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [color, setColor] = useState<Colors>('');

    useEffect(() => {
        const storedColor = localStorage.getItem('selectedColor') as Colors | null;

        if (storedColor) {
            setColor(storedColor);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('selectedColor', color);
    }, [color]);

    const selectColor = (selectedColor: Colors) => {
        setColor(selectedColor);
    };

    return (
        <ColorPrefrencesContext.Provider
            value={{
                color,
                selectColor,
            }}
        >
            {children}
        </ColorPrefrencesContext.Provider>
    );
};