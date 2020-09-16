import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

export const PictureGallery = ({ photos }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const photosToRender = photos.map((p) => ({
    key: p.id.toString(),
    width: 1,
    height: 1,
    src: p.url,
  }));

  return (
    <div>
      <Gallery photos={photosToRender} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photosToRender.map((x) => ({
                ...x,
                caption: x.description,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
};

PictureGallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      url: PropTypes.string,
      isMain: PropTypes.bool,
      description: PropTypes.string,
    })
  ).isRequired,
};
