import React from 'react';

interface HighlightFirstLetterProps {
  text: string;
}

const HighlightFirstLetter: React.FC<HighlightFirstLetterProps> = ({ text }) => {
  if (!text) return null;
  
  const firstLetter = text.charAt(0);
  const restOfText = text.slice(1);

  return (
    <span>
      <span style={{ color: 'red' }}>{firstLetter}</span>
      {restOfText}
    </span>
  );
};

export default HighlightFirstLetter; 