import { TextField, IconButton, Button,InputAdornment } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import * as React from "react";
import {useEffect, useState} from "react";

interface ITagsInputProps {
  tags: string[];
  updatePostTags: (arg: string[]) => void;
}

const TagsInput: React.FC<ITagsInputProps> = ({ tags, updatePostTags }) => {
  const [input, setInput] = useState("");

  const removeTag = (i: number) => {
    const newTags = [...tags];
    newTags.splice(i, 1);

    updatePostTags(newTags);
  };

  const inputKeyDown = (e: any) => {
    const val = e.target.value.trim();
    if (e.key === "Enter" && val) {
        if (tags.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
            return;
        }
        updatePostTags([...tags, val]);
        setInput("")
    }
  };
    const  handleAddClick=(e:any)=>{
        const val = input.trim();

        if (tags.find((tag) => tag.toLowerCase() === val.toLowerCase()) || !val) {
            return;
        }
        updatePostTags([...tags, val]);
        setInput("")
    };
  return (
    <>
      <TextField
        sx={{ marginTop: "20px" }}
        label="Tags"
        variant="outlined"
        onKeyDown={inputKeyDown}
        value={input}
        onChange={e => setInput(e.target.value)}
        InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                    <Button  variant="contained" onClick={(e) => handleAddClick(e)}>
                        Add
                    </Button>
                </InputAdornment>
            ),
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
