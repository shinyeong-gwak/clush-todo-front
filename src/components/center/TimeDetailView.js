import React from 'react';
import styled from 'styled-components';

// 12개의 항목을 가진 컴포넌트
export const TimeList = () => {
    const times = [
        'AM 00:00', 'AM 02:00', 'AM 04:00', 'AM 06:00', 'AM 08:00', 'AM 10:00',
        'PM 12:00', 'PM 02:00', 'PM 04:00', 'PM 06:00', 'PM 08:00', 'PM 10:00'
    ];

    return (
        <Container>
            {times.map((time, index) => (
                <ListItem key={index}>
                    <LeftSide>{time}</LeftSide>
                    <RightSide />
                </ListItem>
            ))}
        </Container>
    );
};

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  border-radius: 0 20px 20px 0;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #fff;
  border-bottom: 0.5px solid #6378A4;
  height: 55px;
  &:last-child {
    border-bottom: none; // 마지막 항목은 하단 선 없앰
  }
`;

const LeftSide = styled.div`
  display: flex;
  width: 10%;
  height: 100%;
  color: #6378A4;
  font-size: 9px;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 5px 0 0 5px;
`;

const RightSide = styled.div`
  width: 90%;
  background-color: #D9D9D9;
  height: 100%;
`;

export default TimeList;
