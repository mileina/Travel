import React, { useState, useEffect, useRef, useMemo } from 'react';
import './Travel.css';
import './Thailande.css';

function Thailande({ onLoaded }) {
  const [showImages, setShowImages] = useState(false);
  const [selectedImage, setSelectedImage] = useState(2);
  const [textMovedUp, setTextMovedUp] = useState(false);
  const [side2Hovered, setSide2Hovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const exploreButtonRef = useRef(null);
  const imagesContainerRef = useRef(null);
  const textRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const imagePaths = useMemo(() => [ 
    `${process.env.PUBLIC_URL}/Thailande/thailand1.png`,
    `${process.env.PUBLIC_URL}/Thailande/thailand2.png`,
    `${process.env.PUBLIC_URL}/Thailande/thailand3.png`,
    `${process.env.PUBLIC_URL}/Thailande/thailand4.png`,
    `${process.env.PUBLIC_URL}/Thailande/thailand5.png`,
  ], []);

  useEffect(() => {
    const loadImages = async () => {
      await Promise.all(imagePaths.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      }));
      setImagesLoaded(true); 
    };

    loadImages();
  }, [imagePaths]);
  
  useEffect(() => {
    if (imagesLoaded && onLoaded) {
      onLoaded(); 
    }
  }, [imagesLoaded, onLoaded]);

  const imageTexts = [
    "Entre les colonnes vestiges, le Bouddha repose, écho de sérénité au coeur de l'ancienne cité, sous le regard bienveillant du temps.",
    "Un crépuscule pourpre enveloppe le temple, son sommet doré touchant le ciel qui s'assombrit, une étoile terrestre guidant les prières vers l'infini.",
    "Les tuk-tuks scintillent sous les étoiles de la ville, promettant une aventure colorée dans la nuit qui s’éveille.",
    "Le Bouddha allongé, drapé de jaune, sourit à l'éternité parmi les ruines qui murmurent des histoires d'antan.",
    "Dans l'assiette, un ballet de saveurs: le Pad Thaï, un classique relevé par la fraîcheur des herbes et la douceur des crevettes."
  ];

  const handleExploreClick = () => {
    if (!imagesLoaded) {
      console.log("Images are still loading.");
      return;
    }

    setTextMovedUp(true);
    if (exploreButtonRef.current) {
      exploreButtonRef.current.style.animation = 'exploreButtonHideAnimation 1s forwards';
    }
    setTimeout(() => {
      setShowImages(true);
      if (imagesContainerRef.current) {
        imagesContainerRef.current.classList.add('show');
      }
      if (onLoaded) {
        onLoaded();
      }
    }, 1000);
  };


  const handleImageClick = (index) => {
    setSelectedImage(index);
    setTextMovedUp(true);
  };

  const handlePrevImage = () => {
    setSelectedImage(prevIndex => (prevIndex === 0 ? 4 : prevIndex - 1));
    setTextMovedUp(false);
  };

  const handleNextImage = () => {
    setSelectedImage(prevIndex => (prevIndex === 4 ? 0 : prevIndex + 1));
    setTextMovedUp(false);
  };

  const handleHideImages = () => {
    if (exploreButtonRef.current) {
      exploreButtonRef.current.classList.add('hide');
    }
    if (imagesContainerRef.current) {
      imagesContainerRef.current.classList.add('hide');
      setTextMovedUp(false);
      if (textRef.current) {
        textRef.current.classList.add('text-move-down');
      }
    }
    setTimeout(() => {
      setShowImages(false);
      if (exploreButtonRef.current) {
        exploreButtonRef.current.classList.remove('hide');
      }
    }, 1000);
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const isMouseOnSide = mousePosition.x < window.innerWidth / 3 || mousePosition.x > window.innerWidth * 2 / 3;
    const isMouseOnMiddle = mousePosition.x > window.innerWidth / 1 && mousePosition.x < window.innerWidth * 2 / 3;
    setSide2Hovered(isMouseOnSide && !isMouseOnMiddle);
  }, [mousePosition]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (imagesContainerRef.current && !imagesContainerRef.current.contains(event.target)) {
        handleHideImages();
        if (exploreButtonRef.current) {
          exploreButtonRef.current.style.animation = 'none';
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="sidethailand-container">
      <div className="thailand-logo">MIL</div>
      <div className="thailand-menu-burger">&#9776;</div>
      <div className={`sidethailand ${showImages ? 'move-up' : ''}`} id="sidethailand1"></div>
      <div
        className={`sidethailand ${showImages ? 'move-up' : ''} ${side2Hovered ? 'side2-hovered' : ''}`}
        id="sidethailand2"
        style={{
          transform: side2Hovered ? `perspective(500px) rotateY(${(mousePosition.x - window.innerWidth / 2) * 0.0009}deg) rotateX(${(mousePosition.y - window.innerHeight / 2) * -0.0003}deg)` : 'none'
        }}
      ></div>
      <div className={`sidethailand ${showImages ? 'move-up' : ''}`} id="sidethailand3"></div>
      <div ref={textRef} className={`text ${showImages ? 'move-up' : ''} ${textMovedUp ? 'text-move-up' : ''}`}>
        THAILAND
      </div>
      <button
        ref={exploreButtonRef}
        className={`explore-button ${showImages ? 'hide' : ''}`}
        onClick={handleExploreClick}
      >
        EXPLORE
      </button>
      {showImages && (
        <div
          ref={imagesContainerRef}
          className={`images-container ${showImages ? '' : 'hide'}`}
        >
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className={`image-item ${index === selectedImage ? 'selected' : ''}`}
              onClick={() => handleImageClick(index)}
              style={{
                marginLeft: index === 0 ? `${selectedImage === 0 ? 'calc(50% - 50px)' : 'calc(50% - 120px)'}` : '-50px',
                marginRight: index === 4 ? `${selectedImage === 4 ? 'calc(50% - 50px)' : 'calc(50% - 120px)'}` : '-50px',
                zIndex: index === selectedImage ? '1' : '0',
                opacity: index === selectedImage ? '1' : '0.8',
                filter: index === selectedImage ? 'blur(0px)' : 'blur(1px)',
                transition: 'all 0.3s ease'
              }}
            >
              {index === selectedImage && (
                <div className="image-text-container">
                  <p>{imageTexts[index]}</p>
                </div>
              )}
              <img
                src={`${process.env.PUBLIC_URL}/Thailande/thailand${index + 1}.png`}
                alt={`Thailand ${index + 1}`}
                style={{ width: `${index === selectedImage ? '600px' : '150px'}` }}
              />
            </div>
          ))}
        </div>
      )}
      {showImages && selectedImage !== 0 && <button className="prev-button" onClick={handlePrevImage}>Previous</button>}
      {showImages && selectedImage !== 4 && <button className="next-button" onClick={handleNextImage}>Next</button>}
      <img
        src={`${process.env.PUBLIC_URL}/Thailande/feu.gif`}
        alt="feu"
        className="feu-gif"
      />
    </div>
  );
}

export default Thailande;
