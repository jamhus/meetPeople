import React from "react";
import { Button, ButtonGroup } from "reactstrap";
import { useDropzone } from "react-dropzone";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./DropZone.css";

export const DropZone = ({
  selectedFiles,
  removeFile,
  upload,
  setSelectedFiles,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    accept: [".jpg", ".jpeg", ".png"],
    onDrop: (acceptedFiles) => setSelectedFiles(acceptedFiles),
    preventDropOnDocument: true,
  });

  return (
    <div className="dropzone-wrapper" {...getRootProps()}>
      {selectedFiles !== null &&
        selectedFiles.map((selectedFile) => (
          <div key={selectedFile.name}>
            <div className="dropzone-remove">
              {`${selectedFile.name} - `}
              <ButtonGroup>
                <Button
                  onClick={() => {
                    removeFile(selectedFile);
                  }}
                  className="btn btn-danger"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
                <Button
                  onClick={() => {
                    upload(selectedFile);
                  }}
                  className="btn btn-primary"
                >
                  <FontAwesomeIcon icon={faUpload} />
                </Button>
              </ButtonGroup>
            </div>
          </div>
        ))}
      {selectedFiles === null && (
        <>
          <input {...getInputProps()} data-cy={"csv-dropzone"} />
          {isDragActive ? (
            <div className="dropzone-text">Drop the file here...</div>
          ) : (
            <div className="dropzone-text">
              Drop file or click here to upload a csv file
            </div>
          )}
        </>
      )}
    </div>
  );
};
