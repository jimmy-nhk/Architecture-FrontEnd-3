import { Card, CardContent, Box, TextField } from '@mui/material';
import * as React from 'react';

export default function TitleAndContentCard() {
  return (
    <Card>
      <CardContent>
        <TextField fullWidth id="postTitle" label="New post title" variant="filled" />
        <Box sx={{ height: "500px", marginTop: "10px", border: "1px solid gray" }}>
          <p>Place the @mui rich text editor here</p>
        </Box>
      </CardContent>
    </Card>
  );
}