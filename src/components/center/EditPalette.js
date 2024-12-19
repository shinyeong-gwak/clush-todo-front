import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import cancelButton from '../../assets/images/cancel-button.png'
import doneButton from '../../assets/images/done-button.png'

// 팔레트의 배경 스타일 설정
const PaletteContainer = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  padding: 50px;
  width: 70%;
  bottom: 5vh;
  gap: 20px;
`;

// 버튼들을 감싸는 컨테이너
const ButtonContainer = styled.div`
  display: flex;
  background-color: #505050;
  border-radius: 50px;
  width: auto;
  padding: 10px 40px;
  box-sizing: border-box;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

// 각각의 동그란 버튼 스타일
const CircleButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  justify-content: center; align-items: center;
  display: flex;

  &:hover {
    opacity: 0.8;
  }
`;
const CircleButtonImage = styled.img`
  width: 160%;  // 이미지를 버튼 크기의 80%로 조정
  height: 160%;  // 이미지를 버튼 크기의 80%로 조정
  object-fit: cover;  // 이미지를 버튼 크기에 맞게 잘라서 맞춤
`;
const Palette = ({ onButtonClick }) => {
    // 각 색상에 대한 정보를 배열로 저장
    const colors = [
        { name: 'red', color: '#FF8A8A' },
        { name: 'orange', color: '#FFB58A' },
        { name: 'yellow', color: '#F1FF8A' },
        { name: 'green', color: '#8AFF96' },
        { name: 'blue', color: '#8ADCFF' },
        { name: 'purple', color: '#948AFF' },
        { name: 'pink', color: '#FF8AF3' },
    ];

    const [isVisible, setIsVisible] = useState(true); // 팔레트의 표시 여부
    const paletteRef = useRef(null); // 팔레트 컨테이너 참조

    // 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (paletteRef.current && !paletteRef.current.contains(event.target)) {
                setIsVisible(false); // 외부 클릭 시 팔레트 숨기기
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // 각 버튼이 클릭되었을 때, 이름을 넘기는 함수
    const handleClick = (name) => {
        if (onButtonClick) {
            onButtonClick(name);
        }
        setIsVisible(false); // 버튼 클릭 시 팔레트 숨기기
    };

    // 팔레트가 visible이면만 렌더링
    if (!isVisible) {
        return null;
    }

    function editColor(name) {
        console.log(name);
    }

    return (
        <PaletteContainer ref={paletteRef}>
            {/* 왼쪽 취소 버튼 */}
            <CircleButton alt="Cancel" bgColor={'white'} onClick={() => handleClick('cancel')} >
                <CircleButtonImage src={cancelButton} />
            </CircleButton>

            {/* 버튼들 */}
            <ButtonContainer>
                {colors.map(({ name, color }) => (
                    <div key={name}>
                        <CircleButton bgColor={color} onClick={() => editColor(name)} />
                    </div>
                ))}
            </ButtonContainer>

            {/* 오른쪽 완료 버튼 */}
            <CircleButton alt="Done" bgColor={'white'} onClick={() => handleClick('done')} >
                <CircleButtonImage src={doneButton} />
            </CircleButton>
        </PaletteContainer>
    );
};

export default Palette;