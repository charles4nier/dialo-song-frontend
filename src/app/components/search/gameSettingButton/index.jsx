import React from 'react';
import './style.scss'; // Import du fichier SCSS global

export default function GameSettingButton({ tag, onClick }) {
  const handleClick = () => {
    onClick(tag);
  };

  return (
    <button className="game-setting-button" onClick={handleClick}>
      <span>{tag}</span>
    </button>
  );
}
