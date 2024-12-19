import axios from 'axios';

// Axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,//'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

// 로그인
export const login = async (id, pw) => {
    const response = await apiClient.post('/user/login', { id, pw });
    return response.data;
};

// 등록
export const register = async (id, pw) => {
    const response = await apiClient.post('/user/register', { id, pw });
    return response.data;
};

// 일정 추가하기
export const addSchedule = async (userId, schedule) => {
    const response = await apiClient.post('/schedule', { userId, schedule });
    return response.data;
};

// 한 달 일정 조회하기
export const getMonthlySchedule = async (date, userId) => {
    const response = await apiClient.get('/schedule/month', {
        params: { date, userId },
    });
    console.log(Array.isArray(response.data));
    console.log(response.data);
    return response.data;
};

// 일정 상세 조회하기
export const getDailySchedule = async (date, userId) => {
    const response = await apiClient.get('/schedule/day', {
        params: { date, userId },
    });
    return response.data;
};

// 일정 수정하기
export const updateSchedule = async (id, userId, schedule) => {
    const response = await apiClient.put(`/schedule/${id}`, { id, userId, schedule });
    return response.data;
};

// 일정 삭제하기
export const deleteSchedule = async (id) => {
    const response = await apiClient.delete(`/schedule/${id}`);
    return response.data;
};

// 할일 추가하기
export const addTodo = async (userId, todo) => {
    const response = await apiClient.post('/todo', { userId, todo });
    return response.data;
};

// 할일 완료하기
export const completeTodo = async (id) => {
    const response = await apiClient.patch(`/todo/${id}/complete/t`);
    return response.data;
};

// 할일 완료 취소하기
export const incompleteTodo = async (id) => {
    const response = await apiClient.patch(`/todo/${id}/complete/f`);
    return response.data;
};

// 할일 미루기
export const delayTodo = async (id,delay) => {
    const response = await apiClient.patch(`/todo/${id}/delay`, null,{
        params: { delay },
    });
    return response.data;
};

// 할일 삭제하기
export const deleteTodo = async (id) => {
    const response = await apiClient.delete(`/todo/${id}`);
    return response.data;
};

// 할일 수정하기
export const updateTodo = async (id, userId, todo) => {
    const response = await apiClient.put(`/todo/${id}`, { id, userId, todo });
    return response.data;
};

// 할일 조회하기
export const getTodos = async (userId) => {
    const response = await apiClient.get('/todo', {
        params: { userId },
    });

    console.log(response.data);
    return response.data;
};

// 다한 일 조회하기
export const getCompletedTodos = async (userId) => {
    const response = await apiClient.get('/todo/complete', {
        params: { userId },
    });
    return response.data;
};

// 못한 일 조회하기
export const getDelayedTodos = async (userId) => {
    const response = await apiClient.get('/todo/delay', {
        params: { userId },
    });
    return response.data;
};
