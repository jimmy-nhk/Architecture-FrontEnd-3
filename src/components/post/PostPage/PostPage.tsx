import {Container} from "@mui/material";
import React, {useEffect, useState} from "react";
import DefaultLayout from "../../generic/layout/DefaultLayout";
import BodySection from "./BodySection";
import HeaderSection from "./HeaderSection";
import HeroSection from "./HeroSection";
import axios, {AxiosResponse} from "axios";
import Comments from "../../comment/Comments";

interface IPost {
    pid: number;
    title: string;
    tagline: string;
    bodyText: string;
    category: string;
    directors: string;
    coverUrl: string;
    likedCount: number;
    viewCount: number;
    tags: string;
}

const URL = "https://sead-back-postservice.herokuapp.com/";
const postId = 2;

const PostPage = () => {
    var post: IPost | undefined = undefined;
    const [postTitle, setPostTitle] = useState("");
    const [postTagline, setPostTagline] = useState("");
    const [postBody, setPostBody] = useState("");
    const [postCategory, setPostCategory] = useState("");
    const [postContributors, setPostContributors] = useState("");
    const [postCoverUrl, setPostCoverUrl] = useState("");
    const [postLikedCount, setPostLikedCount] = useState(0);
    const [postViewCount, setPostViewCount] = useState(0);
    const [postTags, setPostTags] = useState("");

    useEffect(() => {
        axios.get(URL + "post/" + postId).then((response: AxiosResponse) => {
            post = response.data as IPost;
            // console.log("fetch post=", post);
            setPostTitle(post.title);
            setPostTagline(post.tagline);
            setPostBody(post.bodyText);
            setPostCategory(post.category);
            setPostContributors(post.directors);
            setPostCoverUrl(post.coverUrl);
            setPostLikedCount(post.likedCount);
            setPostViewCount(post.viewCount);
            setPostTags(post.tags);
        });
    }, []);

    return (
        <DefaultLayout style={{backgroundColor: "white"}}>
            <>
                <HeroSection tagline={postTagline} coverUrl={postCoverUrl}/>
                <Container maxWidth="lg" sx={{margin: "100px auto"}}>
                    <HeaderSection
                        tags={postTags}
                        title={postTitle}
                        category={postCategory}
                        contributors={postContributors}
                        likedCount={postLikedCount}
                    />
                    <BodySection bodyText={postBody}/>
                </Container>
                <Comments currentUserId={1} postId={1}/>
            </>
        </DefaultLayout>
    );
};

export default PostPage;
