import styled, { keyframes } from "styled-components";

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.5),
                0 0 10px rgba(255, 255, 255, 0.3),
                0 0 15px rgba(255, 255, 255, 0.1);
  }
  50% {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.8),
                0 0 20px rgba(255, 255, 255, 0.6),
                0 0 30px rgba(255, 255, 255, 0.4);
  }
`;

const EnvironmentBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.5rem;
  color: black;
  border: 1px solid rgba(29, 32, 207, 0.3);
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 700;
  margin-left: 4rem;
  font-family: 'Segoe UI', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  animation: ${glow} 2s ease-in-out infinite;
  backdrop-filter: blur(10px);
  min-width: 70px;
  height: 28px;
  
  @media (max-width: 610px) {
    display: none;
  }
`;

const EnvironmentIndicator = () => {
  const environment = import.meta.env.VITE_JTV_ENVIRONMENT;
  
  // Only show if environment is not production and is defined
  if (!environment || environment === 'production') {
    return null;
  }

  return (
    <EnvironmentBox>
      {environment}
    </EnvironmentBox>
  );
};

export default EnvironmentIndicator; 