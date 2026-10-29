import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import customEmojis from "./CustomEmojis.js";

const EmojiPicker = ({ onEmojiSelect, showCustomEmojiPicker, positionStyle }) => {
  if (!showCustomEmojiPicker) return null;

  return (
    <Picker
      data={data}
      onEmojiSelect={onEmojiSelect}
      custom={customEmojis}
      style={positionStyle}
    />
  );
};

export default EmojiPicker;