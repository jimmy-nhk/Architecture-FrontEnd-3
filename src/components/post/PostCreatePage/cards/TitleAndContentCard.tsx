import {Box, Card, CardContent, TextField} from '@mui/material';
import * as React from 'react';
import {useEffect, useState} from 'react';
import TinyEditor from './TinyEditor'

interface ITitleAndContentCardProps {
    title: string
    updatePostTitle: (arg: string) => void
    content: string
    updatePostContent: (arg: string) => void
    tagline: string
    updatePostTagline: (arg: string) => void
}

const TitleAndContentCard: React.FC<ITitleAndContentCardProps> = ({title, content, tagline, updatePostTitle, updatePostContent,updatePostTagline}) => {
    const [postTitle, setPostTitle] = useState<string>("")
    const [postContent, setPostContent] = useState<string>("")
    const [postTagline, setPostTagline] = React.useState<string>("")

    useEffect(() => {
        setPostTitle(title);
        setPostContent(content);
        setPostTagline(tagline);
    }, [title, content,tagline])
    return (
        <Card>
            <CardContent>
                <TextField fullWidth id="postTitle" value={postTitle} onChange={e => updatePostTitle(e.target.value)}
                           label="New post title" variant="filled"/>
                <TextField fullWidth
                           id="postTagline"
                           value={postTagline}
                           onChange={e => updatePostTagline(e.target.value)}
                           label="New post tagline" variant="filled"/>
                <Box sx={{height: "500px", marginTop: "10px", border: "1px solid gray"}}>
                    <TinyEditor content={postContent} updatePostContent={updatePostContent}/>
                </Box>
            </CardContent>
        </Card>
    );
}
export default TitleAndContentCard;