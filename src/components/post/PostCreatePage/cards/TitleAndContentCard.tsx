import { Card, CardContent, Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import * as React from 'react';
import RichTextEditor from './RichTextEditor';

interface ITitleAndContentCardProps {

  title: string
  updatePostTitle: (arg: string) => void
  content: string
  updatePostContent: (arg: string) => void
}
const TitleAndContentCard: React.FC<ITitleAndContentCardProps> = ({ title, content, updatePostTitle, updatePostContent }) => {
  const [postTitle, setPostTitle] = useState<string>("")
  const [postContent, setPostContent] = useState<string>("")
  useEffect(() => {
    setPostTitle(title);
    setPostContent(content);
  }, [title,content])
  return (
    <Card>
      <CardContent>
        <TextField fullWidth id="postTitle" value={postTitle} onChange={e => updatePostTitle(e.target.value)} label="New post title" variant="filled" />
        <Box sx={{ height: "500px", marginTop: "10px", border: "1px solid gray", overflowY: "scroll" }}>
          <RichTextEditor content={postContent} updatePostContent={updatePostContent} />
        </Box>
      </CardContent>
    </Card>
  );
}
export default TitleAndContentCard;