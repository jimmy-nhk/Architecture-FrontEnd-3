import { Avatar, Badge, Card, CardHeader, Container, FormControl, Grid, Pagination, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios, { AxiosResponse } from 'axios';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react';

import { AppConstants } from '../../../app/common/app.constants';
import { TokenStorageService } from '../../../app/service/token-storage.service';
import DefaultLayout from '../../generic/layout/DefaultLayout';
import Post from '../../post/postCard/Post';
import { PostClass } from '../../post/postContainer/PostContainer';

//Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDgrrJN3aVUu4zLjQ_go6cUtfcPAOyR0bE",
  authDomain: "sead-c470a.firebaseapp.com",
  databaseURL:
    "https://sead-c470a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sead-c470a",
  storageBucket: "sead-c470a.appspot.com",
  messagingSenderId: "431948638881",
  appId: "1:431948638881:web:6f352458ae3a211539dee0",
  measurementId: "G-B8TSFYDFVE",
};

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

export type User = {
  displayName: string;
  email: string;
  id: number;
  imageUrl: string;
  roles: string[]
};

function ProfilePage() {
  const PAGE_SIZE = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<PostClass[]>([]);
  const [imageUrl, setImageUrl] = useState<string>(
    "/static/images/avatar/2.jpg"
  );
  const [isDeleted, setIsDeleted] = useState(false)

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const storage = getStorage();
  const uploadImageToServer = async (file: File) => {
    return new Promise((resolve) => {
      console.log(`Uploading image ${file.name} ...`);
      setTimeout(() => {
        const spaceRef = ref(storage, `images/${file.name}`);

        const uploadTask = uploadBytesResumable(spaceRef, file);
        //
        //initiates the firebase side uploading
        uploadTask.on(
          "state_changed",
          (snapShot: any) => {
            //takes a snap shot of the process as it is happening
            console.log(snapShot);
          },
          (err: any) => {
            //catches the errors
            console.log(err);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
        console.log("Upload successful");
      }, 2000);
    });
  };

  const uploadImage = async (file: File) => {
    const url = await uploadImageToServer(file);
    if (!url) {
      return;
    }
    console.log("uploadImage");
    return url;
  };

  const USER_POSTS_FETCH_API = AppConstants.POST_URL;

  const getPosts = (pageNo: number, pageSize: number) => {
    try {
      console.log("userId: ",user?.id)
      if(user !== null){
        var userId = user!.id;
        console.log("userId: ",userId)
  
        console.log("path: " ,  `${USER_POSTS_FETCH_API}` +
        `getPost/userId=${userId}/pageNo=${pageNo}&pageSize=${pageSize}&sortBy=id`)
        axios
          .get(
            `${USER_POSTS_FETCH_API}` +
              `getPost/userId=${userId}/pageNo=${pageNo}&pageSize=${pageSize}&sortBy=id`
          )
          .then((response: AxiosResponse) => {
            setTotalPages(response.data.totalPages);
            setPosts(response.data.content);
            console.log(response);
          })
          .catch((e) => console.log(e));
      }

    } catch (error) {
      console.log(error);
    }
  };

  // get user
  useEffect(() => {
    console.log(new TokenStorageService().getUser().id);

    setUser({
      id: new TokenStorageService().getUser().id,
      email: new TokenStorageService().getUser().email,
      imageUrl: new TokenStorageService().getUser().imageUrl,
      displayName: new TokenStorageService().getUser().displayName,
      roles: new TokenStorageService().getUser().roles
    });
    // Set profile photo
    setImageUrl(new TokenStorageService().getUser().imageUrl)
  }, []);

  useEffect(() => {
    // getUser() // please pass user id in
    // console.log("user=", user);
    getPosts(0, PAGE_SIZE);
  }, [user]);

  useEffect(() => {
    
    console.log("isDeleted", isDeleted)
    if(!isDeleted)
      return;

    getPosts(page - 1, PAGE_SIZE);

    setIsDeleted(false)
  }, [page, isDeleted ]);

  const coverImageUploadHandler = async function (
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    console.log("coverImageUploadHandler");
    if (e.target.files !== null) {
      var file = e.target.files[0];
      // upload file to server
      uploadImage(file) //Promise here
        .then((url) => {
          var updateUser = {
            id: Number(user?.id),
            displayName: user?.displayName,
            email: user?.email,
            imageUrl: url,
          };

          setImageUrl(url + "");

          axios
            .put("http://localhost:8085/crud/updateUser", updateUser)
            .then((res: AxiosResponse) => {
              var storageUser = {
                id: Number(user?.id),
                displayName: user?.displayName,
                email: user?.email,
                imageUrl: url,
                roles: user?.roles
              }

              new TokenStorageService().saveUser(storageUser);
              console.log("storageUser=", new TokenStorageService().getUser());
            })
            .catch((e) => {
              console.log("put error=", e);
            });
        });
    }
  };

  return (
    <DefaultLayout style={{ backgroundColor: "#f3f3f4" }}>
      <Container maxWidth="lg" sx={{ padding: "6.5rem 0", margin: "0 auto" }}>
        <Card sx={{ marginTop: "3rem" }}>
          <CardHeader
            avatar={
              <Stack direction="row" spacing={2}>
                <FormControl>
                  <label htmlFor="cover-image-upload">
                    <input
                      style={{ display: "none" }}
                      onChange={(e) => coverImageUploadHandler(e)}
                      accept="image/*"
                      id="cover-image-upload"
                      type="file"
                    />
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      badgeContent={
                        <SmallAvatar
                          alt="Change Profile Picture"
                          src={
                            "https://firebasestorage.googleapis.com/v0/b/sead-c470a.appspot.com/o/icons%2F271214630_606617177300066_6516707039279016194_n.png?alt=media&token=87c8a84f-b90c-4ce0-ac3f-d6eaeb72b6c8"
                          }
                          sx={{ width: "30px", height: "30px" }}
                        />
                      }
                      sx={{ cursor: "pointer" }}
                    >
                      <Avatar
                        alt="Travis Howard"
                        src={imageUrl}
                        sx={{ width: "60px", height: "60px" }}
                      />
                    </Badge>
                  </label>
                </FormControl>
              </Stack>
            }
            title={user?.displayName}
            subheader={user?.email}
          />
        </Card>
        <Grid
          // rowSpacing={4}
          // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ backgroundColor: "#B8B8B8", padding: "10px" }}
          className="posts"
          direction="row"
          container
        >
          {!posts ? (
            <p>Loading...</p>
          ) : (
            posts.map((post) => (
              <Grid item xs={12} md={6} key={post.id} sx={{ padding: "6px" }}>
                  <Post key={post.id} post={post} userId={user?.id} isProfilePage={true} setIsDeleted={setIsDeleted}/>
              </Grid>
            ))
          )}
        </Grid>
        <Pagination
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "0px auto 20px auto",
          }}
          count={totalPages}
          page={page}
          showFirstButton
          showLastButton
          onChange={(e: any, value: number) => setPage(value)}
        />
      </Container>
    </DefaultLayout>
  );
}

export default ProfilePage;
