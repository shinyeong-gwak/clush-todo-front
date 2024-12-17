import styled from "styled-components"

export const ViewBox = styled.div`
    background-color: #CED3E1;
    width: 686px;
    height: ${(props) => props.height || 'auto'};
    border-radius: 0 20px 20px 20px;
    `;


export const TabItem = styled.div`
  width: 110px;
  height: ${(props) => (props.isActive ? '42px' : '37px')};
  background-color: ${(props) => (props.isActive ? '#CED3E1' : '#E1E1E1')};
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px 20px 0 0;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 5px;  /* 각 탭 간의 간격 */
`;