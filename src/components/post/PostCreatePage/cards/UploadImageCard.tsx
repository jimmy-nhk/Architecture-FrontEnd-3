import { Card, CardContent, Typography, FormControl, Button } from '@mui/material';
import * as React from 'react';

interface IUploadImageCardProps {
  coverUrl: string;
  updateCoverUrl: (arg: string) => void
}

const UploadImageCard: React.FC<IUploadImageCardProps> = ({ coverUrl, updateCoverUrl }) => {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Cover image
        </Typography>
        <FormControl>
        <label htmlFor="cover-image-upload">
          <input style={{display:"none"}} accept="image/*" id="cover-image-upload" multiple type="file" />
          <Button variant="contained" component="span">
            Upload
          </Button>
        </label>
        </FormControl>
      </CardContent>
    </Card>
  );
}

export default UploadImageCard;