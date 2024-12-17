import React from 'react';
import styled from 'styled-components';
import plusButton from '../../assets/images/plus-button.png'
import minusButton from '../../assets/images/minus-button.png'
import {ViewRes} from "../../interface/ViewRes";
import {ButtonContainer, IconButton} from "../../style/GlobalStyles";
import {getCategoryColor, sortGroupedItems} from "../../utils/CategoryUtils";




export const CategorySection = styled.div`
  margin-bottom: 20px;
`;

export const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export const CategoryText = styled.span`
  font-weight: bold;
  margin: 0 10px;
  color: ${(props) => props.color || '#000'};
`;

export const Bar = styled.div`
  width: 50%;
  height: 1px;
  background-color: ${(props) => props.color || '#000'};
`;

export const ListContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 15px;
  
  background-color: #e1e1e1;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 50px;
  background-color: ${(props)=> props.color};
  color: ${props => props.color === '#c1c4cd' ? '#606060' : 'black'};
  font-size: 14px;
  justify-content: ${props => props.align === 'center' ? 'center' : 'start'};
  height: 50px;
  box-sizing: border-box;
  border-bottom: 0.5px solid #6378A4;
  &:last-child {
    border-bottom: none; // 마지막 항목은 하단 선 없앰
  }
`;


export const CategoryListView = (props) => {

    const groupedItems = props.items.reduce((acc, item) => {
        acc[item.category] = acc[item.category] || [];
        acc[item.category].push(item);
        return acc;
    }, {});

    // priority 기준 정렬
    sortGroupedItems(groupedItems);

    const handlePlusClick = (tid) => {
        console.log(`Plus clicked for item with key: ${tid}`);
    };

    const handleMinusClick = (tid) => {
        console.log(`Minus clicked for item with key: ${tid}`);
    };

    // priority 기준 정렬
    Object.keys(groupedItems).forEach((category) => {
        groupedItems[category].sort((a, b) => a.priority - b.priority);
    });

    return (
        <div>
            {Object.entries(groupedItems).map(([category, list]) => (
                <CategorySection key={category}>
                    {/* Category 헤더 */}
                    <CategoryHeader>
                        <Bar color={getCategoryColor(category)} />
                        <CategoryText color={getCategoryColor(category)}>{category}</CategoryText>
                        <Bar color={getCategoryColor(category)} />
                    </CategoryHeader>
                    {/* ListContainer */}
                    <ListContainer>
                        {list.map((item) => (
                            <ListItem key={item.tid}>{item.name}
                                <ButtonContainer>
                                    <IconButton
                                        src={plusButton}
                                        alt="Plus"
                                        onClick={() => handlePlusClick(item.tid)}
                                    />
                                    <IconButton
                                        src={minusButton}
                                        alt="Minus"
                                        onClick={() => handleMinusClick(item.tid)}
                                    />
                                </ButtonContainer>
                            </ListItem>
                        ))}
                    </ListContainer>
                </CategorySection>
            ))}
        </div>
    );
};

export default CategoryListView;
