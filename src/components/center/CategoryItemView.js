import React from 'react';

import plusButton from '../../assets/images/plus-button.png'
import minusButton from '../../assets/images/minus-button.png'

import {
    Bar,
    ButtonContainer,
    CategoryHeader,
    CategorySection,
    CategoryText,
    IconButton, ListContainer, ListItem
} from "../../style/GlobalStyles";
import {getCategoryColor, sortGroupedItems} from "../../utils/CategoryUtils";
import {delayTodo, deleteTodo, restartTodo} from "../../api/CalendarAPI";






export const CategoryListView = ({items, fetch, setFetch }) => {

    const groupedItems = items.reduce((acc, item) => {
        acc[item.category] = acc[item.category] || [];
        acc[item.category].push(item);
        return acc;
    }, {});

    // priority 기준 정렬
    sortGroupedItems(groupedItems);

    const handlePlusClick = (tid) => {
        delayTodo(tid,false).then(() => setFetch(prev => !prev))
    };

    const handleMinusClick = (tid) => {
        deleteTodo(tid).then(() => setFetch(prev => !prev))
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
