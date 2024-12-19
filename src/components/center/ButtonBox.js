import React from 'react';
import styled from 'styled-components';
import editButton from '../../assets/images/edit-button.png'
import addButton from '../../assets/images/add-button.png'
import {BothSideContainer, IconButton} from "../../style/GlobalStyles";

// ButtonBox 컴포넌트
export const ButtonBox = ({ onEdit, onAdd }) => {
    return (
        <BothSideContainer>
            <IconButton onClick={onEdit} src={editButton}/>
            <IconButton onClick={onAdd} src={addButton}/>
        </BothSideContainer>
    );
};

export default ButtonBox;
