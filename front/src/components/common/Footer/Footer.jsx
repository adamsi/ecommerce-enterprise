import { Link } from "react-router-dom";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { ImCompass } from "react-icons/im";
import CreditCards from "../../utils/CreditCards/CreditCards";
import ShareSocialMediaIcons from "../../utils/ShareSocialMediaIcons/ShareSocialMediaIcons";
import Row from "../../utils/Row/Row";
import Newsletter from "../Newsletter/Newsletter";
import LogoWebsite from "../../../assets/img/logo-website/logo.png";
import Image from '../Image/Image';
import ChangingBlock from '../Image/ChangingBlock';
import { useSelector } from "react-redux";
import {
  Container,
  FooterWrapper,
  IconLogo,
  Logo,
  SectionColumn,
  SpanDeveloper,
  SubFooter,
} from "./Footer.styles";

const Footer = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const {configMap} = useSelector((state)=> state.config);

  return (
    <div style={{ position: 'relative' }}>
    <ChangingBlock isOnClick={false} configKey={"footer-section"} editIconPosition="center">
      <FooterWrapper>
        <Container>
          <Newsletter />

          <Row type="horizontal" $justifyContent="space-around" $flexWrap>
            <SectionColumn>
              <h3>{configMap["footer-section"]?.contents[0]}</h3>
              <ul>
                <li>
                  <Link to="/">
                    <ImCompass /> {configMap["footer-section"]?.contents[1]}
                  </Link>
                </li>

                <li>
                  <Link to="/cart-summary">
                    <ImCompass /> {configMap["footer-section"]?.contents[2]}
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <ImCompass /> {configMap["footer-section"]?.contents[3]}
                  </Link>
                </li>
              </ul>
            </SectionColumn>

            <SectionColumn>
              <h3>{configMap["footer-section"]?.contents[4]}</h3>
              <ul>
                <li>
                  <Link to="/">
                    <ImCompass /> {configMap["footer-section"]?.contents[5]}
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <ImCompass /> {configMap["footer-section"]?.contents[6]}
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <ImCompass /> {configMap["footer-section"]?.contents[7]}
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <ImCompass /> {configMap["footer-section"]?.contents[8]}
                  </Link>
                </li>
              </ul>
            </SectionColumn>

            <SectionColumn>
              <h3>{configMap["footer-section"]?.contents[9]}</h3>
              <ul>
                <li className="contact-info">
                  <FaPhone color="black" /> {configMap["footer-section"]?.contents[10]}
                </li>
                <li className="contact-info">
                  <FaEnvelope color="black" /> {configMap["footer-section"]?.contents[11]}
                </li>
              </ul>
              <p>
                {configMap["footer-section"]?.contents[12]}
                <br />
                Zip: 12345
              </p>
            </SectionColumn>
          </Row>

          <IconLogo
            type="horizontal"
            $justifyContent="space-between"
            $alignItems="center"
            $flexWrap
            $flexGap="1rem"
            style={{ marginTop: "2rem" }}
          >
            <Logo>
              <Link to="/">
                <Image 
                  src={LogoWebsite} 
                  alt="logo" 
                  width="auto" 
                  height="50px"
                  objectFit="contain"
                />
              </Link>
            </Logo>
            <div>
              <ShareSocialMediaIcons iconColor="red" />
            </div>
          </IconLogo>

          <SubFooter>
            <p>
              © {currentYear} <SpanDeveloper>Koshegio-Themes</SpanDeveloper>. All
              Rights Reserved.
            </p>
            <CreditCards />
          </SubFooter>
        </Container>
      </FooterWrapper>
    </ChangingBlock>
    </div>
  );
};

export default Footer;
