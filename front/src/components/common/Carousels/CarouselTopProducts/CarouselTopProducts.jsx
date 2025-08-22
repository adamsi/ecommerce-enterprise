import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import Heading from "../../../utils/Heading/heading";
import {
  Section,
  CarouselWrapper,
  TitleContainer,
  CarouselContainer,
  CarouselEle,
  Card,
  CardContent,
  CircularButtonContainer,
  CircularButton,
  Category,
  Price,
  ContentWrapper,
  ProductTitle,
  InfoPrice,
} from "./CarouselTopProducts.styles.js";
import Row from "../../../utils/Row/Row.js";
import { useSelector } from "react-redux";
import RotatingText from "../../../utils/RotatingText/RotatingText.jsx";
import { useNavigate } from "react-router-dom";
import ChangingBlock from "../../Image/ChangingBlock";

const CarouselTopProducts = () => {
  const allProducts = useSelector((state) => state.products.products);
  const { configMap } = useSelector((state) => state.config);
  const slidesData =  allProducts.slice(0, 3);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartIndex = useRef(0);
  const titleContainerRef = useRef(null);
  const carouselContainerRef = useRef(null);
  const navigate = useNavigate();
  const handleDragStart = (event, index) => {
    setIsDragging(true);
    dragStartX.current = getCursorPositionX(event);
    dragStartIndex.current = index;
  };

  const handleDragMove = (event) => {
    if (isDragging) {
      const currentPositionX = getCursorPositionX(event);
      const difference = currentPositionX - dragStartX.current;
      const threshold = 100; // Adjust as needed for sensitivity

      if (difference > threshold) {
        prevSlide();
        setIsDragging(false);
      } else if (difference < -threshold) {
        nextSlide();
        setIsDragging(false);
      }
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const getCursorPositionX = (event) => {
    return event.type.includes("mouse")
      ? event.clientX
      : event.touches[0].clientX;
  };

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slidesData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slidesData.length) % slidesData.length);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("faq-section-visible");
            entry.target.classList.remove("faq-section-hidden");

            observer.unobserve(entry.target);
          } else {
            entry.target.classList.add("faq-section-hidden");
            entry.target.classList.remove("faq-section-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const titleSection = titleContainerRef.current;
    const carouselSection = carouselContainerRef.current;

    if (titleSection) {
      observer.observe(titleSection);
    }

    if (carouselSection) {
      observer.observe(carouselSection);
    }

    return () => {
      if (titleSection) {
        observer.unobserve(titleSection);
      }
      if (carouselSection) {
        observer.unobserve(carouselSection);
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <ChangingBlock isOnClick={false} configKey={"carousel-top-products-section"} editIconPosition="top-left">
        <Section>
        <CarouselWrapper>
          <TitleContainer ref={titleContainerRef}>
            <Heading as="h4" $marginBottom="0px" $colorText="black" style={{color: "rgb(56, 36, 92)"}}>
              {configMap["carousel-top-products-section"]?.contents[0]}
            </Heading>
            <Heading as="h2" $customBackground={false} $marginBottom="0px">
              {configMap["carousel-top-products-section"]?.contents[1]}
            </Heading>
            <RotatingText
              textInput={configMap["carousel-top-products-section"]?.contents[2]}
              textSize="1.45rem"
              linkTo="/all-products"
            />
          </TitleContainer>
        <CarouselContainer
          ref={carouselContainerRef}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <CarouselEle>
            {slidesData.map((slide, index) => {
              let position = "";
              if (index === currentSlide) {
                position = "center";
              } else if (
                index ===
                (currentSlide - 1 + slidesData.length) % slidesData.length
              ) {
                position = "left";
              } else if (index === (currentSlide + 1) % slidesData.length) {
                position = "right";
              }
              return (
                <Card
                  key={index}
                  $position={position}
                  onMouseDown={(event) => handleDragStart(event, index)}
                  onTouchStart={(event) => handleDragStart(event, index)}
                  onClick={() => navigate(`/shop/${slide.slug}`)}
                  style={{
                    backgroundImage: `url(${`${slide.image}`})`,
                    width: '110%',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <CardContent>
                    <ContentWrapper>
                      <Category>{slide.category.name}</Category>
                      <InfoPrice>
                        <ProductTitle>{slide.title}</ProductTitle>
                        <Price>${slide.price}</Price>
                      </InfoPrice>
                    </ContentWrapper>
                  </CardContent>
                </Card>
              );
            })}
          </CarouselEle>
          <CircularButtonContainer>
            <Row
              type="horizontal"
              $justifyContent="center"
              $alignItems="center"
              $flexGap="1rem"
            >
              <CircularButton onClick={prevSlide}>
                <FaArrowLeft />
              </CircularButton>
              <CircularButton onClick={nextSlide}>
                <FaArrowRight />
              </CircularButton>
            </Row>
          </CircularButtonContainer>
        </CarouselContainer>
      </CarouselWrapper>
    </Section>
    </ChangingBlock>
    </div>
  );
};

export default CarouselTopProducts;
