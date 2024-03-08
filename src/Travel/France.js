import React, { useState, useEffect, useRef } from 'react';
import './Travel.css';
import './France.css';
import { useInView } from 'react-intersection-observer';

function France() {
  const [showImages, setShowImages] = useState(false);
  const [selectedImage, setSelectedImage] = useState(2);
  const [textMovedUp, setTextMovedUp] = useState(false);
  const [side2Hovered, setSide2Hovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const exploreButtonRef = useRef(null);
  const imagesContainerRef = useRef(null);
  const textRef = useRef(null);

  const imageTexts = [
    "La Tour Eiffel se dresse, élégante et intemporelle, sur l'horizon de Paris, capturant l'essence même de la romance et de l'ingéniosité humaine.",
    "La pyramide de verre du Louvre, fusion parfaite de l'ancien et du moderne, brille sous le soleil, carrefour de culture et d'histoire au coeur de Paris.",
    "Le drapeau français flotte fier, embrassant une vue parisienne où la Tour Eiffel se découpe sur l'horizon, symbole vivant de la nation.",
    "Dans l'ambiance tamisée d'une exposition, les écrans projettent des fragments d'histoire, captivant les visiteurs dans une danse d'images et de récits.",
    "Les escargots, baignés dans leur beurre d'ail et persil, offrent une expérience gustative authentique, éveillant les sens à la finesse de la cuisine française."
  ];

  const { ref: textInViewRef, inView: isTextInView } = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  useEffect(() => {
    if (isTextInView) {
      setTextMovedUp(true);
    }
  }, [isTextInView]);

  const handleExploreClick = () => {
    setTextMovedUp(true);
    if (exploreButtonRef.current) {
      exploreButtonRef.current.style.animation = 'exploreButtonHideAnimation 1s forwards';
    }
    setTimeout(() => {
      setShowImages(true);
      if (imagesContainerRef.current) {
        imagesContainerRef.current.classList.add('show');
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
    const isMouseOnMiddle = mousePosition.x > window.innerWidth / 3 && mousePosition.x < window.innerWidth * 2 / 3;
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

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const isScrollingUp = window.scrollY < lastScrollY.current;
      setTextMovedUp(isScrollingUp);
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="france-container">
      <div className="france-logo">MIL</div>
      <div className="france-menu-burger">&#9776;</div>
      <div className={`sideFrance ${showImages ? 'move-up' : ''}`} id="sideFrance1"></div>
      <div
        className={`sideFrance ${showImages ? 'move-up' : ''} ${side2Hovered ? 'side2-hovered' : ''}`}
        id="sideFrance2"
        style={{
          transform: side2Hovered ? `perspective(500px) rotateY(${(mousePosition.x - window.innerWidth / 2) * 0.0004}deg) rotateX(${(mousePosition.y - window.innerHeight / 2) * -0.0003}deg)` : 'none'
        }}
      ></div>
      <div className={`sideFrance ${showImages ? 'move-up' : ''}`} id="sideFrance3"></div>
      <div className={`text ${showImages ? 'move-up' : ''} ${textMovedUp ? 'text-move-up' : ''}`} ref={textInViewRef}>
        FRANCE
      </div>
      <button
        ref={exploreButtonRef}
        className={`explore-button ${showImages ? 'hide' : ''}`}
        onClick={handleExploreClick}
      >
        EXPLORE
      </button>
      {showImages && (
        <div className={`images-containerfrance ${showImages ? '' : 'hide'}`} ref={imagesContainerRef}>
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
                src={`${process.env.PUBLIC_URL}/France/france${index + 1}.png`}
                alt={`France ${index + 1}`}
                style={{ width: `${index === selectedImage ? '600px' : '150px'}` }}
              />
            </div>
          ))}
        </div>
      )}
      <img
        src={`${process.env.PUBLIC_URL}/France/cat.gif`}
        alt="cat"
        className="cat-gif"
      />
    </div>
  );
}

export default France;