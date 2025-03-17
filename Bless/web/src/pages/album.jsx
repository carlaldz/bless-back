import React, { useState, useEffect } from 'react';
import './Album.css';

const Album = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(18);

  useEffect(() => {
    fetch('/images.json')
      .then(res => res.json())
      .then(data => setImages(data.images))
      .catch(console.error);
  }, []);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  const navigate = (direction) => {
    setCurrentIndex(prev => {
      const newIndex = direction === 'prev' ? prev - 1 : prev + 1;
      return (newIndex + images.length) % images.length;
    });
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 18);
  };

  if (!images.length) return <div className="loading">Cargando imágenes...</div>;

  return (
    <div className="album-container">
      {/* Galería de imágenes */}
      <div className="gallery">
        {images.slice(0, visibleCount).map((imgUrl, index) => (
          <div 
            key={imgUrl}
            className="image-container"
            onClick={() => openLightbox(index)}
          >
            <img
              src={imgUrl}
              alt={`Imagen ${index + 1}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {visibleCount < images.length && (
        <button className="load-more" onClick={loadMore}>
          Cargar más fotos
        </button>
      )}

      {isLightboxOpen && (
        <div className="lightbox">
          <div className="lightbox-backdrop" onClick={() => setIsLightboxOpen(false)}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <span className="close" onClick={() => setIsLightboxOpen(false)}>
                &times;
              </span>
              
              <button className="arrow prev" onClick={() => navigate('prev')}>
                &#10094;
              </button>
              
              <button className="arrow next" onClick={() => navigate('next')}>
                &#10095;
              </button>

              <img
                src={images[currentIndex]}
                alt={`Imagen en tamaño completo ${currentIndex + 1}`}
              />

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Album;