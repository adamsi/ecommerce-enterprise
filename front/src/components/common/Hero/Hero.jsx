import { Link } from "react-router-dom";
import CustomButton from "../../utils/Button/Button";
import { HeroSection, HeroTitle, Subtitle, TextContainer } from "./Hero.styles";
import ChangingBlock from "../Image/ChangingBlock";
import { useSelector } from "react-redux";

// Define the Hero component
const Hero = () => {
  const {configMap} = useSelector((state)=> state.config);
  return (
    <ChangingBlock configKey={"hero-section"}>
    <HeroSection>
      <TextContainer>
        <HeroTitle>{configMap["hero-section"].contents[0]}</HeroTitle>
        <Subtitle $customBackground={true}>
        {configMap["hero-section"].contents[1]}
        </Subtitle>
        <Link to="/all-products">
          <CustomButton active={true} color="black">{configMap["hero-section"].contents[2]}</CustomButton>
        </Link>
      </TextContainer>
    </HeroSection>
    </ChangingBlock>
  );
};

export default Hero;
