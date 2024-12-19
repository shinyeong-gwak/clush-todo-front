import './App.css';
import Center from "./components/center/Center";
import styled from "styled-components";
import {useState} from "react";
import LoginView from "./components/center/LoginView";


const FullScreenContainer = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;
  width: 100vw;       
`;
function App() {
    const [id, setId] = useState(() => {
        const savedId = localStorage.getItem('id');
        return savedId ? savedId : null;
    });
    return (
        <FullScreenContainer>
            {id === null ?
                <LoginView onLoginSuccess={setId}/> : (
            <Center height="1120px" userId={id}/>)}
        </FullScreenContainer>
    );
}

export default App;

//<EditPalette onButtonClick={(name) => console.log(name)}/>