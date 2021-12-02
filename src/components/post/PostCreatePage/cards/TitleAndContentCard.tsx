import { Card, CardContent, Box, TextField } from '@mui/material';
import * as React from 'react';
import RichTextEditor from './RichTextEditor';

export default function TitleAndContentCard() {
  return (
    <Card>
      <CardContent>
        <TextField fullWidth id="postTitle" label="New post title" variant="filled" />
        <Box sx={{ height: "500px", marginTop: "10px", border: "1px solid gray" ,overflowY: "scroll"}}>
          <RichTextEditor/>
        </Box>
      </CardContent>
    </Card>
  );
}