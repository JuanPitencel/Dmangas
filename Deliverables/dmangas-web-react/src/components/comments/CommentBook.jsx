import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";
import {parseISO, differenceInHours, differenceInMinutes,differenceInDays} from "date-fns";
import "./CommentBox.css";
import EndpointCore from "../../pages/Global.jsx";
import useAuth from "../../hook/useAuth.js";
import StarRating from "./StarRating";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import CommentEditor from "./CommentEditor";
import ReportDropdown from "../report-dropdown/ReportDropdown";

const CommentBook = ({ libroData, onCommentCountChange }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newCommentImage, setNewCommentImage] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const [showReplyStickerPicker, setShowReplyStickerPicker] = useState(false);
  const [selectedCommentIndex, setSelectedCommentIndex] = useState(null);
  const [selectedReplyIndex, setSelectedReplyIndex] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyImage, setReplyImage] = useState([]);
  const [sortBy, setSortBy] = useState("top");
  const [selectedEditComment, setSelectedEditComment] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [selectedEditReply, setSelectedEditReply] = useState(null);
  const [selectedNestedEditReply, setSelectedNestedEditReply] = useState(null);
  const [editedCommentImages, setEditCommentImages] = useState([]);
  const [editedReplyImages, setEditReplyImages] = useState([]);
  const [editNestedReplyImages, setEditNestedReplyImages] = useState([]);
  const [rating, setRating] = useState(null);
  const [showStickerPickerId, setShowStickerPickerId] = useState(null);
  const [showReportDropdown, setShowReportDropdown] = useState(false);
  const [showReplyReportDropdown, setShowReplyReportDropdown] = useState(false);
  const [showNestedReplyReportDropdown, setShowNestedReplyReportDropdown] = useState(false);

  const commentRef = useRef(null);
  const replyRef = useRef(null);
  const nestedReplyRef = useRef(null);
  const { groupCode: groupId, code: bookId,} = libroData;
  const { auth } = useAuth();
  const userName = auth.user_name;
  const avatarId = auth.avatar_id || 1;
  const userId = auth.id;
  const userLogedInn = localStorage.getItem("token");

  // Dropzone configuration for comment images
  const {
    getRootProps: getCommentRootProps,
    getInputProps: getCommentInputProps,
  } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.slice(0, 2);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewCommentImage((prevImages) => [
            ...(prevImages || []),
            reader.result,
          ]);
        };
        reader.readAsDataURL(file);
      });
    },
  });

  // Dropzone configuration for reply images
  const {
    getRootProps: getReplyRootProps,
    getInputProps: getReplyInputProps
  } = useDropzone({
      accept: "image/*",
      onDrop: (acceptedFiles) => {
        const files = acceptedFiles.slice(0, 2);
        files.forEach((file) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setReplyImage((prevImages) => [
              ...(prevImages || []),
              reader.result,
            ]);
          };
          reader.readAsDataURL(file);
        });
      },
    });

    // Dropzone configuration for comment edit images
    const {
      getRootProps: getEditCommentRootProps,
      getInputProps: getEditCommentInputProps,
    } = useDropzone({
      accept: "image/*",
      onDrop: (acceptedFiles) => {
        const files = acceptedFiles.slice(0, 2);
        files.forEach((file) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setEditCommentImages((prevImages) => [
              ...(prevImages || []),
              reader.result,
            ]);
          };
          reader.readAsDataURL(file);
        });
      },
    });
    // Dropzone configuration for reply edit images
    const {
      getRootProps: getEditReplyRootProps,
      getInputProps: getEditReplyInputProps,
    } = useDropzone({
      accept: "image/*",
      onDrop: (acceptedFiles) => {
        const files = acceptedFiles.slice(0, 2);
        files.forEach((file) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setEditReplyImages((prevImages) => [
              ...(prevImages || []),
              reader.result,
            ]);
          };
          reader.readAsDataURL(file);
        });
      },
    });
    // Dropzone configuration for nested reply images
    const {
      getRootProps: getEditNestedReplyRootProps,
      getInputProps: getEditNestedReplyInputProps,
    } = useDropzone({
      accept: "image/*",
      onDrop: (acceptedFiles) => {
        const files = acceptedFiles.slice(0, 2);
        files.forEach((file) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setEditNestedReplyImages((prevImages) => [
              ...(prevImages || []),
              reader.result,
            ]);
          };
          reader.readAsDataURL(file);
        });
      },
    });
    useEffect(() => {
      if (selectedEditComment) {
        setEditCommentImages(selectedEditComment.images || []);
      }
    }, [selectedEditComment]);

    useEffect(() => {
      if (selectedEditReply) {
        setEditReplyImages(selectedEditReply.images || []);
      }
    }, [selectedEditReply]);

    useEffect(() => {
      if (selectedNestedEditReply) {
        setEditNestedReplyImages(selectedNestedEditReply.images || []);
      }
    }, [selectedNestedEditReply]);

    useEffect(() => {
      if (bookId) {
        const fetchBookComments = async () => {
          try {
            const response = await fetch(EndpointCore.getBookComments(bookId), {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (!response.ok) {
              throw new Error("Error fetching comments");
            }

            const data = await response.json();
            setComments(data);
          } catch (error) {
            console.error("Error fetching comments:", error);
          }
        };

        fetchBookComments();
      }
    }, [bookId]);

    useEffect(() => {
      // Calculates the number of comments and replies
      const totalCount = countCommentsAndReplies(comments);
      // Calls the parent function to pass up the total
      onCommentCountChange(totalCount);
    }, [comments, onCommentCountChange]);

    const submitComment = async () => {
      try {
        const response = await fetch(EndpointCore.createBookComment, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            user_name: userName,
            text: newComment,
            images: newCommentImage,  // Keep the images in base64
            group_id: groupId,
            book_id: bookId,
            user_avatar_id: avatarId,
            book_rating: rating,
          }),
        });

        if (response.ok) {
          // The mock backend always echoes back the same canned comment
          // regardless of what was submitted, so build the new comment from
          // what was actually typed instead of the response body.
          const newCommentId = `local-${Date.now()}`;
          const newFormattedComment = {
            _id: newCommentId,
            comment_id: newCommentId,
            comment_book_id: newCommentId,
            user_name: userName,
            text: newComment,
            images: newCommentImage,  // Keep the base64 images already sent
            group_id: groupId,
            book_id: bookId,
            user_avatar_id: avatarId,
            book_rating: rating,
            replies: [], // Needed before this comment can be replied to
            likes_count: 0,
            updated_at: new Date().toISOString(),
          };

          // Update the comments state with the new comment and its base64 image
          setComments([...comments, newFormattedComment]);

          // Clear the new comment state and its image
          setNewComment("");
          setNewCommentImage([]);
          setRating(null);
        } else {
          const errorData = await response.json();
          console.error("Error submitting comment:", errorData);
        }
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    };

  const handleAddComment = () => {
    console.log("Rating value:", rating); // Check the rating value

    if (newComment.trim() !== "") {
      if (rating !== null) {
        submitComment();
      } else {
        toastr.error("You must leave a rating when posting a comment");
      }
    }
  };

  const handleStickerPickerClick = (editorId) => {
    setShowStickerPickerId(prevId => prevId === editorId ? null : editorId);
  };
  const handleAddReply = (commentIndex, replyIndex = null) => {
    if (replyText.trim() !== "") {
      const commentId = comments[commentIndex].comment_book_id;
      const commentUser = comments[commentIndex].user_name;
      const parentReplyId = replyIndex !== null ? comments[commentIndex].replies[replyIndex]._id : null; // Get the _id of the nested reply
      submitReply(commentId, parentReplyId, commentUser);
    }
  };

  const handleReplyToReply = (commentIndex, replyIndex) => {
    setSelectedCommentIndex(commentIndex); // Set the index of the parent comment
    setSelectedReplyIndex(replyIndex); // Set the index of the nested reply
  };

  const submitReply = async (commentId, parentReplyId = null, commentUser) => {
    try {
      // Build the request body
      const body = {
        user_name: userName,
        text: `@${commentUser}&nbsp; ${replyText}`,
        images: replyImage,  // Keep the images in base64
        group_id: groupId,
        book_id: bookId,
        user_avatar_id: avatarId,
        parent_reply_id: parentReplyId, // Add the parent reply ID if there is one
      };

      const response = await fetch(EndpointCore.createBookReply(commentId), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const newReplyId = `local-${Date.now()}`;
        const newFormattedReply = {
          _id: newReplyId,
          comment_id: newReplyId,
          user_name: userName,
          text: `@${commentUser}&nbsp; ${replyText}`,
          images: replyImage,  // Base64 images from the payload
          group_id: groupId,
          book_id: bookId,
          user_avatar_id: avatarId,
          parent_reply_id: parentReplyId,  // Parent reply ID if there is one
          replies: [], // Needed before this reply can be replied to
          likes_count: 0,
          updated_at: new Date().toISOString(), // Add the date so it doesn't break.
        };
        // Update the comments state
        setComments((prevComments) => {
          return prevComments.map((comment) => {
            if (comment.comment_book_id === commentId) {
              // If it's a reply to another reply, update the correct reply
              if (parentReplyId) {
                return {
                  ...comment,
                  replies: comment.replies.map((reply) =>
                    reply._id === parentReplyId
                      ? { ...reply, replies: [...reply.replies, newFormattedReply] }
                      : reply
                  ),
                };
              }
              // If it's a direct reply to the comment, add the reply to the comment
              return {
                ...comment,
                replies: [...comment.replies, newFormattedReply],
              };
            }
            return comment;
          });
        });

        setReplyText("");
        setReplyImage([]);
        setSelectedCommentIndex(null);
        setSelectedReplyIndex(null); // Reset the selected reply index
      } else {
        const errorData = await response.json();
        console.error("Error submitting reply:", errorData);
      }
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  const sortedComments = comments.sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.created_at) - new Date(a.created_at);
    } else if (sortBy === "top") {
      return 0;
    }
    return 0;
  });
  console.log("SORTED COMMENTS", sortedComments)

  const handleLike = async (commentId, replyId = null) => {
    try {
      const response = await fetch(EndpointCore.addBookCommentLike(commentId, replyId), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          commentId,
          replyId
        }),
      });
        if (response.ok) {
        setComments(prevComments =>
          prevComments.map(comment => {
            if (comment.comment_book_id === commentId) {
              if (replyId) {
                return {
                  ...comment,
                  replies: comment.replies.map(reply =>
                    reply._id === replyId
                      ? { ...reply, likes_count: (reply.likes_count + 1 || 0) }
                      : reply
                  )
                };
              } else {
                return { ...comment, likes_count: (comment.likes_count + 1 || 0) };
              }
            }
            return comment;
          })
        );
      } else {
        console.error('Error adding like');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getCustomTimeAgo = (updatedAt) => {
    const now = new Date();
    const parsedDate = parseISO(updatedAt);

    const daysDifference = differenceInDays(now, parsedDate);
    const hoursDifference = differenceInHours(now, parsedDate);
    const minutesDifference = differenceInMinutes(now, parsedDate);

    if (daysDifference > 0) {
      return `${daysDifference} days ago`;
    } else if (hoursDifference > 0) {
      return `${hoursDifference} hours ago`;
    } else {
      return `${minutesDifference} minutes ago`;
    }
  };

 const handleEditClick = (comment) => {
    setSelectedEditComment(comment);
    setEditedContent(comment.text);
  };
 const handleEditReply = (reply)=> {
    setSelectedEditReply(reply);
    setEditedContent(reply.text);
    setReplyImage(reply.images || []);
  }

  const handleEditNestedReply = (nestedReply) => {
  setSelectedNestedEditReply(nestedReply);
  setEditedContent(nestedReply.text);
  setReplyImage(nestedReply.images || []);
};
  const handleCancel = () => {
    setNewComment("");
    setNewCommentImage([]);
    setShowStickerPicker(false);
    setShowEmojiPicker(false);
  };
  const handleCancelReply = () => {
    setReplyText("");
    setShowReplyStickerPicker(false);
    setShowEmojiPicker(false);
    setSelectedCommentIndex(null);
  };
  const handleCancelEdit = () => {
    setSelectedEditComment(null);
    setSelectedEditReply(null);
    setSelectedNestedEditReply(null);
    setEditedContent("");
  }
  const handleRemoveImage = (index, isReply = false, isNestedReply = false) => {
    console.log('Removing image at index:', index, 'Is Reply:', isReply, 'Is Nested Reply:', isNestedReply);

    if (isNestedReply) {
      setEditNestedReplyImages((prevImages) => {
        const newImages = prevImages.filter((_, i) => i !== index);
        return newImages;
      });
    } else if (isReply) {
      setEditReplyImages((prevImages) => {
        const newImages = prevImages.filter((_, i) => i !== index);
        return newImages;
      });
    } else {
      setEditCommentImages((prevImages) => {
        const newImages = prevImages.filter((_, i) => i !== index);
        return newImages;
      });
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(EndpointCore.deleteBookComment(commentId), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error deleting comment');
      }

      setComments((prevComments) => prevComments.filter(comment => comment.comment_book_id !== commentId));

      console.log('Comment deleted successfully');
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  }
  const handleDeleteReply = async (commentId, replyId) => {
    try {
      const response = await fetch(EndpointCore.deleteBookReply(commentId, replyId), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error deleting reply');
      }

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.comment_book_id === commentId
            ? {
                ...comment,
                replies: comment.replies.filter((reply) => reply._id !== replyId),
              }
            : comment
        )
      );
      console.log('Reply marked as deleted');
    } catch (error) {
      console.error('Error deleting reply:', error);
    }
  };

  const handleDeleteNestedReply = async (commentId, replyId, nestedReplyId) => {
    try {
      const response = await fetch(EndpointCore.deleteNestedBookReply(commentId, replyId, nestedReplyId), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

    if (response.ok) {
      setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.comment_book_id === Number(commentId)
          ? {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply._id === replyId
                  ? {
                      ...reply,
                      replies: reply.replies.filter(
                        (nestedReply) => nestedReply._id !== nestedReplyId
                      ),
                    }
                  : reply
              ),
            }
          : comment
      )
    );
}else {
        const errorData = await response.json();
        console.error('Error deleting nested reply:', errorData);
      }
    } catch (error) {
      console.error('Error in the delete request:', error);
    }
  };

  const submitEditComment = async (commentId, updatedContent, updatedImages) => {
    try {
      const response = await fetch(EndpointCore.editBookComment(commentId), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          text: updatedContent,
          images: updatedImages,
        }),
      });

      if (response.ok) {
        // Build the updated comment using the payload data + updated_at
        const updatedComment = {
          comment_book_id: commentId, // Keep the comment ID
          text: updatedContent,
          images: updatedImages,
          updated_at: new Date().toISOString(), // Add the updated_at field with the current date
        };

        // Update the frontend state
        setComments(prevComments => {
          return prevComments.map(comment =>
            comment.comment_book_id === commentId ? { ...comment, ...updatedComment } : comment
          );
        });

        // Clear the editor state
        setEditedContent("");
        setEditCommentImages([]);
        setSelectedEditComment(null); // Reset the comment selected for editing
      } else {
        const errorData = await response.json();
        console.error('Error editing comment:', errorData);
      }
    } catch (error) {
      console.error('Error in the edit request:', error);
    }
  };

  const handleSaveCommentEdit = () => {
    if (selectedEditComment) {
      submitEditComment(selectedEditComment.comment_book_id, editedContent, editedCommentImages);
    }
  };
  const submitEditReply = async (commentId, replyId, updatedContent, updatedImages) => {
    try {
      const response = await fetch(EndpointCore.editBookReply(replyId), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          text: updatedContent,
          images: updatedImages,
          commentId: commentId, // Associate the reply with the corresponding comment
        }),
      });

      if (response.ok) {
        const updatedReply = {
          text: updatedContent,
          images: updatedImages,
          commentId: commentId,
          replyId: replyId,
          updated_at: new Date().toISOString(),
        };

        // Update the frontend state by replacing the comment and the edited reply
        setComments(prevComments =>
          prevComments.map(comment => {
            if (comment.comment_book_id === updatedReply.commentId) {
              // Find the reply in the replies array and replace it
              const updatedReplies = comment.replies.map(reply =>
                reply._id === updatedReply.replyId ? updatedReply : reply
              );
              // Return the updated comment with the new replies
              return { ...comment, replies: updatedReplies };
            }
            return comment; // Return the comment unchanged if the commentId doesn't match
          })
        );

        // Clear the editor state
        setEditedContent("");
        setEditReplyImages([]);
        setSelectedEditReply(null); // Reset the reply selected for editing
      } else {
        const errorData = await response.json();
        console.error('Error editing reply:', errorData);
      }
    } catch (error) {
      console.error('Error in the edit request:', error);
    }
  };

