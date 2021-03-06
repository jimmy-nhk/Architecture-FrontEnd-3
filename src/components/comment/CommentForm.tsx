import { Button } from '@mui/material';
import React, { DragEvent, FormEvent, useState } from 'react';

import { TokenStorageService } from '../../app/service/token-storage.service';

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
    console.log("Handle submit");
    handleSubmit(text, 0);
    setText("");
    event.preventDefault();
  };

  return (
    <>
      <textarea
        className="comment-form-textarea"
        value={text}
        placeholder="Leave a comment..."
        onChange={(e) => setText(e.target.value)}
      />
      <br />

      {new TokenStorageService().getToken() && (
        <Button
          onClick={onSubmit}
          variant="contained"
          size="large"
          className="comment-form-button"
          disabled={isTextareaDisable}
          style={{marginRight: "10px"}}
        >
          Submit
        </Button>
      )}

      {hasCancelButton && (
        <Button
          variant="contained"
          size="large"
          className="comment-form-button comment-form-cancel-button"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      )}
    </>
  );
}

export default CommentForm;
