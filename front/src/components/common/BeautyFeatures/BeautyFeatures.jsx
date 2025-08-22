import { useEffect, useRef } from "react";
import beautyImage from "../../../assets/img/presentation/moisturizer.jpeg";
import WomanSvg from "../../../assets/icons/woman.svg?react";
import Hydration from "../../../assets/icons/hydration.svg?react";
import Natural from "../../../assets/icons/natural.svg?react";
import Natural2 from "../../../assets/icons/natural2.svg?react";
import EcoCare from "../../../assets/icons/eco-care.svg?react";
import Approved from "../../../assets/icons/approved.svg?react";
import Heading from "../../utils/Heading/heading";
import CustomButton from "../../utils/Button/Button";
import {
  CircleWrapper,
  Column1,
  Column2,
  Container,
  ContainerCol1,
  Feature,
  Features,
  Footer,
  ImageContainer,
  InnerCircle,
  RotatingSVG,
  Section,
  SVGContainer,
  Text,
  Title,
} from "./BeautyFeatures.styles";
import Image from '../Image/Image';
import { useSelector } from "react-redux";
import ChangingBlock from "../Image/ChangingBlock";

const BeautyFeatures = () => {
  const sectionRef = useRef(null);
  const {configMap} = useSelector((state)=> state.config);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".feature").forEach((item, index) => {
              setTimeout(() => {
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
              }, index * 300); // Adjust delay as needed
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <ChangingBlock configKey={"nature-section"} editIconPosition="top-right">
      <Section>
        <Container ref={sectionRef}>
          <Column1>
            <ContainerCol1>
              <CircleWrapper>
                <SVGContainer>
                  <RotatingSVG
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 600 600"
                  >
                    <defs>
                      <path
                        d="M50,300c0-137,113-250,250-250s250,113,250,250s-113,250-250,250S50,437,50,300"
                        id="textcircle"
                      />
                    </defs>
                    <text dy="0" textLength="640">
                      <textPath xlinkHref="#textcircle">
                        {configMap["nature-section"]?.contents[0]}
                      </textPath>
                    </text>
                  </RotatingSVG>
                </SVGContainer>
                <InnerCircle>
                  <ImageContainer>
                    <Image 
                      src={configMap["nature-section"]?.images[0] || beautyImage} 
                      alt="Natural Beauty Product" 
                      width="100%" 
                      height="100%"
                      objectFit="cover"
                    />
                  </ImageContainer>
                </InnerCircle>
              </CircleWrapper>
            </ContainerCol1>
          </Column1>
          <Column2>
            <Title as="h2" $marginBottom="1.4rem">
              {configMap["nature-section"]?.contents[0]}
            </Title>
            <Heading
              as="h4"
              $marginBottom="1.4rem"
              $colorText="var(--primary-color-dark-4)"
            >
              {configMap["nature-section"]?.contents[1]}
            </Heading>
            <Text>
              {configMap["nature-section"]?.contents[2]}
            </Text>

            <Features>
              <Feature className="feature">
                <Hydration />
                <div>
                  <Heading as="h6" $colorText="var(--primary-color-dark-4)">
                    {configMap["nature-section"]?.contents[3]}
                  </Heading>
                  <p>{configMap["nature-section"]?.contents[4]}</p>
                </div>
              </Feature>
              <Feature className="feature">
                <Natural />
                <div>
                  <Heading as="h6" $colorText="var(--primary-color-dark-4)">
                    {configMap["nature-section"]?.contents[5]}
                  </Heading>
                  <p>{configMap["nature-section"]?.contents[6]}</p>
                </div>
              </Feature>
              <Feature className="feature">
                <EcoCare />
                <div>
                  <Heading as="h6" $colorText="var(--primary-color-dark-4)">
                    {configMap["nature-section"]?.contents[7]}
                  </Heading>
                  <p>{configMap["nature-section"]?.contents[8]}</p>
                </div>
              </Feature>
              <Feature className="feature">
                <Natural2 />
                <div>
                  <Heading as="h6" $colorText="var(--primary-color-dark-4)">
                    {configMap["nature-section"]?.contents[9]}
                  </Heading>
                  <p>{configMap["nature-section"]?.contents[10]}</p>
                </div>
              </Feature>
              <Feature className="feature">
                <Approved />
                <div>
                  <Heading as="h6" $colorText="var(--primary-color-dark-4)">
                    {configMap["nature-section"]?.contents[11]}
                  </Heading>
                  <p>{configMap["nature-section"]?.contents[12]}</p>
                </div>
              </Feature>
              <Feature className="feature">
                <WomanSvg />
                <div>
                  <Heading as="h6" $colorText="var(--primary-color-dark-4)">
                    {configMap["nature-section"]?.contents[13]}
                  </Heading>
                  <p>{configMap["nature-section"]?.contents[14]}</p>
                </div>
              </Feature>
            </Features>
            <Footer>
              <CustomButton size="small">Get in Touch</CustomButton>
            </Footer>
          </Column2>
        </Container>
      </Section>
    </ChangingBlock>
  );
};

export default BeautyFeatures;
