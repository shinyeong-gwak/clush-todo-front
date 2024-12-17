import React from 'react';
import styled from 'styled-components';
import editButton from '../../assets/images/edit-button.png'
import addButton from '../../assets/images/add-button.png'
import {IconButton} from "../../style/GlobalStyles";

// ButtonBox 컴포넌트
export const ButtonBox = ({ onEdit, onAdd }) => {
    return (
        <Container>
            <IconButton onClick={onEdit} src={editButton}/>
            <IconButton onClick={onAdd} src={addButton}/>
        </Container>
    );
};

// 스타일 정의
const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 10px 0;
`;

export default ButtonBox;
