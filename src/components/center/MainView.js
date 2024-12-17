import react, {useState} from "react"
import {ViewBox, TabItem} from "../../style/GlobalStyles";
import styled from "styled-components"
import ButtonBox from "./ButtonBox";
import TimeDetailView from "./TimeDetailView";

const TabsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  height: 100%;
`;

const FirstBoxContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2px;
`;

const CenterContainer = styled.div`
  display: flex;
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
        {activeTab === 0 ? 'Tab 1 내용' : 'Tab 2 내용'}
      </ViewBox>

    </div>
    {activeTab === 0 ? (
      <div className="CalendarDetail">
          <ButtonBox onAdd={handleAdd} onEdit={handleEdit}/>
          <TimeDetailView></TimeDetailView>
      </div> ) : (
      <div className="TodoDetail">

      </div>
    )}
  </FirstBoxContainer>
  </CenterContainer>;
};

export default Center;