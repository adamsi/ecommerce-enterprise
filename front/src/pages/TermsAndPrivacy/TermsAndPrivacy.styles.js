import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MainContainer = styled.div`
  max-width: var(--max-width-screen);
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-md);
  min-height: 100vh;
  background-color: var(--background-color);
  position: relative;
`;

export const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  background: var(--background-color);
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-medium);
  overflow: hidden;
  position: relative;
`;

export const Section = styled.section`
  padding: var(--spacing-xl);
  
  &:first-child {
    padding-top: var(--spacing-xl);
  }
  
  &:last-child {
    padding-bottom: var(--spacing-xl);
  }
`;

export const SectionTitle = styled.h1`
  font-family: var(--font-primary);
  font-size: var(--font-size-h3);
  color: var(--primary-color-dark-1);
  margin-bottom: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-h4);
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-sm);
  }
`;

export const SectionContent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
  align-items: stretch;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const SubSection = styled.div`
  background: var(--primary-color-light-8);
  border-radius: var(--border-radius-medium);
  padding: var(--spacing-lg);
  border-left: 4px solid var(--primary-color);
  transition: transform var(--transition-quick), box-shadow var(--transition-quick);
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
  }
`;

export const SubSectionTitle = styled.h3`
  font-family: var(--font-secondary);
  font-size: var(--font-size-h5);
  color: var(--primary-color-dark-1);
  margin-bottom: var(--spacing-md);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-weight: 600;
  
  svg {
    color: var(--primary-color);
    font-size: 1.2em;
  }
`;

export const SubSectionContent = styled.div`
  color: var(--text-color);
  font-family: var(--font-secondary);
  font-size: var(--font-size-body);
  line-height: 1.6;
  flex: 1;
  display: flex;
  flex-direction: column;
  
  p {
    margin-bottom: var(--spacing-md);
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-color-light-1));
  border-radius: 50%;
  color: white;
  font-size: 1.5em;
  box-shadow: var(--shadow-medium);
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1.2em;
  }
`;

export const Divider = styled.hr`
  border: none;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    var(--primary-color-light-3),
    transparent
  );
  margin: 0;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: var(--spacing-md) 0;
  flex: 1;
`;

export const ListItem = styled.li`
  position: relative;
  padding: var(--spacing-sm) 0 var(--spacing-sm) var(--spacing-lg);
  color: var(--text-color);
  font-family: var(--font-secondary);
  font-size: var(--font-size-body);
  line-height: 1.5;
  
  &:before {
    content: "•";
    color: var(--primary-color);
    font-weight: bold;
    position: absolute;
    left: 0;
    top: var(--spacing-sm);
  }
  
  &:not(:last-child) {
    margin-bottom: var(--spacing-xs);
  }
`;

export const InfoBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  background: rgba(126, 145, 153, 0.04);
  border: 1px solid rgba(126, 145, 153, 0.08);
  border-radius: 6px;
  padding: var(--spacing-sm);
  margin: var(--spacing-sm) 0;
  transition: all var(--transition-quick);
  
  &:hover {
    border-color: rgba(126, 145, 153, 0.15);
    background: rgba(126, 145, 153, 0.06);
  }
`;

export const InfoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: var(--primary-color);
  font-size: 0.9em;
  flex-shrink: 0;
  transition: all var(--transition-quick);
  
  &:hover {
    transform: scale(1.1);
  }
`;



export const InfoTitle = styled.h4`
  display: none;
`;

export const InfoText = styled.p`
  color: var(--primary-color-dark-1);
  font-family: var(--font-secondary);
  font-size: var(--font-size-small);
  font-weight: 500;
  margin: 0;
  line-height: 1.4;
  opacity: 0.9;
`;

export const ContactInfo = styled.div`
  text-align: center;
  background: var(--primary-color-light-8);
  border-radius: var(--border-radius-medium);
  padding: var(--spacing-lg);
  
  p {
    color: var(--text-color);
    font-family: var(--font-secondary);
    font-size: var(--font-size-body);
    line-height: 1.6;
    margin-bottom: var(--spacing-md);
    
    &:last-child {
      margin-bottom: 0;
      font-size: var(--font-size-small);
      color: var(--grey-color);
    }
  }
`;

export const ContactLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: linear-gradient(135deg, var(--primary-color), rgba(126, 145, 153, 0.9));
  color: white;
  text-decoration: none;
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: 10px;
  font-family: var(--font-secondary);
  font-size: var(--font-size-body);
  font-weight: 600;
  transition: all var(--transition-quick);
  box-shadow: 0 2px 8px rgba(126, 145, 153, 0.15);
  margin: var(--spacing-md) 0;
  border: 1px solid rgba(126, 145, 153, 0.1);
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(126, 145, 153, 0.25);
    background: linear-gradient(135deg, var(--primary-color-dark-1), var(--primary-color));
    border-color: rgba(126, 145, 153, 0.2);
  }
  
  svg {
    font-size: 1.1em;
  }
`; 