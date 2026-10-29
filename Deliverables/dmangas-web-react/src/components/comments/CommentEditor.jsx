import React, { useState, useEffect, useRef } from "react";
import ReactQuill, {Quill} from "react-quill";
import "react-quill/dist/quill.snow.css";
import EmojiPicker from "./EmojiPicker";
import useEmojiInsertion from "../../hook/useEmojiInsertion";
import StickerPicker from "./StickerPicker";

// Define SpoilerBlot
const Inline = Quill.import('blots/inline');

class SpoilerBlot extends Inline {
  static create() {
    const node = super.create();
    node.setAttribute('class', 'spoiler');
    return node;
  }
  static formats(node) {
    return node.getAttribute('class') === 'spoiler';
  }
  format(name, value) {
    if (name === 'spoiler' && value) {
      this.domNode.setAttribute('class', 'spoiler');
    } else {
      this.domNode.removeAttribute('class');
    }
  }
}
SpoilerBlot.blotName = 'spoiler';
SpoilerBlot.tagName = 'span';
Quill.register(SpoilerBlot);

const CommentEditor = ({
  value,
  onChange,
  showStickerPickerId,
  handleStickerPickerClick,
  getRootProps,
  getInputProps,
  handleSubmit,
  handleCancel,
  handleDelete,
  isEditing = false,
  editorId,
  isReply = false,
  quillRef,
}) => {
  const [isSpoilerActive, setIsSpoilerActive] = useState(false);
  const [activeQuillRef, setActiveQuillRef] = useState(null);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const isStickerPickerVisible = showStickerPickerId === editorId;
  
  const {
    showCustomEmojiPicker,
    setShowCustomEmojiPicker,
    handleCustomEmojiSelect,
  } = useEmojiInsertion(quillRef);

  const handleEmojiClick = () => {
    setShowCustomEmojiPicker(!showCustomEmojiPicker);
  };

  const handleStickerSelect = (sticker) => {
    setSelectedSticker(sticker);
    handleStickerPickerClick(null); 
  };

  const handleSpoilerClick = (quillRef) => {
    setActiveQuillRef(quillRef);
    setIsSpoilerActive((prevState) => !prevState);
  };

  const applySpoilerFormat = (quillRef) => {
    const quill = quillRef.current.getEditor();
    const selection = quill.getSelection();

    if (selection) {
      const { index, length } = selection;

      if (length > 0) {
        quill.formatText(index, length, 'spoiler', isSpoilerActive);
      } else if (index > 0) {
        quill.formatText(index - 1, 1, 'spoiler', isSpoilerActive);
      }
    }
  };

  useEffect(() => {
    if (activeQuillRef) {
      applySpoilerFormat(activeQuillRef);
    }
  }, [isSpoilerActive, activeQuillRef]);

  useEffect(() => {
    if (showStickerPickerId === null && selectedSticker && quillRef.current) {
      const quill = quillRef.current.getEditor();
      if (quill) {
        const stickerSrc = selectedSticker.skins.length > 0 ? selectedSticker.skins[0].src : "";
        const stickerHTML = `<img src="${stickerSrc}" alt="${selectedSticker.name}" class="sticker-image" />`;

        let range = quill.getSelection();

        if (!range) {
          range = { index: quill.getLength(), length: 0 };
          quill.setSelection(range);
        }

        const position = range.index;

        if (position < 0 || position > quill.getLength()) {
          range = { index: quill.getLength(), length: 0 };
          quill.setSelection(range);
        } else {
          console.log('Valid position:', position);
        }

        quill.clipboard.dangerouslyPasteHTML(position, stickerHTML);

        setSelectedSticker(null);
      }
    }
  }, [showStickerPickerId, selectedSticker, editorId, quillRef]);

  return (
    <>
      {isStickerPickerVisible && (
        <StickerPicker onStickerSelect={handleStickerSelect} />
      )}
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={onChange}
        modules={CommentEditor.modules}
        formats={CommentEditor.formats}
      />
      <div className="button-container">
        <img
          src="/img/svg/icon_view.svg"
          alt="Spoiler Icon"
          onClick={() => handleSpoilerClick(quillRef)}
          className="spoiler-icon"
        />
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <img src="/img/svg/Image.svg" alt="Add Icon" className="dropzone-icon" />
        </div>
        <button
          className="sticker-button"
          onClick={() => handleStickerPickerClick(editorId)}
        >
        </button>
        <button className="emoji-button" onClick={handleEmojiClick}>
          😊
        </button>
        <div className="submit-edit-container">
          <button className="cancel-edit" onClick={handleCancel}>
            Cancel
          </button>
          <button onClick={handleSubmit}
            className={isEditing ? "save-edit" : (isReply ? "submit-comment" : "submit-comment")}
          >
            {isEditing ? "Save Changes" : (isReply ? "Reply" : "Comment")}
          </button>
          {isEditing && (
            <button
              className="eliminate-comment"
              onClick={handleDelete}
            >
              Delete comment
            </button>
          )}
        </div>
      </div>
      {/* Emoji Picker */}
      <EmojiPicker
        onEmojiSelect={handleCustomEmojiSelect}
        showCustomEmojiPicker={showCustomEmojiPicker}
        positionStyle={{ position: "absolute", bottom: "50px", right: "20px" }}
      />
    </>
  );
};

CommentEditor.modules = {
  toolbar: false, // Customize as needed
};

CommentEditor.formats = ['spoiler', 'image', 'bold', 'italic']; // Include the formats you need

export default CommentEditor;