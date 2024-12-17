import react, {useState} from "react"
import {ViewBox, TabItem, FirstBoxContainer} from "../../style/GlobalStyles";
import styled from "styled-components"
import ButtonBox from "./ButtonBox";
import TimeDetailView from "./TimeDetailView";
import IncompleteView from "./IncompleteView";
import TodoView from "./TodoView";
import CalendarView from "./CalendarView";

const TabsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  height: 100%;
`;


const CenterContainer = styled.div`
  display: flex;
  width: 686px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`;

export const Center = ({height}) => {
  const handleEdit = () => {
    console.log('Edit button clicked');
  };

  const handleAdd = () => {
    console.log('Add button clicked');
  };
  const [activeTab, setActiveTab] = useState(0);
  return <CenterContainer>
    <FirstBoxContainer>
    <div className="Main" >
      <TabsWrapper>
        <TabItem
            label="Calendar"
            isActive={activeTab === 0}
            onClick={() => setActiveTab(0)}
        >일정</TabItem>
        <TabItem
            label="Todo"
            isActive={activeTab === 1}
            onClick={() => setActiveTab(1)}
        >할 일</TabItem>
      </TabsWrapper>
      <ViewBox height="612px">
        {activeTab === 0 ? (
          <CalendarView/>
        ) : (
          <TodoView/>
        )}
      </ViewBox>

    </div>
    {activeTab === 0 ? (
      <div className="CalendarDetail">
          <ButtonBox onAdd={handleAdd} onEdit={handleEdit}/>
          <TimeDetailView></TimeDetailView>
      </div> ) : (
      <div className="TodoDetail">
        <h3>미완료</h3>
        <IncompleteView/>
      </div>
    )}
  </FirstBoxContainer>
  </CenterContainer>;
};

export default Center;