// import React, { useState } from 'react';
// import { createTheme, ThemeProvider } from '@mui/material/styles'
// import MUIRichTextEditor from 'mui-rte'

import React, { useRef, useState, FunctionComponent, useEffect } from "react";
import MUIRichTextEditor, {
  TMUIRichTextEditorRef,
  TAsyncAtomicBlockResponse,
} from "mui-rte";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import BackupIcon from "@mui/icons-material/Backup";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { convertToRaw } from "draft-js";
import { useForm, Controller } from "react-hook-form";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage,ref,uploadBytesResumable, getDownloadURL  } from "firebase/storage";

//Firebase config 
const firebaseConfig = {
  apiKey: "AIzaSyDgrrJN3aVUu4zLjQ_go6cUtfcPAOyR0bE",
  authDomain: "sead-c470a.firebaseapp.com",
  databaseURL: "https://sead-c470a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sead-c470a",
  storageBucket: "sead-c470a.appspot.com",
  messagingSenderId: "431948638881",
  appId: "1:431948638881:web:6f352458ae3a211539dee0",
  measurementId: "G-B8TSFYDFVE"
};

interface IUploadImagePopoverProps {
  anchor: TAnchor;
  onSubmit: (data: TUploadImageData, insert: boolean) => void;

}

interface IRichTextEditorProps {
  content: string
  updatePostContent: (arg: string) => void
}

type TUploadImagePopoverState = {
  anchor: TAnchor;
  isCancelled: boolean;
};

type TUploadImageData = {
  file?: File;
};

type TAnchor = HTMLElement | null;

const cardPopverStyles = makeStyles({
  root: {
    padding: 10,
    maxWidth: 350,
  },
  textField: {
    width: "100%",
  },
  input: {
    display: "none",
  },
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();
const uploadImageToServer = (file: File) => {
  return new Promise((resolve) => {
    console.log(`Uploading image ${file.name} ...`);
    setTimeout(() => {
      const spaceRef = ref(storage, `images/${file.name}`);

      const uploadTask = uploadBytesResumable(spaceRef, file);
      //
      //initiates the firebase side uploading 
      uploadTask.on('state_changed',
        (snapShot: any) => {
          //takes a snap shot of the process as it is happening
          console.log(snapShot)
        }, (err: any) => {
          //catches the errors
          console.log(err)
        }, () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            resolve(downloadURL);
          }); 
        })
      console.log("Upload successful");

    }, 2000);
  });
};

const uploadImage = (file: File) => {
  return new Promise<TAsyncAtomicBlockResponse>(async (resolve, reject) => {
    const url = await uploadImageToServer(file);
    if (!url) {
      reject();
      return;
    }
    resolve({
      data: {
        url: url,
        width: 300,
        height: 200,
        alignment: "left", // or "center", "right"
        type: "image", // or "video"
      },
    });
  });
};

const UploadImagePopover: FunctionComponent<IUploadImagePopoverProps> = (
  props
) => {
  const classes = cardPopverStyles(props);
  const [state, setState] = useState<TUploadImagePopoverState>({
    anchor: null,
    isCancelled: false,
  });
  const [data, setData] = useState<TUploadImageData>({});

  useEffect(() => {
    setState({
      anchor: props.anchor,
      isCancelled: false,
    });
    setData({
      file: undefined,
    });
  }, [props.anchor]);

  return (
    <Popover
      anchorEl={state.anchor}
      open={state.anchor !== null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={10}>
          <TextField
            className={classes.textField}
            disabled
            value={data.file?.name || ""}
            placeholder="Click icon to attach image"
          />
        </Grid>
        <Grid item xs={2}>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            type="file"
            onChange={(event) => {
              setData({
                ...data,
                file: event.target.files![0],
              });
            }}
          />
          <label htmlFor="contained-button-file">
            <IconButton
              color="primary"
              aria-label="upload image"
              component="span"
            >
              <AttachFileIcon />
            </IconButton>
          </label>
        </Grid>
        <Grid item container xs={12} justifyContent="flex-end">
          <Button
            onClick={() => {
              setState({
                anchor: null,
                isCancelled: true,
              });
            }}
          >
            <CloseIcon />
          </Button>
          <Button
            onClick={() => {
              setState({
                anchor: null,
                isCancelled: false,
              });
              props.onSubmit(data, !state.isCancelled);
            }}
          >
            <DoneIcon />
          </Button>
        </Grid>
      </Grid>
    </Popover>
  );
};
const defaultValues = {
  RTE1: ""
};
const RichTextEditor: React.FC<IRichTextEditorProps> = ({ content, updatePostContent }) => {
  const ref = useRef<TMUIRichTextEditorRef>(null);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  // parent params
  const [postContent, setPostContent] = useState<string>("")

  const handleFileUpload = (file: File) => {
    ref.current?.insertAtomicBlockAsync(
      "IMAGE",
      uploadImage(file),
      "Uploading now..."
    );
    console.log(file)
  };

  //Firebase helper
  const handleFireBaseUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('start of upload')
    // async magic goes here...

  }

  //////////////////////////////////-- /////////////////////////////////////////////////////////////////
  useEffect(() => {
    setPostContent(content);
  }, [content])
  const myTheme = createTheme({
    // Set up your custom MUI theme here
  });

  const { handleSubmit, reset, register, setValue } = useForm({
    defaultValues
  });

  return (
    <div>
      <ThemeProvider theme={myTheme}>
        <UploadImagePopover
          anchor={anchor}
          onSubmit={(data, insert) => {
            if (insert && data.file) {
              handleFileUpload(data.file);
            }
            setAnchor(null);
          }}
        />
        <MUIRichTextEditor
          onChange={value => {
            //get json of RTE content
            console.log(value.getCurrentContent());
            const content = JSON.stringify(
              convertToRaw(value.getCurrentContent())
            );
            setValue("RTE1", content);
            updatePostContent(content);

            // const content = value.getCurrentContent().getPlainText();
            // setValue("RTE1", content);
            // updatePostContent(content);
          }}
          label="Start typing..."
          ref={ref}
          controls={[
            "title",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "highlight",
            "undo",
            "redo",
            "numberList",
            "bulletList",
            "quote",
            "code",
            "clear",
            "link",
            "media",
            "upload-image"
          ]}
          customControls={[
            {
              name: "upload-image",
              icon: <BackupIcon />,
              type: "callback",
              onClick: (_editorState, _name, anchor) => {
                setAnchor(anchor);
              },
            },
          ]}
          draftEditorProps={{
            handleDroppedFiles: (_selectionState, files) => {
              if (files.length && (files[0] as File).name !== undefined) {
                handleFileUpload(files[0] as File);
                return "handled";
              }
              return "not-handled";
            },
          }}
        />
      </ThemeProvider>
    </div>
  );
}
export default RichTextEditor;