import { TextField, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import * as React from "react";
import { useState } from "react";

interface ITagsInputProps {
  tags: string[];
  updatePostTags: (arg: string[]) => void;
}

const TagsInput: React.FC<ITagsInputProps> = ({ tags, updatePostTags }) => {
  const [refs, setRefs] = useState("");

  const removeTag = (i: number) => {
    const newTags = [...tags];
    newTags.splice(i, 1);

    updatePostTags(newTags);
  };

  const inputKeyDown = (e: any) => {
    const val = e.target.value;
    if (e.key === "Enter" && val) {
      if (tags.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      updatePostTags([...tags, val.trim()]);
      setRefs("null");
    }
    // else if (e.key === "Backspace" && !val) {
    //   removeTag(tags.length - 1);
    // }
  };

  return (
    <>
      <TextField
        sx={{ marginTop: "20px" }}
        label="Tags"
        variant="outlined"
        onKeyDown={inputKeyDown}
        inputRef={(c) => {
          setRefs(c);
        }}
      />
      <ul
        style={{
          display: "inline-flex",
          flexWrap: "wrap",
          padding: "0px",
        }}
      >
        {tags.map((tag, i) => (
          <li
            key={tag}
            style={{
              background: "#00000014",
              margin: "5px 5px 0px 5px",
              padding: "8px 8px 8px 12px",
              color: "#000000DE",
              fontStyle: 'none',
              alignItems: "center",
              borderRadius: "30px",
              display: "inline-flex",
              fontFamily: "Arial, sans-serif"
            }}
          >
            {tag}
            <IconButton
              aria-label="delete"
              style={{ padding: "2px" }}
              onClick={() => {
                removeTag(i);
              }}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TagsInput;
