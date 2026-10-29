import { useState } from 'react';

const useEmojiInsertion = (quillRef) => {
  const [showCustomEmojiPicker, setShowCustomEmojiPicker] = useState(false);

  const handleCustomEmojiSelect = (emoji) => {
    const quill = quillRef.current.getEditor();
    let range = quill.getSelection();

    if (!range) {
      range = { index: quill.getLength(), length: 0 };
    }

    if (emoji.native) {
      quill.insertText(range.index, emoji.native);
    } else if (emoji.src) {
      const emojiHTML = `<img src="${emoji.src}" alt="${emoji.name}" class="custom-emoji" />`;
      quill.clipboard.dangerouslyPasteHTML(range.index, emojiHTML);
    }

    setShowCustomEmojiPicker(false);
  };

  return {
    showCustomEmojiPicker,
    setShowCustomEmojiPicker,
    handleCustomEmojiSelect,
  };
};

export default useEmojiInsertion;