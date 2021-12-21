import React, { DragEvent, FormEvent, useState } from "react";
import { EventType } from "react-hook-form";

type CommentFormProps = {
  submitLabel: string;
  handleSubmit: (text: string, parentId: number) => void;
};
function CommentForm({ submitLabel, handleSubmit }: CommentFormProps) {
  const [text, setText] = useState("");
  const isTextareaDisable = text.length === 0 ;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleSubmit(text , 0);
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="comment-form-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="comment-form-button" disabled={isTextareaDisable}>{submitLabel}</button>
    </form>
  );
}

export default CommentForm;
