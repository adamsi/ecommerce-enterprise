import styled from "styled-components";
import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaLocationPin } from "react-icons/fa6";
import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb";
import Heading from "../../components/utils/Heading/heading";
import CustomButton from "../../components/utils/Button/Button";
import ChangingBlock from "../../components/common/Image/ChangingBlock";
import { useSelector } from "react-redux";
import {
  AiOutlineClockCircle,
  AiOutlineEnvironment,
  AiOutlinePhone,
} from "react-icons/ai";

// Styled Components
const ContactPageContainer = styled.section`
  background: linear-gradient(135deg, var(--light-grey-color), #fff);
  position: relative;
  margin-bottom: var(
    --spacing-xxxl
  ); // Adding extra bottom padding for a more balanced layout
`;

const Wrapper = styled.div`
  max-width: var(--max-width-screen);
  margin: 5rem auto;
  padding: 0 var(--spacing-md);
  position: relative;

  @media (max-width: 768px) {
    padding: 0 var(--spacing-sm);
  }
`;

const FlexContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: var(--spacing-xxl);
  margin-bottom: var(--spacing-xxl);
  position: relative;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-lg);
  }
`;

const ContactFormContainer = styled.div`
  flex: 1;
  background: white;
  border-radius: var(--border-radius-medium);
  z-index: 2;
  max-width: 35rem;
  margin-bottom: 3.5rem;
  position: relative;
`;

const Form = styled.form`
  margin: 0 auto;
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-medium);
  font-family: var(--font-primary);
  position: relative;

  p {
    font-size: var(--font-size-body);
    color: var(--dark-grey-color);
    margin-bottom: var(--spacing-lg);
  }
`;

const InfoArea = styled.div`
  flex: 1;
  background: white;
  border-radius: var(--border-radius-medium);
  color: var(--dark-grey-color);
  max-width: 35rem;
  padding: var(--spacing-lg);
  position: relative;
  @media (max-width: 1200px) {
    width: 100%;
  }
  .info-item {
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-md);
    font-size: var(--font-size-body);
    font-family: var(--font-secondary);

    svg {
      margin-right: var(--spacing-md);
      color: var(--primary-color-dark-3);
      font-size: var(--font-size-h5);
    }

    span {
      color: var(--text-color);
    }
  }

  @media (max-width: 768px) {
    margin-bottom: var(--spacing-lg);
  }
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 400px;
  border-radius: var(--border-radius-medium);
  overflow: hidden;
  margin: var(--spacing-xxl) 0;
  position: relative;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  @media (max-width: 768px) {
    height: 250px;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: var(--spacing-md);
  border: 2px solid var(--light-grey-color);
  border-radius: var(--border-radius-small);
  font-size: var(--font-size-body);
  font-family: var(--font-primary);
  margin-bottom: var(--spacing-md);
  transition: border-color var(--transition-quick);
  position: relative;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  &::placeholder {
    color: var(--dark-grey-color);
    opacity: 0.7;
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: var(--spacing-md);
  border: 2px solid var(--light-grey-color);
  border-radius: var(--border-radius-small);
  font-size: var(--font-size-body);
  font-family: var(--font-primary);
  margin-bottom: var(--spacing-md);
  min-height: 120px;
  resize: vertical;
  transition: border-color var(--transition-quick);
  position: relative;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  &::placeholder {
    color: var(--dark-grey-color);
    opacity: 0.7;
  }
`;
const AdditionalInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-xxl);
  position: relative;

  .info-block {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-lg);
    padding: var(--spacing-lg);
    background: white;
    border-radius: var(--border-radius-medium);
    box-shadow: var(--shadow-small);
    transition: transform var(--transition-quick), box-shadow var(--transition-quick);
    position: relative;

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-medium);
    }

    .icon-circle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      background: var(--primary-color-dark-3);
      box-shadow: 0 0 0 0 var(--primary-color);
      transition: box-shadow 0.5s ease;
      position: relative;

      svg {
        color: white;
        font-size: 1.5rem;
      }
    }

    &:hover .icon-circle {
      box-shadow: 0 0 20px 5px var(--primary-color);
      position: relative;
    }

    span {
      margin-left: var(--spacing-lg);
      color: var(--text-color);
      font-size: var(--font-size-body);
      line-height: 1.8;
      flex: 1;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);

    .info-block {
      padding: var(--spacing-md);
      text-align: center;
      flex-direction: column;
      position: relative;

      .icon-circle {
        margin-bottom: var(--spacing-md);
        position: relative;
      }

      span {
        margin-left: 0;
        font-size: var(--font-size-body-sm);
      }
    }
  }
`;

// Main Component
const ContactPage = () => {
  const latitude = 37.7749;
  const longitude = -122.4194;
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.1242362191035!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1619430307215!5m2!1sen!2sin`;
  const {configMap} = useSelector((state)=> state.config);

  return (
    <ChangingBlock configKey={"contact-page"} editIconPosition="top-left">
      <ContactPageContainer>
        <Breadcrumb
          next="Shop"
          imageUrl="/breadcrumb/natural.jpeg"
          title="Contact"
        />
        <Wrapper>
          <FlexContent>
            <ContactFormContainer>
              <Form>
                <Heading as="h2">{configMap["contact-page"]?.contents[0]}</Heading>
                <p>
                  {configMap["contact-page"]?.contents[1]}
                </p>
                <StyledInput type="text" placeholder="Name" />
                <StyledInput type="email" placeholder="Email" />
                <StyledTextarea placeholder="Message"></StyledTextarea>
                <CustomButton size="extra-small">Send Message</CustomButton>
              </Form>
            </ContactFormContainer>
            <InfoArea>
              <Heading as="h2">{configMap["contact-page"]?.contents[2]}</Heading>
              <div className="info-item">
                <IoIosCall />
                <span>{configMap["contact-page"]?.contents[3]}</span>
              </div>
              <div className="info-item">
                <MdEmail />
                <span>{configMap["contact-page"]?.contents[4]}</span>
              </div>
              <div className="info-item">
                <FaLocationPin />
                <span>{configMap["contact-page"]?.contents[5]}</span>
              </div>
            </InfoArea>
          </FlexContent>
          <MapWrapper>
            <iframe title="Map" src={mapUrl} loading="lazy"></iframe>
          </MapWrapper>

          <AdditionalInfo>
            <div className="info-block">
              <div className="icon-circle">
                <AiOutlineClockCircle />
              </div>
              <div>
                <Heading as="h3">{configMap["contact-page"]?.contents[6]}</Heading>
                <p>{configMap["contact-page"]?.contents[7]}</p>
                <p>{configMap["contact-page"]?.contents[8]}</p>
                <p>{configMap["contact-page"]?.contents[9]}</p>
              </div>
            </div>
            <div className="info-block">
              <div className="icon-circle">
                <AiOutlineEnvironment />
              </div>
              <div>
                <Heading as="h3">{configMap["contact-page"]?.contents[10]}</Heading>
                <p>{configMap["contact-page"]?.contents[11]}</p>
                <p>{configMap["contact-page"]?.contents[12]}</p>
              </div>
            </div>
            <div className="info-block">
              <div className="icon-circle">
                <AiOutlinePhone />
              </div>
              <div>
                <Heading as="h3">{configMap["contact-page"]?.contents[13]}</Heading>
                <p>{configMap["contact-page"]?.contents[14]}</p>
                <p>{configMap["contact-page"]?.contents[15]}</p>
              </div>
            </div>
          </AdditionalInfo>
        </Wrapper>
      </ContactPageContainer>
    </ChangingBlock>
  );
};

export default ContactPage;
