import styled from "styled-components";

export const UserInfoWrapper = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  color: #000;
  display: flex;
  flex-direction: column; 
  align-items: center; 
  text-align: center; 
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const UserName = styled.h3`
  margin: 0;
`;

export const UserInfoItem = styled.p`
  margin: 5px 0;
`;

export const ContactContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const ContactCard = styled.div`
  margin-top: 5rem;
  flex: 0 1 calc(50% - 10px);
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  color: #000; /* Add text color */
  @media (max-width: 768px) {
    padding: 10px;
    flex: 0 1 100%;
  }
`;

export const ContactName = styled.h3`
  margin: 0;
`;

export const ContactInfoItem = styled.p`
  margin: 5px 0;
`;

const Button = styled.button`
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  & + & {
    margin-left: 10px;
  }
`;

export const EditButton = styled(Button)`
  background-color: #4caf50;
  &:hover {
    background-color: #45a049;
  }
`;

export const RemoveButton = styled(Button)`
  background-color: #f44336;
  &:hover {
    background-color: #d32f2f;
  }
`;

export const DashboardContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;