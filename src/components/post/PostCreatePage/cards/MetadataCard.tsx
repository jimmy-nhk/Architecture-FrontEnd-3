import { Card, CardContent, Typography, Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import * as React from 'react';
import TagsInput from './TagsInput';

export default function MetadataCard() {
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
            <MenuItem value={10}>Category 1</MenuItem>
            <MenuItem value={20}>Category 2</MenuItem>
            <MenuItem value={30}>Category 3</MenuItem>
          </Select>
        </FormControl>
        <TagsInput />
      </Box>
      </CardContent>
    </Card>
  );
}