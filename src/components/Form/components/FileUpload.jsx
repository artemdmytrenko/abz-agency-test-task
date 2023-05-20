import React, { useContext, useRef } from "react";
import { FormContext } from "../Form";

const FileUpload = ({ ref }) => {
  const {
    register,
    trigger,
    photoName,
    setPhotoName,
    errors,
    clearErrors,
    photoRef,
  } = useContext(FormContext);

  return (
    <div
      ref={photoRef}
      className={`file-upload ${errors.photo?.message && "error"}`}
    >
      <div
        tabIndex={0}
        onClick={() => document.querySelector('input[type="file"]').click()}
      >
        Upload
      </div>
      {photoName ? (
        <div className="uploaded">
          <span>{photoName}</span>
        </div>
      ) : (
        <div>Upload your photo</div>
      )}

      <input
        type="file"
        accept="image/jpeg, image/jpg"
        id="photo"
        {...register("photo", {
          required: {
            value: true,
            message: "Please provide a photo",
          },
          onChange: ({ target: { files } }) => {
            if (files) {
              setPhotoName(files[0].name);
              files[0]?.type !== "image/jpeg"
                ? trigger("photo")
                : clearErrors("photo");
            }
          },
          validate: {
            typeError: (fileList) => {
              return fileList[0].type === "image/jpeg" || "Image is invalid.";
            },
            fileSizeError: (fileList) => {
              return (
                fileList[0].size < 5e6 ||
                "The photo may not be greater than 5 Mbytes."
              );
            },
          },
        })}
        hidden
      />
      <p>{errors.photo?.message}</p>
    </div>
  );
};

export default FileUpload;
