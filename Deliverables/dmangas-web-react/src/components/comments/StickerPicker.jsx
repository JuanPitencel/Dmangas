import React, { useState, useEffect } from 'react';
import './StickerPicker.css';
import customStickers from './CustomStickers';

const StickerPicker = ({ onStickerSelect }) => {
  // Use a fixed profile
  const profile = 'nathanVanHove';

  // Get categories for the selected profile
  const categories = customStickers[profile];
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);

  // Get the stickers for the selected category
  const currentCategory = categories.find(category => category.id === selectedCategory);
  const stickers = currentCategory ? currentCategory.stickers : [];
  useEffect(() => {
    console.log('Stickers:', stickers);
  }, [stickers]);

  return (
    <div style={{ position: 'relative', backgroundColor: '#DDE2E5' }}>
      <div className="sticker-picker-buttons">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="sticker-picker">
        {stickers.map(sticker => (
          <img
            key={sticker.id}
            src={sticker.skins[0].src}
            alt={sticker.name}
            className="sticker"
            onClick={() => onStickerSelect(sticker)}
          />
        ))}
      </div>
    </div>
  );
};

export default StickerPicker;