import { Card, CardContent, Typography, FormControl, Button, TextField } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';


export default function UploadImageCard() {
  const [postTagline, setPostTagline] = React.useState<string>("")

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Cover image
        </Typography>
        <FormControl fullWidth>
        <label htmlFor="cover-image-upload">
          <input style={{display:"none"}} accept="image/*" id="cover-image-upload" multiple type="file" />
          <Button variant="contained" component="span">
            Upload
          </Button>
        </label>
        <TextField fullWidth 
          id="postTagline" 
          value={postTagline} 
          onChange={e => setPostTagline(e.target.value)} 
          label="New post tagline" variant="filled" />

        </FormControl>
      </CardContent>
    </Card>
  );
}