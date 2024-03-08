import React, { useState, useEffect, useRef } from 'react';
import './Travel.css';
import './Egypte.css';
import { useInView } from 'react-intersection-observer';

function Egypte() {
  const [showImages, setShowImages] = useState(false);
  const [selectedImage, setSelectedImage] = useState(2);
  const [textMovedUp, setTextMovedUp] = useState(false);
  const [side2Hovered, setSide2Hovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const exploreButtonRef = useRef(null);
  const imagesContainerRef = useRef(null);
  const textRef = useRef(null);

  const imageTexts = [
    "Sous la voûte de la citerne basilique, des colonnes se dressent comme les gardiens d'histoires séculaires, échos d'un passé englouti.",
    "Les dunes ondulent sous l'horizon, caressées par le souffle du désert, témoin silencieux de l'immensité du monde.",
    "Les assiettes ornées racontent des légendes en céramique, un artisanat où chaque courbe capture un morceau de culture, un fragment d'âme.",
    "Un éventail de figurines en bois, vêtues de costumes traditionnels, veille sur un marché coloré, symboles d'un folklore vibrant et intemporel.",
    "Un plat de kushari se présente, mélange généreux de riz, lentilles et pâtes, couronné de croustillantes oignons frits, invitant à une symphonie de textures et saveurs."
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
    <div className="background-container">
      <div className="logo">MIL</div>
      <div className="menu-burger">&#9776;</div>
      <div className={`background ${showImages ? 'move-up' : ''}`} id="side1"></div>
      <div
        className={`background ${showImages ? 'move-up' : ''} ${side2Hovered ? 'side2-hovered' : ''}`}
        id="side2"
        style={{
          transform: side2Hovered ? `perspective(500px) rotateY(${(mousePosition.x - window.innerWidth / 2) * 0.0004}deg) rotateX(${(mousePosition.y - window.innerHeight / 2) * -0.0003}deg)` : 'none'
        }}
      ></div>
      <div className={`background ${showImages ? 'move-up' : ''}`} id="side3"></div>
      <div className={`text ${showImages ? 'move-up' : ''} ${textMovedUp ? 'text-move-up' : ''}`} ref={textInViewRef}>
        EGYPT
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
                src={`${process.env.PUBLIC_URL}/Egypte/egypt${index + 1}.png`}
                alt={`Egypt ${index + 1}`}
                style={{ width: `${index === selectedImage ? '600px' : '150px'}` }}
              />
            </div>
          ))}
        </div>
      )}
      <img
        src={`${process.env.PUBLIC_URL}/Egypte/bird.gif`}
        alt="Bird"
        className="bird-gif"
      />
    </div>
  );
}

export default Egypte;
