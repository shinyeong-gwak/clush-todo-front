import styled from "styled-components";

const pastelColors = {
    "red": "rgba(255, 182, 193, 0.6)",
    "orange": "rgba(255, 223, 186, 0.6)",
    "yellow": "rgba(255, 255, 204, 0.6)",
    "green": "rgba(204, 255, 204, 0.6)",
    "blue": "rgba(204, 229, 255, 0.6)",
    "purple": "rgba(225, 204, 255, 0.6)",
    "pink": "rgba(255, 204, 229, 0.6)"
};

const MainBox = styled.div`
  
  height: 1.5vw;
  background-color: ${(props) => props.bgColor || "rgba(0, 0, 0, 0.6)"};
  position: absolute;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  text-align: center;
  color: #333;
  z-index: 1;
  top: 2vh;
  grid-column: ${(props) => props.style?.gridColumn || "auto"};
  grid-row: ${(props) => props.style?.gridRow || "auto"};
  
`;

const SmallBox = styled.div`
  position: absolute;
  top: 0;
  width: 0.6vw;
  height: 100%;
  opacity: 100%;
  background-color: ${(props) => props.bgColor || "#999"};
`;


const LeftBox = styled(SmallBox)`
  left: 0;
`;


const RightBox = styled(SmallBox)`
  right: 0;
`;


const Highlight = ({ text, color, style, top}) => {
    return (
        <MainBox bgColor={pastelColors[color]} style={style} top ={top} className={"highlight"}>
            <LeftBox bgColor={pastelColors[color]} />
            {text}
            <RightBox bgColor={pastelColors[color]} />
        </MainBox>
    );
};

export default Highlight;