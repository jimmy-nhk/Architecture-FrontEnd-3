import {
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import * as React from "react";
import TagsInput from "./TagsInput";

interface IMetadataCardProps {
  category: string;
  updatePostCategory: (arg: string) => void;
  tags: string[];
  updatePostTags: (arg: string[]) => void;
}

const MetadataCard: React.FC<IMetadataCardProps> = ({
  category,
  updatePostCategory,
  tags,
  updatePostTags,
}) => {
  const CATEGORIES = [
    "Engineering",
    "Computer Science",
    "Design",
    "Business",
    "Professional Communication",
  ];

  return (
    <Card sx={{ marginTop: "20px" }}>
      <CardContent style={{marginBottom: '6px', paddingBottom: '0px'}}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Metadata
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormControl fullWidth sx={{ marginTop: "10px" }}>
            <InputLabel id="category">Category</InputLabel>
            <Select
              labelId="category"
              id="demo-simple-select"
              label="Category"
              value={category}
              onChange={(e) => updatePostCategory(e.target.value)}
            >
              {CATEGORIES.map((category) => {
                return <MenuItem value={category}>{category}</MenuItem>;
              })}
              {/* {CATEGORIES.map((category, index) => {
              console.log((index + 1)*10)
              return (<MenuItem value={(index + 1)*10}>{category}</MenuItem>)
            })} */}
            </Select>
          </FormControl>
          <TagsInput 
            tags={tags}
            updatePostTags={updatePostTags}/>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MetadataCard;
