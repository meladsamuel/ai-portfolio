import { useEffect, useState } from 'react';
import me from '@/assets/melad.webp'

export default function HeroAvatar() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 0.1);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Wave animation calculations
  const getWaveOffset = (index) => {
    const amplitude = 10; // Wave height
    const frequency = 1; // Wave frequency
    const phaseShift = index * 2; // Offset between circles

    return amplitude * Math.sin(frequency * time + phaseShift);
  };

  // Scale animation calculations
  const getScaleFactor = (index) => {
    const minScale = 0.8; // Minimum scale (80%)
    const maxScale = 1.2; // Maximum scale (120%)
    const scaleRange = maxScale - minScale;
    const frequency = 0.8; // Slightly different from wave frequency
    const phaseShift = index * 1.5; // Different offset for variety

    // Calculate scale between minScale and maxScale using sine wave
    return minScale + (scaleRange * 0.5 * (Math.sin(frequency * time + phaseShift) + 1));
  };

  return (
    <div className="flex items-center justify-center h-64 md:h-96 w-full">
      <div className="relative -z-10">
        {/* Extra Large circle */}
        <div 
          className="absolute rounded-full bg-gray-200/20 border-gray-300/20 border backdrop-blur-xs"
          style={{
            width: '360px',
            height: '360px',
            left: '-180px',
            top: `-180px`,
            transform: `translateY(${getWaveOffset(0)}px) scale(${getScaleFactor(0)})`,
            transition: 'transform 0.2s ease-in-out'
          }}
        />
        {/* Large circle */}
        <div 
          className="absolute rounded-full bg-gray-300/20 border-gray-300/20 border backdrop-blur-xs"
          style={{
            width: '340px',
            height: '340px',
            left: '-170px',
            top: `-170px`,
            transform: `translateY(${getWaveOffset(1)}px) scale(${getScaleFactor(1)})`,
            transition: 'transform 0.2s ease-in-out'
          }}
        />
        {/* Medium circle */}
        <div 
          className="absolute rounded-full bg-gray-300/20 border-gray-300/20 border backdrop-blur-xs"
          style={{
            width: '320px',
            height: '320px',
            left: '-160px',
            top: `-160px`,
            transform: `translateY(${getWaveOffset(2)}px) scale(${getScaleFactor(2)})`,
            transition: 'transform 0.2s ease-in-out'
          }}
        />
      </div>
      <div className="absolute p-2">
        <div className="aspect-square w-full max-w-64 md:max-w-80 bg-neutral-50/50 border-gray-300/30 border backdrop-blur-xs rounded-full shadow-2xl overflow-hidden" >
          <img className="size-full" src={me} alt="Melad Samuel" />
        </div>
      </div>
    </div>
  );
}
