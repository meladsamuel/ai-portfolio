import { useState, useRef, useEffect } from 'react';

// The wrapper component for vertical resizing from the top
const VerticalResizable = ({ 
  initialHeight = 200,
  minHeight = 50,
  className = '',
  handleClassName = '',
  children
}) => {
  // Use a container with fixed positioning to handle top resizing properly
  const containerRef = useRef(null);
  const [height, setHeight] = useState(initialHeight);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(initialHeight);

  // Setup the element and position on initial render
  useEffect(() => {
    if (containerRef.current) {
      setHeight(initialHeight);
    }
  }, [initialHeight]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    if (containerRef.current) {
      setIsDragging(true);
      setStartY(e.clientY);
      setStartHeight(height);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    // Calculate the change in mouse position
    // For top handle: moving up (negative delta) should increase height
    const deltaY = startY - e.clientY;
    const newHeight = Math.max(minHeight, startHeight + deltaY);

    setHeight(newHeight);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startHeight, startY]);

  return (
    <div className="relative"> {/* Wrapper to maintain position context */}
      <div 
        ref={containerRef}
        className={`${className}`}
        style={{ 
          height: `${height}px`,
          position: 'relative',
          transformOrigin: 'bottom', // Scale from bottom up
        }}
      >
        {children}
        {/* Top resize handle */}
        <div
          className={handleClassName}
          style={{
            position: 'absolute',
            top: 0,
            cursor: 'ns-resize',
            zIndex: 10
          }}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
};
export default VerticalResizable;
