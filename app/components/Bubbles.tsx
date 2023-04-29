import { useEffect, useState } from "react";

interface BubbleOptions {
  maxNumber: number,
  minNumber: number,
  maxSize: number,
  minSize: number
}

interface Bubble {
  id: number
  // The size of the bubble
  size: number
  // Where the bubble will start
  position: number
  // How long until the bubble will start rising
  delay: number
  // The speed of the bubble
  speed: number
  // The blur of the bubble
  blur: number
}

function FloatingBubble() {
  return (
    <div className="bubbles-container">
      {/* Bubbles will be added here */}
    </div>
  )
}

export default function Bubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  useEffect(() => {
    const minBubbleCount = 20
    const maxBubbleCount = 60
    const minBubbleSize = 3
    const maxBubbleSize = 8
    const bubbleCount = minBubbleCount + Math.floor(Math.random() * (maxBubbleCount + 1))
    const newBubbles = []
    for (let i = 0; i < bubbleCount; i++) {
      const pos_rand = Math.floor(Math.random() * 101);
      const size_rand = minBubbleCount + Math.floor(Math.random() * (maxBubbleCount + 15));
      const delay_rand = Math.floor(Math.random() * 16);
      const speed_rand = 3 + Math.floor(Math.random() * 9);
      const blur_rand = Math.floor(Math.random() * 3);
      newBubbles.push({
        id: i,
        position: pos_rand,
        size: size_rand,
        delay: delay_rand,
        speed: speed_rand,
        blur: blur_rand
      });
    }
    setBubbles(newBubbles)

  }, [])
  return (
    <>
      <div className="absolute w-full h-full top-0 left-0 -z-10 bg-blue-900">
        {bubbles.map(bubble => (
          <div
            key={bubble.id}
            className="absolute left-0 opacity-1 bottom-0 animate-bubble-rise"
            style={{
              left: `${bubble.position}%`,
              animationDuration: `${bubble.speed}s`,
              animationDelay: `${bubble.delay}s`,
            }}
          >
            <div
              className="w-[20px] h-[20px] rounded-full border border-solid bg-slate-200/25 border-slate-400 relative"
              style={{
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                filter: `blur(${bubble.blur}px)`,
              }}
            />
          </div>
        ))}
      </div >
    </>
  );
};