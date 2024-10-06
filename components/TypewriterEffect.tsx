import React, { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  text: string;
  typingSpeed: number;
  deletingSpeed: number;
  pauseDuration: number;
  loop?: boolean;
}

export const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  text,
  typingSpeed,
  deletingSpeed,
  pauseDuration,
  loop = false,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isTyping && !isPaused) {
      if (displayText.length < text.length) {
        timer = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        setIsPaused(true);
        timer = setTimeout(() => {
          setIsPaused(false);
          setIsTyping(false);
        }, pauseDuration);
      }
    } else if (!isTyping && !isPaused) {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deletingSpeed);
      } else if (loop) {
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isTyping, isPaused, text, typingSpeed, deletingSpeed, pauseDuration, loop]);

  return <span>{displayText}</span>;
};