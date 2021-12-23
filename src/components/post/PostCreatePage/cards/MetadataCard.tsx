import { Card, CardContent, Typography, Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import * as React from 'react';
import TagsInput from './TagsInput';

export default function MetadataCard() {
  const CATEGORIES = ['Engineering', 'Computer Science', 'Design', 'Business', 'Professional Communication']

  return (
    <Card sx={{ marginTop: "20px" }}>
      <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Metadata
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: "column" }}>
        <FormControl fullWidth sx={{ marginTop: "10px" }}>
          <InputLabel id="category">Category</InputLabel>
          <Select
            labelId="category"
            id="demo-simple-select"
            label="Category"
          >
            {CATEGORIES.map((category, index) => {
              console.log((index + 1)*10)
              return (<MenuItem value={(index + 1)*10}>{category}</MenuItem>)
            })}
          </Select>
        </FormControl>
        <TagsInput />
      </Box>
      </CardContent>
    </Card>
  );
}