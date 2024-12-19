import styled from "styled-components"

export const ViewBox = styled.div`
    background-color: #CED3E1;
    width: 100%;
    height: auto;
    min-height: ${(props) => props.height || 'auto'};
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

export const Container = styled.div`
  background-color: ${(props) => (props.color ? props.color : '#D9D9D9')};
  overflow: hidden;
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  border-radius: 20px;
`;
export const IconButton = styled.img`
  width: 40px; /* 버튼 이미지 너비 */
  height: 40px; /* 버튼 이미지 높이 */
  cursor: pointer; /* 마우스 오버 시 포인터 */
  transition: filter 0.3s ease;
  &:hover {
    filter: grayscale(100%) brightness(0.7); /* 호버 시 회색 + 어두운 효과 */
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-left: auto;
  width: auto;
  gap: 10px; /* 버튼 사이의 간격 */
`;

export const FirstBoxContainer = styled.div`
  padding: 10px 20px;
  box-sizing: border-box;
  flex-direction: column;
  display: flex;
  gap: 2px;
  position:relative;
`;

export const BothSideContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 10px 0;
`;

export const CategorySection = styled.div`
  margin-bottom: 20px;
`;

export const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export const CategoryText = styled.span`
  font-weight: bold;
  margin: 0 10px;
  text-align: center;
  color: ${(props) => props.color || '#000'};
`;

export const Bar = styled.div`
  width: 50%;
  height: 1px;
  background-color: ${(props) => props.color || '#000'};
`;

export const ListContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 15px;
  
  background-color: #e1e1e1;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 50px;
  background-color: ${(props)=> props.color};
  color: ${props => props.color === '#c1c4cd' ? '#606060' : 'black'};
  font-size: 14px;
  justify-content: ${props => props.align === 'center' ? 'center' : 'start'};
  height: 50px;
  box-sizing: border-box;
  border-bottom: 0.5px solid #6378A4;
  &:last-child {
    border-bottom: none; // 마지막 항목은 하단 선 없앰
  }
`;