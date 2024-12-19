import React, { useState } from 'react';
import styled from 'styled-components';
import {login, register} from "../../api/CalendarAPI";

const Container = styled.div`
  width: 300px;
  height: 500px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin-right: ${(props) => (props.last ? '0' : '10px')};
`;

const LoginView = ({onLoginSuccess}) => {
    // 임시 방편.
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginClick = async () => {
        try {
            const data = await login(id, password);
            console.log('Login successful:', data);
            localStorage.setItem('id', id);
            onLoginSuccess(id);
        } catch (error) {
            console.error('Login failed:', error);
            alert('잘못된 패스워드입니다. 등록하지 않았다면 해주세요.');
        }
    };

    const handleRegisterClick = async () => {
        try {
            const data = await register(id, password);
            alert('등록되었습니다. 로그인해주세요.');
            console.log('Register successful:', data);
        } catch (error) {
            console.error('Register failed:', error);
            alert('이미 존재하는 아이디입니다. 다른 아이디를 선택해주세요.');
        }
    };

    return (
        <Container>
            <Title>Login</Title>
            <div>
                <Input
                    type="text"
                    placeholder="ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <Button onClick={handleLoginClick}>Login</Button>
            <Button onClick={handleRegisterClick} last>Register</Button>
        </Container>
    );
};

export default LoginView;