const handleSaveReplyEdit = () => {
  if (selectedEditReply) {
    submitEditReply(selectedEditReply.comment_book_id, selectedEditReply._id, editedContent, editedReplyImages);
  }
};

const submitEditNestedReply = async (commentId, replyId, nestedReplyId, updatedContent, updatedImages) => {
  try {
    const response = await fetch(EndpointCore.editNestedBookReply(commentId, replyId, nestedReplyId), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        text: updatedContent,
        images: updatedImages,
      }),
    });

    if (response.ok) {
      // Update the comments state directly
      setComments(prevComments =>
        prevComments.map(comment => {
          // Check the type and match between comment_book_id and commentId
          console.log('Current comment:', comment.comment_book_id, ' - Type:', typeof comment.comment_book_id);
          console.log('Given commentId:', commentId, ' - Type:', typeof commentId);

          // Force the conversion to number or string so the comparison is correct
          if (String(comment.comment_book_id) === String(commentId)) { // Make sure both are the same type
            console.log('First match: comment found.');
            return {
              ...comment,
              replies: comment.replies.map(reply => {
                // Find the correct reply
                if (String(reply._id) === String(replyId)) {
                  console.log('Second match: reply found.');
                  return {
                    ...reply,
                    replies: reply.replies.map(nestedReply => {
                      // Find the correct nestedReply
                      if (String(nestedReply._id) === String(nestedReplyId)) {
                        console.log('Third match: nested reply found.');
                        // Return the new nestedReply with the updated data
                        return {
                          ...nestedReply,
                          text: updatedContent,
                          images: updatedImages,
                          updated_at: new Date().toISOString(), // Add the update date
                        };
                      }
                      return nestedReply; // Return the nestedReply unchanged if it doesn't match
                    }),
                  };
                }
                return reply; // Return the reply unchanged if it doesn't match
              }),
            };
          }
          return comment; // Return the comment unchanged if it doesn't match
        })
      );

      // Clear the editor state
      setEditedContent("");
      setEditNestedReplyImages([]);
      setSelectedNestedEditReply(null);
    } else {
      const errorData = await response.json();
      console.error('Error editing nested reply:', errorData);
    }
  } catch (error) {
    console.error('Error in the edit request:', error);
  }
};


