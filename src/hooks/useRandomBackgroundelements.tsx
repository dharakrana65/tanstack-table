import { useEffect, useState } from "react";


interface RandomElement {
  id: number;
  size: number;
  color: string;
  position: { x: number; y: number };
  animationDuration: number;
}

const generateRandomElements = (count: number): RandomElement[] => {
  const colors = [
    "rgba(255, 230, 22, 0.5)", 
    "rgba(22, 255, 230, 0.5)", 
    "rgba(230, 22, 255, 0.5)", 
    "rgba(22, 100, 255, 0.5)", 
  ];

  return Array.from({ length: count }, (_, id) => ({
    id,
    size: Math.floor(Math.random() * 150) + 50, // Random size between 50-200px
    color: colors[Math.floor(Math.random() * colors.length)], // Random color
    position: {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    },
    animationDuration: Math.random() * 10 + 5, // 5 to 15 seconds duration
  }));
};

const useRandomBackgroundElements = (count: number) => {
  const [elements, setElements] = useState(generateRandomElements(count));

  useEffect(() => {
    const updatePositions = () => {
      setElements((prevElements) =>
        prevElements.map((el) => ({
          ...el,
          position: {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          },
        }))
      );
    };

    const interval = setInterval(updatePositions, 5000); // Change positions every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return elements.map(({ id, size, color, position, animationDuration }) => (
    <div
      key={id}
      className="animated-bg-element"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        position: "absolute",
        borderRadius: "50%",
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: `transform ${animationDuration}s ease-in-out`,
      }}
    />
  ));
};

export default useRandomBackgroundElements;
