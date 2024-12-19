import React from 'react';
import styled from 'styled-components';

// 스타일링된 텍스트 필드
const TextFieldStyled = styled.input`
  padding: 10px;
  margin: 10px 0;
  width: 80%;
  border-radius: 8px;
  border: 1px solid #ced4da;
  background-color: #f5f5f5;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const TextField = ({ value, onChange, onBlur, autoFocus, placeholder }) => {
    return (
        <TextFieldStyled
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            autoFocus={autoFocus}
            placeholder={placeholder}
        />
    );
};

export default TextField;
