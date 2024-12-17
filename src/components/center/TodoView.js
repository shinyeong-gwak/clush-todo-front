import react from "react"
import editButton from '../../assets/images/edit-button.png'
import {ButtonContainer, Container, FirstBoxContainer, IconButton, ViewBox} from "../../style/GlobalStyles";
import styled from "styled-components";
import plusButton from "../../assets/images/plus-button.png";
import minusButton from "../../assets/images/minus-button.png";
import {Bar, CategoryHeader, CategorySection, CategoryText, ListContainer, ListItem} from "./CategoryItemView";
import {getCategoryColor} from "../../utils/CategoryUtils";

// 항목 데이터
const items = [
    { tid: '1', priority: 1, complete: null, delay: false, name: '할 일 1', category: 'Work' },
    { tid: '2', priority: 2, complete: '2024-06-05T10:00:00', delay: false, name: '할 일 2', category: 'Work' },
    { tid: '3', priority: 3, complete: null, delay: false, name: '할 일 3', category: 'Personal' },
    { tid: '4', priority: 1, complete: '2024-06-04T09:00:00', delay: true, name: '할 일 4', category: 'Personal' },
    { tid: '5', priority: 2, complete: null, delay: false, name: '할 일 5', category: 'Fitness' },
    { tid: '6', priority: 3, complete: null, delay: false, name: '할 일 6', category: 'Other' },
];

const TodoView = () => {
    const groupedItems = items.reduce((acc, item) => {
        acc[item.category] = acc[item.category] || [];
        acc[item.category].push(item);
        return acc;
    }, {});

    Object.keys(groupedItems).forEach((category) => {
        groupedItems[category].sort((a, b) => {
            if (a.complete !== null && b.complete === null) {
                return -1;  // a가 b보다 앞에 오게
            }
            if (a.complete === null && b.complete !== null) {
                return 1;   // b가 a보다 앞에 오게
            }
            return a.priority - b.priority
        });
    });
    return <FirstBoxContainer>
        <ButtonContainer>
            <IconButton src={editButton}/>
        </ButtonContainer>
        <div>
            {Object.entries(groupedItems).map(([category, list]) => (
                <CategorySection key={category}>
                    <CategoryHeader>
                        <Bar color={getCategoryColor(category)} />
                        <CategoryText color={getCategoryColor(category)}>{category}</CategoryText>
                        <Bar color={getCategoryColor(category)} />
                    </CategoryHeader>
                    <ListContainer>
                        {list.map((item) => (
                            <ListItem key={item.tid} color={item.complete === null ? '#d8dce7' : '#c1c4cd'}>{item.name}</ListItem>
                        ))}
                        <ListItem color={'#d8dce7'} align={'center'}>+</ListItem>
                    </ListContainer>
                </CategorySection>
            ))}
            <CategoryHeader>
                <Bar color = 'black'/>
                <CategoryText color = 'black'>+</CategoryText>
                <Bar color = 'black'/>
            </CategoryHeader>
        </div>
    </FirstBoxContainer>

}
export default TodoView;