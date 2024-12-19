import CategoryItemView from "./CategoryItemView";
import {Container} from "../../style/GlobalStyles";
import {getDelayedTodos, getTodos} from "../../api/CalendarAPI";
import {useEffect, useState} from "react";


// 항목 데이터
const items = [
    { tid: '1', priority: 1, complete: null, delay: false, name: '할 일 1', category: 'Work' },
    { tid: '2', priority: 2, complete: '2024-06-05T10:00:00', delay: false, name: '할 일 2', category: 'Work' },
    { tid: '3', priority: 3, complete: null, delay: false, name: '할 일 3', category: 'Personal' },
    { tid: '4', priority: 1, complete: '2024-06-04T09:00:00', delay: true, name: '할 일 4', category: 'Personal' },
    { tid: '5', priority: 2, complete: null, delay: false, name: '할 일 5', category: 'Fitness' },
    { tid: '6', priority: 3, complete: null, delay: false, name: '할 일 6', category: 'Other' },
];

const IncompleteView = ({ fetch, setFetch }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = () => {
            getDelayedTodos(localStorage.getItem('id'))
                .then((data) => {
                    setData(data);  // 데이터를 상태로 설정
                    setLoading(false);  // 로딩 상태 업데이트
                })
                .catch((error) => {
                    console.error('Error fetching todos:', error);
                    setLoading(false);
                });
        };

        fetchData();
    }, [fetch]);

    // 로딩 상태일 때 로딩 표시
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <CategoryItemView items={data} fetch={fetch} setFetch={setFetch} />
        </Container>
    );
};

export default IncompleteView