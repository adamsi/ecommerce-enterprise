import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlinePolicy, MdSecurity, MdPayment, MdLocalShipping, MdAssignmentReturn, MdGavel, MdLocationOn, MdContactSupport, MdInfo } from 'react-icons/md';
import Breadcrumb2 from '../../components/common/Breadcrumb/Breadcrumb2';
import ChangingBlock from '../../components/common/Image/ChangingBlock';
import { useSelector } from 'react-redux';
import {
  MainContainer,
  ContentWrapper,
  Section,
  SectionTitle,
  SectionContent,
  SubSection,
  SubSectionTitle,
  SubSectionContent,
  ContactInfo,
  ContactLink,
  IconWrapper,
  Divider,
  List,
  ListItem,
  InfoBox,
  InfoIcon,
  InfoTitle,
  InfoText
} from './TermsAndPrivacy.styles';
import CustomButton from '../../components/utils/Button/Button';

const TermsAndPrivacy = () => {
  const {configMap} = useSelector((state)=> state.config);

  return (
    <ChangingBlock configKey={"terms-privacy-page"} editIconPosition="top-left">
      <>
        <Breadcrumb2
          next="Legal"
          next2={["Terms & Privacy", "/terms-privacy"]}
          title="Terms & Privacy"
          maxWidth="1600px"
        />
        
        <MainContainer>
          <ContentWrapper>
            {/* Terms of Sale Section */}
            <Section>
              <SectionTitle>
                <IconWrapper>
                  <MdOutlinePolicy />
                </IconWrapper>
                {configMap["terms-privacy-page"]?.contents[0]}
              </SectionTitle>
              
              <SectionContent>
                <SubSection>
                  <SubSectionTitle>
                    <MdPayment />
                    {configMap["terms-privacy-page"]?.contents[1]}
                  </SubSectionTitle>
                  <SubSectionContent>
                    <p>{configMap["terms-privacy-page"]?.contents[2]}</p>
                  </SubSectionContent>
                </SubSection>

                <SubSection>
                  <SubSectionTitle>
                    <MdLocalShipping />
                    {configMap["terms-privacy-page"]?.contents[3]}
                  </SubSectionTitle>
                  <SubSectionContent>
                    <InfoBox>
                      <InfoIcon>
                        <MdInfo />
                      </InfoIcon>
                      <InfoText>Currently, we only ship to addresses within Israel.</InfoText>
                    </InfoBox>
                    <p>{configMap["terms-privacy-page"]?.contents[4]}</p>
                  </SubSectionContent>
                </SubSection>

                <SubSection>
                  <SubSectionTitle>
                    <MdAssignmentReturn />
                    {configMap["terms-privacy-page"]?.contents[5]}
                  </SubSectionTitle>
                  <SubSectionContent>
                    <p>{configMap["terms-privacy-page"]?.contents[6]}</p>
                  </SubSectionContent>
                </SubSection>
              </SectionContent>
            </Section>

            <Divider />

            {/* Privacy Policy Section */}
            <Section>
              <SectionTitle>
                <IconWrapper>
                  <MdSecurity />
                </IconWrapper>
                {configMap["terms-privacy-page"]?.contents[7]}
              </SectionTitle>
              
              <SectionContent>
                <SubSection>
                  <SubSectionTitle>
                    <MdSecurity />
                    {configMap["terms-privacy-page"]?.contents[8]}
                  </SubSectionTitle>
                  <SubSectionContent>
                    <p>{configMap["terms-privacy-page"]?.contents[9]}</p>
                  </SubSectionContent>
                </SubSection>

                <SubSection>
                  <SubSectionTitle>
                    <MdSecurity />
                    {configMap["terms-privacy-page"]?.contents[10]}
                  </SubSectionTitle>
                  <SubSectionContent>
                    <p>{configMap["terms-privacy-page"]?.contents[11]}</p>
                  </SubSectionContent>
                </SubSection>

                <SubSection>
                  <SubSectionTitle>
                    <MdSecurity />
                    {configMap["terms-privacy-page"]?.contents[12]}
                  </SubSectionTitle>
                  <SubSectionContent>
                    <p>{configMap["terms-privacy-page"]?.contents[13]}</p>
                  </SubSectionContent>
                </SubSection>
              </SectionContent>
            </Section>

            {/* Contact Information */}
            <Divider />
            
            <Section>
              <SectionTitle>
                <IconWrapper>
                  <MdContactSupport />
                </IconWrapper>
                {configMap["terms-privacy-page"]?.contents[14]}
              </SectionTitle>
              
              <SectionContent>
                <ContactInfo>
                  <p>{configMap["terms-privacy-page"]?.contents[15]}</p>
                  <CustomButton size="extra-small">
                  <Link to="/contact">
                
                    Contact Us
                  </Link>
                  </CustomButton>
                 
                </ContactInfo>
              </SectionContent>
            </Section>
          </ContentWrapper>
        </MainContainer>
      </>
    </ChangingBlock>
  );
};

export default TermsAndPrivacy; 