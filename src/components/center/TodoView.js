import { useState, useEffect } from "react";
import { addTodo, getTodos, completeTodo, incompleteTodo } from "../../api/CalendarAPI";
import { ButtonContainer, FirstBoxContainer, IconButton, Bar, CategoryHeader, CategorySection, CategoryText, ListContainer, ListItem } from "../../style/GlobalStyles";

import { getCategoryColor } from "../../utils/CategoryUtils";
import editButton from '../../assets/images/edit-button.png';
import TextField from "./TextField";

const TodoView = ({ fetch, setFetch }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showTextField, setShowTextField] = useState({});
    const [newItem, setNewItem] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const userId = localStorage.getItem('id');

    useEffect(() => {
        const fetchData = () => {
            getTodos(localStorage.getItem('id'))
                .then((data) => {
                    setData(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching todos:', error);
                    setLoading(false);
                });
        };

        fetchData();
    }, [fetch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleAddTodo = (category, priority) => {
        if (!newItem.trim()) return;
        addTodo(userId, {
            "name": newItem,
            "category": category,
            "priority": priority + 1
        }).then(() => {
            setShowTextField(prev => ({ ...prev, [category]: false }));
            setNewItem('');
            setFetch(prev => !prev);
        });
    };

    const handleAddCategory = () => {
        if (!newCategory.trim()) return;
        const newCategoryName = newCategory.trim();


        setData(prevData => ([...prevData, { category: newCategoryName, items: [] }]));
        setNewCategory('');
        setShowTextField(prev => ({ ...prev, newCategory: false }));
    };

    const groupedItems = data.reduce((acc, item) => {
        acc[item.category] = acc[item.category] || [];
        acc[item.category].push(item);
        return acc;
    }, {});

    Object.keys(groupedItems).forEach((category) => {
        groupedItems[category].sort((a, b) => {
            if (a.complete !== null && b.complete === null) {
                return -1;
            }
            if (a.complete === null && b.complete !== null) {
                return 1;
            }
            return a.priority - b.priority;
        });
    });

    return (
        <FirstBoxContainer>
            <ButtonContainer>
                <IconButton src={editButton} />
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
                                <ListItem
                                    key={item.tid}
                                    color={item.complete === null ? '#d8dce7' : '#c1c4cd'}
                                    onClick={() => {
                                        item.complete === null
                                            ? completeTodo(item.tid).then(() => setFetch(prev => !prev))
                                            : incompleteTodo(item.tid).then(() => setFetch(prev => !prev));
                                    }}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {item.name}
                                </ListItem>
                            ))}
                            <ListItem
                                color={'#d8dce7'}
                                align={'center'}
                                onClick={() => setShowTextField(prev => ({ ...prev, [category]: true }))}
                                style={{ cursor: 'pointer' }}
                            >
                                {showTextField[category] ? (
                                    <TextField
                                        value={newItem}
                                        onChange={(e) => setNewItem(e.target.value)}
                                        onBlur={() => handleAddTodo(category, Math.max(...list.map(item => item.priority)))}
                                        autoFocus
                                        placeholder="새 할 일 입력"
                                    />
                                ) : (
                                    '+'
                                )}
                            </ListItem>
                        </ListContainer>
                    </CategorySection>
                ))}
                <CategoryHeader>
                    <Bar color='black' />
                    <CategoryText color='black'>
                        {showTextField.newCategory ? (
                            <TextField
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                onBlur={handleAddCategory}
                                autoFocus
                                placeholder="새 카테고리 입력"
                            />
                        ) : (
                            <span style={{ cursor: 'pointer' }} onClick={() => setShowTextField(prev => ({ ...prev, newCategory: true }))}>
                +
              </span>
                        )}
                    </CategoryText>
                    <Bar color='black' />
                </CategoryHeader>
            </div>
        </FirstBoxContainer>
    );
};

export default TodoView;
