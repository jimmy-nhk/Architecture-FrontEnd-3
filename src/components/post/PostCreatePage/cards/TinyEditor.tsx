import React from "react";
import {initializeApp} from "firebase/app";
import {getDownloadURL, getStorage, ref, uploadBytesResumable,} from "firebase/storage";
import tinymce from "tinymce/tinymce";

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

interface IRichTextEditorProps {
    content: string;
    updatePostContent: (arg: string) => void;
}

type TUploadImageData = {
    file?: File;
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
                        console.log("File available at", downloadURL);
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

const TinyEditor: React.FC<IRichTextEditorProps> = ({
                                                        content,
                                                        updatePostContent,
                                                    }) => {
    //Firebase helper
    const handleFireBaseUpload = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("start of upload");
        // async magic goes here...
    };

    tinymce.remove();  
    tinymce.init({
        selector: "#tinyEditor",
        placeholder: "Enter your post content here...",
        statusbar: false,
        height: "500",
        content_style: "body {  }",
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen textcolor ",
            "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
            "undo redo | styleselect | fontsizeselect | image code | bold italic underline | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist",
        image_title: true,
        file_picker_types: "image",
        convert_urls: false,
        async: true,

        file_picker_callback: function (cb, value, meta) {
            var input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");

            input.onchange = async function () {
                if (input.files !== null) {
                    var file = input.files[0];
                    var reader = new FileReader();
                    reader.onload = await async function () {
                        var id = "blobid" + new Date().getTime();
                        var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                        // @ts-ignore
                        var base64 = reader.result.split(",")[1];
                        var blobInfo = blobCache.create(id, file, base64);
                        blobCache.add(blobInfo);

                        //upload file to server
                        uploadImage(file) //Promise here
                            .then((url) => {
                                console.log("url", url);
                                cb(url, {title: file.name});
                            });
                    };
                    await reader.readAsDataURL(file);
                }
            };
            input.click();
        },
        setup: function (ed: any) {
            ed.on("change", function (e: any) {
                 updatePostContent(ed.getContent({ format: "raw" }));
            });
            ed.on("keyup", function (e: any) {
                updatePostContent(ed.getContent({ format: "raw" }));
            });
            ed.on("copy", function (e: any) {
                updatePostContent(ed.getContent({ format: "raw" }));
            });
            ed.on("paste", function (e: any) {
                updatePostContent(ed.getContent({ format: "raw" }));
            });
            ed.on("cut", function (e: any) {
                updatePostContent(ed.getContent({ format: "raw" }));
            });
        },
    });

    return (
        <div>
            <textarea id="tinyEditor"></textarea>
        </div>
    );
};
export default TinyEditor;
