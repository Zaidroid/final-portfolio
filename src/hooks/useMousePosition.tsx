
import { useState, useEffect } from 'react';

export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isIdle, setIsIdle] = useState(true);

  useEffect(() => {
    let timeoutId: number;

    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setIsIdle(false);

      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setIsIdle(true);
      }, 1500);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return { ...position, isIdle };
};
