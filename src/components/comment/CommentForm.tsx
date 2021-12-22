import React, { DragEvent, FormEvent, useState } from "react";
import { EventType } from "react-hook-form";

type CommentFormProps = {
  submitLabel: string;
  handleSubmit: (text: string, parentId: number) => void;
  hasCancelButton: true | false;
  initialText: string;
  handleCancel: () => void;
};
function CommentForm({
  submitLabel,
  handleSubmit,
  hasCancelButton,
  initialText,
  handleCancel,
}: CommentFormProps) {
  const [text, setText] = useState(initialText);
  const isTextareaDisable = text.length === 0;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleSubmit(text, 0);
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="comment-form-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="comment-form-button" disabled={isTextareaDisable}>
        {submitLabel}
      </button>

      {hasCancelButton && (
              <button className="comment-form-button comment-form-cancel-button" onClick={handleCancel}>
              Cancel
            </button>
      )}
    </form>
  );
}

export default CommentForm;
