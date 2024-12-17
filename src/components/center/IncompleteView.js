import CategoryItemView from "./CategoryItemView";
import styled from "styled-components";
import {Container} from "../../style/GlobalStyles";


// 항목 데이터
const items = [
    { tid: '1', priority: 1, complete: null, delay: false, name: '할 일 1', category: 'Work' },
    { tid: '2', priority: 2, complete: '2024-06-05T10:00:00', delay: false, name: '할 일 2', category: 'Work' },
    { tid: '3', priority: 3, complete: null, delay: false, name: '할 일 3', category: 'Personal' },
    { tid: '4', priority: 1, complete: '2024-06-04T09:00:00', delay: true, name: '할 일 4', category: 'Personal' },
    { tid: '5', priority: 2, complete: null, delay: false, name: '할 일 5', category: 'Fitness' },
    { tid: '6', priority: 3, complete: null, delay: false, name: '할 일 6', category: 'Other' },
];

const IncompleteView = () => {
    return <Container>
        <CategoryItemView items = {items}></CategoryItemView>
        </Container>;
};

export default IncompleteView