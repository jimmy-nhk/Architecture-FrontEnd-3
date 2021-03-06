import {Button, Card, CardContent, FormControl, Typography,TextField} from '@mui/material';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {initializeApp} from "firebase/app";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import tinymce from "tinymce/tinymce";

interface IUploadImageCardProps {
    coverUrl: string;
    updateCoverUrl: (arg: string) => void
}

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


const UploadImageCard: React.FC<IUploadImageCardProps> = ({coverUrl, updateCoverUrl}) => {
  const coverImageUploadHandler = async function (e: React.ChangeEvent<HTMLInputElement>) {
        console.log('coverImageUploadHandler');
        if (e.target.files !== null) {
            var file = e.target.files[0];
            // upload file to server
            uploadImage(file) //Promise here
                .then((url) => {
                    updateCoverUrl(url + "")
                });
        }
    };
    const [imageurl, setImageurl] = useState<string>("");
    useEffect(() => {
        setImageurl(coverUrl);
    }, [coverUrl]);
    return (
        <Card>
            <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Cover image
                </Typography>
                <img id="cover-image" src={imageurl} alt="" width="100%"/><br/>
                <FormControl>
                    <label htmlFor="cover-image-upload">

                        <input style={{display: "none"}} onChange={(e) => coverImageUploadHandler(e)}
                               onClick={() => console.log("AAA")} accept="image/*"
                               id="cover-image-upload" type="file"/>
                        <Button variant="contained" component={"span"}>
                            Upload
                        </Button>
                    </label>
                </FormControl>
            </CardContent>
        </Card>
    );
}

export default UploadImageCard;