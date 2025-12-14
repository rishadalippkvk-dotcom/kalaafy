import React, { useState, useEffect } from 'react';
import { galleryImages as mockGalleryImages } from '../data/mockData';
import './Gallery.css';

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [filterCategory, setFilterCategory] = useState('all');
    const [galleryImages, setGalleryImages] = useState(mockGalleryImages);

    useEffect(() => {
        fetch('http://localhost:5000/api/gallery')
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    setGalleryImages(data);
                }
            })
            .catch(err => console.error("Error fetching gallery:", err));
    }, []);

    const filteredImages = filterCategory === 'all'
        ? galleryImages
        : galleryImages.filter(img => img.category === filterCategory);

    const openLightbox = (image) => {
        setSelectedImage(image);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    const navigateImage = (direction) => {
        const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
        let newIndex;

        if (direction === 'next') {
            newIndex = (currentIndex + 1) % filteredImages.length;
        } else {
            newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        }

        setSelectedImage(filteredImages[newIndex]);
    };

    return (
        <section id="gallery" className="section gallery-section">
            <div className="container">
                <h2 className="section-title">Gallery</h2>

                <div className="tabs">
                    <button
                        className={`tab ${filterCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setFilterCategory('all')}
                    >
                        All Photos
                    </button>
                    <button
                        className={`tab ${filterCategory === 'offstage' ? 'active' : ''}`}
                        onClick={() => setFilterCategory('offstage')}
                    >
                        Offstage
                    </button>
                    <button
                        className={`tab ${filterCategory === 'onstage' ? 'active' : ''}`}
                        onClick={() => setFilterCategory('onstage')}
                    >
                        Onstage
                    </button>
                </div>

                <div className="gallery-grid grid grid-4">
                    {filteredImages.map((image, index) => (
                        <div
                            key={image.id}
                            className="gallery-item"
                            style={{ animationDelay: `${index * 0.05}s` }}
                            onClick={() => openLightbox(image)}
                        >
                            {image.url ? (
                                <img src={image.url} alt={image.title} className="gallery-image" onError={(e) => { e.target.style.display = 'none'; }} />
                            ) : (
                                <div className="gallery-image-placeholder">
                                    <div className="placeholder-icon">📸</div>
                                    <div className="placeholder-text">{image.event}</div>
                                </div>
                            )}
                            <div className="gallery-overlay">
                                <h4>{image.title}</h4>
                                <p>{image.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedImage && (
                <div className="lightbox" onClick={closeLightbox}>
                    <button className="lightbox-close" onClick={closeLightbox}>✕</button>
                    <button className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}>‹</button>
                    <button className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}>›</button>

                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <div className="lightbox-image-placeholder">
                            <div className="placeholder-icon-large">📸</div>
                            <h3>{selectedImage.event}</h3>
                        </div>
                        <div className="lightbox-info">
                            <h3>{selectedImage.title}</h3>
                            <p>{selectedImage.description}</p>
                            <span className={`badge ${selectedImage.category === 'offstage' ? 'badge-primary' : 'badge-secondary'}`}>
                                {selectedImage.category}
                            </span>

                            <div style={{ marginTop: '20px' }}>
                                <a
                                    href={selectedImage.url}
                                    download
                                    className="lightbox-download"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    📥 Download Image
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Gallery;
