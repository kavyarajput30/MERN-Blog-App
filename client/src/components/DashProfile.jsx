import { TextInput, Button, Alert } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage } from "firebase/storage";
import { ref } from "firebase/storage";
import { uploadBytesResumable } from "firebase/storage";
import app from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imagefileURL, setImageFileURL] = useState(null);
  const filePickerRef = useRef();
  const [imagefileUploadprogress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileuploadError] = useState(null);

  const handleInputImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileURL(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = () => {
    const storage = getStorage(app);
    const filenName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, filenName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileuploadError("Could not upload image");
        setImageFileUploadProgress(null);
        setImageFileURL(null);
        setImageFile(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileURL(downloadURL);
        });
      }
    );
  };
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleInputImage}
          ref={filePickerRef}
        />
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <div
          className=" relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imagefileUploadprogress && (
            <CircularProgressbar
              value={imagefileUploadprogress || 0}
              text={`${imagefileUploadprogress}%`}
              strokeWidth={5}
              style={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba (62,152,199,${imagefileUploadprogress / 100})`,
                },
              }}
            ></CircularProgressbar>
          )}
          <img
            src={imagefileURL || currentUser?.photourl}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray]  ${
              imagefileUploadprogress &&
              imagefileUploadprogress < 100 &&
              "opacity-60"
            }
            `}
          />
        </div>
        <TextInput
          type="text"
          id="username"
          defaultValue={currentUser?.username}
        />
        <TextInput type="email" id="email" defaultValue={currentUser?.email} />
        <TextInput
          type="password"
          id="password"
          defaultValue={currentUser?.password}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-6">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}

export default DashProfile;