const handleSaveNestedReplyEdit = (commentId, replyId, nestedReplyId) => {
    submitEditNestedReply(
      commentId,
      replyId,
      nestedReplyId,
      editedContent,
      editNestedReplyImages
    );
};

const handleReportDropdownClick = () => {
  setShowReportDropdown(!showReportDropdown);
};
const handleReportReplyDropdownClick = () => {
  setShowReplyReportDropdown(!showReplyReportDropdown);
};

const handleReportNestedReplyDropdownClick = ()=>{
  setShowNestedReplyReportDropdown(!showNestedReplyReportDropdown);
}
const closeDropdown =()=>{
  setShowReportDropdown(false);
  setShowReplyReportDropdown(false);
  setShowNestedReplyReportDropdown(false);
}
const countCommentsAndReplies = (comments) => {
  return comments.reduce((total, comment) => {
    // Count the top-level comment
    let count = 1;

    // If the comment has replies, count the nested replies recursively
    if (comment.replies) {
      count += countCommentsAndReplies(comment.replies);
    }

    return total + count;
  }, 0);
};


  return (
    <div className="comment-box">
    <div className="comment-header">
      <div className="w-full top">
        <div className="left-a">
        {countCommentsAndReplies(comments)} comments

        </div>
        <div className="right-a">
          <span
            className={sortBy === "top" ? "active" : ""}
            onClick={() => setSortBy("top")}
          >
            Top
          </span>{" "}
          |
          <span
            style={{ marginLeft: '5px' }}
            className={sortBy === "recent" ? "active" : ""}
            onClick={() => setSortBy("recent")}
          >
            Recent
          </span>
        </div>
      </div>
      {!userLogedInn && (
        <div className="w-full alerta">
          <div className="alerta-gris">
            <img src="img/internal/book_detail/bell-small.png" alt="" />
            <span>Please sign in to leave a comment</span>
          </div>
        </div>
      )}
    </div>
    {userLogedInn && (
      <>
        <div className="calification-container">
          <img
            src="/img/svg/catAvatar.svg"
            alt="avatar"
            className="cat-avatar"
          />
          <span>This book's rating is:</span>
          <StarRating totalStars={5} rating={rating} onRatingChange={handleRatingChange} />
        </div>
        <div className="comment-form">
          <CommentEditor
            editorId="newCommentEditor"
            value={newComment}
            onChange={setNewComment}
            getRootProps={getCommentRootProps}
            getInputProps={getCommentInputProps}
            handleSubmit={handleAddComment}
            handleCancel={handleCancel}
            showStickerPickerId={showStickerPickerId}
            handleStickerPickerClick={handleStickerPickerClick}
            quillRef={commentRef}
          />
          {newCommentImage.length > 0 && (
            <div className="images-preview">
              {newCommentImage.map((image, index) => (
                <img key={index} src={image} alt={`Selected ${index}`} />
              ))}
            </div>
          )}
        </div>
      </>
    )}
      <div className="comments-list">
        {sortedComments.map((comment, index) => (
          <div key={index} className="comment">
            <div className="comment-section">
            <div className="comment-header">
              <div style={{ display: "flex" }}>
                <img
                  src={
                    comment.user?.avatar ||
                    "/img/login/avatar-selected/avatar5.png"
                  }
                  alt="Avatar"
                  className="avatar"
                />
                <div className="comment-header-info">
                  <span className="username">
                    {comment?.user_name || "Anonymous"}
                  </span>
                  <span className="rating">
                    <div className="rating-container">
                      <img
                        src="/img/svg/icon_star_purple.svg"
                        alt="star icon"
                        className="star-icon"
                      />
                      <span className="average-rating">{comment?.book_rating || 0}</span>
                      <span className="total-comments">
                        ({comment?.likes_count || 0})
                      </span>
                    </div>
                  </span>
                </div>
                <div className="detalle-comentarios">
                {userLogedInn && userId === comment.user_id && (
                  <img
                  src="/img/svg/Edit.svg"
                  alt="Edit Icon"
                  className="edit-icon"
                  onClick={() => handleEditClick(comment)}
                  />
                )}
                  <span>{getCustomTimeAgo(comment.updated_at)}</span>
                </div>
              </div>
            </div>
            {selectedEditComment && selectedEditComment.comment_book_id === comment.comment_book_id ? (
  <>
    <div className="editor-container">
      <CommentEditor
        editorId={"editCommentEditor"}
        value={editedContent || comment.text}
        onChange={setEditedContent}
        getRootProps={getEditCommentRootProps}
        getInputProps={getEditCommentInputProps}
        handleSubmit={handleSaveCommentEdit}
        handleCancel={handleCancelEdit}
        isEditing= {true}
        handleDelete={() => handleDeleteComment(selectedEditComment.comment_book_id)} // Pass the delete function
        showStickerPickerId={showStickerPickerId}
        handleStickerPickerClick={handleStickerPickerClick}
        quillRef={commentRef}
      />
      {/* Render the uploaded images */}
      {editedCommentImages.length > 0 && (
        <div className="images-preview">
          {editedCommentImages.map((image, index) => (
            <div key={index} className="image-container">
              <img src={image} alt={`Uploaded ${index}`} />
              <img src={'/img/svg/trash-grey.svg'} alt='trash' className="trash-icon" onClick={() => handleRemoveImage(index)} />
            </div>
          ))}
        </div>
      )}
    </div>
  </>
) : (
  // Render the comment in read-only mode when not being edited
  <ReactQuill
    value={comment.text}
    readOnly={true}
    theme={"bubble"}
    className="react-quill-readonly"
  />
)}
{!(selectedEditComment && selectedEditComment.comment_id === comment.comment_id) && comment.images?.length > 0 && (
  <div className="images-preview">
    {comment.images.map((image, index) => (
      <div className="comment-image-container" key={index}>
        <img src={image} alt={`Comment Image ${index}`} />

      </div>
    ))}
  </div>
)}

            {userLogedInn && (
              <div>
                <div className="button-group">
                <button onClick={() => handleLike(comment.comment_book_id)}>
                    <img
                      src="/img/internal/button/footer2/like.svg"
                      alt="Like icon"
                      className="button-icon"
                    />
                  </button>
                  <button
                    onClick={() => setSelectedCommentIndex(index)}
                    className="responder-reportar"
                  >
                    Reply
                  </button>
                  <span className="responder-reportar">|</span>
                  <button  className="responder-reportar" onClick={handleReportDropdownClick}>
                    Report
                  </button>
                </div>
                { showReportDropdown &&
                <ReportDropdown
                isComment={true}
                user_id={userId}
                entity_id={comment.comment_book_id}
                notification_type={'BOOK_COMMENT'}
                closeDropdown={closeDropdown}/>}
              </div>
            )}

            </div>
            <div className="reply-section">
  {selectedCommentIndex === index && (
      <>
      <div className="comment-form">
        <CommentEditor
          value={replyText}
          onChange={setReplyText}
          showStickerPickerId={showStickerPickerId}
          handleStickerPickerClick={handleStickerPickerClick}
          getRootProps={getReplyRootProps}
          getInputProps={getReplyInputProps}
          handleSubmit={() => {
            if (selectedReplyIndex !== null) {
              handleAddReply(index, selectedReplyIndex);
            } else {
              handleAddReply(index);
            }
          }}
          handleCancel={handleCancelReply}
          isEditing={false}
          editorId={'replyEditorId'}
          isReply={true} // Mark as a reply
          quillRef={replyRef}

        />
          {replyImage.length > 0 && (
          <div className="images-preview">
            {replyImage.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Selected ${index}`}
              />
            ))}
             </div>
          )}
      </div>
    </>
  )}
  {comment.replies?.map((reply, replyIndex) => (
    <div key={replyIndex} className="reply comment-header">
      <div style={{ display: "flex" }}>
        <img
          src={reply?.avatar || "/img/login/avatar-selected/avatar1.png"}
          alt="Avatar"
          className="avatar"
        />
        <div className="comment-header-info">
          <span className="username">
            {reply?.user_name || "Anonymous"}
          </span>
          <span className="rating">
            <div className="rating-container">
              <img
                src="/img/svg/icon_star_purple.svg"
                alt="star icon"
                className="star-icon"
              />
              <span className="average-rating">4.3</span>
              <span className="total-comments">
                ({reply?.likes_count || 0})
              </span>
            </div>
          </span>
        </div>
        <div className="detalle-comentarios">
        {userLogedInn && userId === reply.user_id && (
          <img
            src="/img/svg/Edit.svg"
            alt="Edit Icon"
            className="edit-icon"
            onClick={() => handleEditReply(reply)} // Click handler
          />
        )}
          <span>{getCustomTimeAgo(reply.updated_at)}</span>
        </div>
      </div>
      {selectedEditReply && selectedEditReply._id === reply._id ? (
  <div className="reply-editor">
  <CommentEditor
  editorId={"editReplyEditorId"} // Adjust the editor ID as needed
  value={editedContent || reply.text}
  onChange={setEditedContent}
  getRootProps={getEditReplyRootProps} // Make sure to pass this function correctly
  getInputProps={getEditReplyInputProps} // Make sure to pass this function correctly
  handleSubmit={handleSaveReplyEdit}
  handleCancel={handleCancelEdit}
  handleDelete={() => handleDeleteReply(reply.comment_book_id, reply._id)} // Pass the delete function
  showStickerPickerId={showStickerPickerId}// Adjust the ID as needed
  handleStickerPickerClick={handleStickerPickerClick} // Pass the function to toggle the sticker picker
  images={editedReplyImages} // Images while editing the reply
  onRemoveImage={handleRemoveImage}
  isReply={true}
  isEditing={true}
  quillRef={replyRef}
/>
 {editedReplyImages?.length > 0 && (
  <div className="images-preview">
    {editedReplyImages.map((image, index) => (
      <div className="comment-image-container" key={index}>
        <img src={image} alt={`Reply Image ${index}`} />
        <img src={'/img/svg/trash-grey.svg'} alt='trash' className="trash-icon"
        onClick={()=>handleRemoveImage(index, true)} />
      </div>
    ))}
  </div>
)}
</div>
)  : (
        <>
          <ReactQuill
            value={reply.text}
            readOnly={true}
            theme={"bubble"}
            className="react-quill-readonly"
          />
          {(!selectedEditReply || selectedEditReply._id !== reply._id) && reply.images?.length > 0 && (
            <div className="images-preview">
              {reply.images.map((image, index) => (
                <div className="comment-image-container" key={index}>
                  <img src={image} alt={`Reply Image ${index}`} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
     {userLogedInn && (
      <div>
      <div className="button-group">
        <button onClick={() => handleLike(reply.comment_book_id , reply._id)}>
          <img
            src="/img/internal/button/footer2/like.svg"
            alt="Like icon"
            className="button-icon"
          />
        </button>
        <button
         onClick={() => handleReplyToReply(index, replyIndex)}
         className="responder-reportar"
        >
          Reply
        </button>
        <span className="responder-reportar">|</span>
        <button
          onClick={handleReportReplyDropdownClick}
          className="responder-reportar"
        >
          Report
        </button>
      </div>
       { showReplyReportDropdown &&
        <ReportDropdown
        isComment={true}
        user_id={userId}
        entity_id={reply._id}
        comment_id={reply.comment_book_id}
        notification_type={'BOOK_COMMENT'}
        closeDropdown={closeDropdown}/>}
        </div>
     )}
 {/* Render nested replies if there are any */}
{reply.replies?.length > 0 && (
      <div className="nested-replies">
        {reply.replies.map((nestedReply, nestedReplyIndex) => (
          <div key={nestedReplyIndex} className="nested-reply comment-header">
            <div style={{ display: "flex" }}>
              <img
                src={nestedReply?.avatar || "/img/login/avatar-selected/avatar1.png"}
                alt="Avatar"
                className="avatar"
              />
              <div className="comment-header-info">
                <span className="username">
                  {nestedReply?.user_name || "Anonymous"}
                </span>
                <span className="rating">
                  <div className="rating-container">
                    <img
                      src="/img/svg/icon_star_purple.svg"
                      alt="star icon"
                      className="star-icon"
                    />
                    <span className="average-rating">{nestedReply?.book_rating || 0}</span>
                    <span className="total-comments">
                      ({nestedReply?.likes_count || 0})
                    </span>
                  </div>
                </span>
              </div>
              <div className="detalle-comentarios">
              {userLogedInn && userId === nestedReply.user_id && (
              <img
                    src="/img/svg/Edit.svg"
                    alt="Edit Icon"
                    className="edit-icon"
                    onClick={() => handleEditNestedReply(nestedReply)}
                  />
              )}
                <span>{getCustomTimeAgo(nestedReply .updated_at)}</span>
              </div>
            </div>

        {selectedNestedEditReply && selectedNestedEditReply._id === nestedReply._id ? (
        <div className="editor-container">
        <CommentEditor
          value={editedContent}
          onChange={setEditedContent}
          showStickerPickerId={showStickerPickerId} // Make sure to pass the correct state
          handleStickerPickerClick={handleStickerPickerClick} // Pass the function directly
          handleSubmit={() => handleSaveNestedReplyEdit(nestedReply.comment_book_id, reply._id, nestedReply._id)}
          handleCancel={handleCancelEdit}
          handleDelete={() => handleDeleteNestedReply(nestedReply.comment_book_id, reply._id, nestedReply._id)}
          editorId={"nestedReplyEditorId"}
          isReply={true}
          isEditing={true}
          getRootProps={getEditNestedReplyRootProps}
          getInputProps={getEditNestedReplyInputProps}
          editNestedReplyImages={editNestedReplyImages}
          handleRemoveImage={handleRemoveImage}
          quillRef={nestedReplyRef}
          />

        {editNestedReplyImages?.length > 0 && (
          <div className="images-preview">
            {editNestedReplyImages.map((image, index) => (
              <div className="comment-image-container" key={index}>
                <img src={image} alt={`Reply Image ${index}`} />
                <img src={'/img/svg/trash-grey.svg'} alt='trash' className="trash-icon" onClick={() => handleRemoveImage(index, false, true)} />
              </div>
            ))}
          </div>
        )}
      </div>
    ) :  (
            <>
            <ReactQuill
              value={nestedReply.text}
              readOnly={true}
              theme={"bubble"}
              className="react-quill-readonly"
            />

            {nestedReply.images?.length > 0 && (
              <div className="images-preview">
                {nestedReply.images.map((image, index) => (
                  <div key={index} className="comment-image-container">
                    <img src={image} alt={`Nested Reply Image ${index}`} />
                  </div>
                ))}
              </div>

            )}
            </>

            )
          }
          {userLogedInn && (
      <div>
      <div className="button-group">
        <button onClick={() => handleLike(reply.comment_book_id, reply._id)}>
          <img
            src="/img/internal/button/footer2/like.svg"
            alt="Like icon"
            className="button-icon"
          />
        </button>

        <span className="responder-reportar">|</span>
        <button
          onClick={handleReportNestedReplyDropdownClick}
          className="responder-reportar"
        >
          Report
        </button>
      </div>
         { showNestedReplyReportDropdown &&
          <ReportDropdown
          isComment={true}
          user_id={userId}
          entity_id={nestedReply._id}
          comment_id={nestedReply.comment_book_id}
          reply_id={reply._id}
          notification_type={'BOOK_COMMENT'}
          closeDropdown={closeDropdown}/>}
          </div>
      )}

          </div>
        ))}
      </div>
    )}
    </div>
  ))}
</div>

</div>
        ))}
      </div>

    </div>
  );
};

export default CommentBook
