import { Splide, SplideSlide } from "@splidejs/react-splide";
import { FaStar } from "react-icons/fa";
import "@splidejs/react-splide/css";
import Heading from "../../utils/Heading/heading";
import {
  Author,
  TestimonialCard,
  CarouselWrapper,
  ContentWrapper,
  ImageGrid,
  Particles,
  Stars,
  TestimonialImage,
  TestimonialSection,
  TestimonialText,
} from "./TestimonialSection.styles";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import ChangingBlock from "../Image/ChangingBlock";

const imagePositions = [
  { size: "100px", $top: "10%", $left: "10%" },
  { size: "150px", $top: "30%", $left: "50%" },
  { size: "80px", $top: "70%", $left: "20%" },
  { size: "120px", $top: "50%", $left: "70%" },
  { size: "100px", $top: "20%", $left: "80%" },
  { size: "140px", $top: "75%", $left: "60%" },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const splideRef = useRef(null);
  const { configMap } = useSelector((state) => state.config);

  // Create testimonials array from configMap
  const testimonials = [];
  if (configMap["testimonial-section"]?.contents) {
    const contents = configMap["testimonial-section"].contents;
    const images = configMap["testimonial-section"].images || [];
    
    // Start from index 2 (after title and subtitle)
    for (let i = 2; i < contents.length; i += 2) {
      if (contents[i] && contents[i + 1]) {
        testimonials.push({
          text: contents[i],
          author: contents[i + 1],
          img: images[Math.floor(i / 2) - 1] || `/people/${Math.floor(i / 2)}.jpg`
        });
      }
    }
  }

  const handleMove = (index) => {
    setActiveIndex(index);
  };

  const handleImageClick = (index) => {
    if (splideRef.current) {
      splideRef.current.go(index);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <ChangingBlock isOnClick={false} configKey={"testimonial-section"} editIconPosition="top-left">
        <TestimonialSection>
          <Particles>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </Particles>
          <ContentWrapper>
            <Heading as="h4" $colorText="black">
              {configMap["testimonial-section"]?.contents[0]}
            </Heading>
            <Heading as="h2" $marginBottom="1.4rem">
              {configMap["testimonial-section"]?.contents[1]}
            </Heading>
            <Stars>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </Stars>
            <CarouselWrapper>
              <Splide
                ref={splideRef}
                onMoved={(splide) => handleMove(splide.index)}
                options={{
                  type: "loop",
                  perPage: 1,
                  autoplay: true,
                  interval: 3000,
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <SplideSlide key={index}>
                    <TestimonialCard>
                      <TestimonialText>{testimonial.text}</TestimonialText>
                      <Author>{testimonial.author}</Author>
                    </TestimonialCard>
                  </SplideSlide>
                ))}
              </Splide>
            </CarouselWrapper>
          </ContentWrapper>
          <ImageGrid>
            {testimonials.map((testimonial, index) => (
              <TestimonialImage
                key={index}
                src={testimonial.img}
                {...imagePositions[index % imagePositions.length]}
                $active={index === activeIndex ? "true" : "false"}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </ImageGrid>
        </TestimonialSection>
      </ChangingBlock>
    </div>
  );
};

export default Testimonials;
