import {useEffect, useState} from "react"
import {BothSideContainer, FirstBoxContainer} from "../../style/GlobalStyles";
import styled from "styled-components";
import Highlight from "./Highlight";
import {formatDate, getEventsForGrid} from "../../utils/CalendarUtils";
import {getMonthlySchedule} from "../../api/CalendarAPI";

const CalendarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: start;
  position: relative;
  
`;

const CalendarHeader = styled.div`
  font-weight: lighter;
  border-bottom: 2px solid #6378A4;
  text-align: end;
  justify-content: end;
`;

const CalendarDay = styled.div`
  border-right: 0.2px solid #6378A4;
  border-right-width: ${(props) => props.isSaturday ? 0 : 0.2};
  border-top: 0.2px solid #819cd5;
  height: 10vh;
  color: ${props => props.color != null ? '#819CD5' : '#6378A4'};
  background-color: ${props => props.color || '#ced3e1'};
  font-size: 1.3vw;
  box-sizing: border-box;
  padding: 3px;
  position: relative;
  z-index: 0;

  &:hover {
    background-color: rgb(240, 240, 240, 0.5);
  }
`;

const YearText = styled.div`
  font-size: 1.5vw;
  position: absolute;
  left: 10px;
  color: #6378A4;
  top: 2vw;
`;

const MonthText = styled.div`
  font-size: 36px;
  font-weight: lighter;
  margin: 0 20px;
  text-align: center;
  color: #6378A4
`;

const ArrowButton = styled.button`
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: #6378A4
`;
const CalendarView = () => {
    const [id, setId] = useState(() => {
        const savedId = localStorage.getItem('id');
        return savedId ? savedId : null;
    });
    const [date, setDate] = useState(new Date());
    const [highlightPositions, setHighlightPositions] = useState([]);
    const month = date.getMonth();
    const year = date.getFullYear();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month+1, 0).getDate();

    const lastDay = new Date(year, month, daysInMonth).getDay();
    const totalDays = daysInMonth + (6 - lastDay);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    const gridPositionTracker = {};
    const handlePrevMonth = () => {
        setDate(new Date(year, month-1, 1));
    };

    const handleNextMonth = () => {
        setDate(new Date(year, month+1, 1));
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                // getMonthlySchedule은 비동기 함수이므로 await으로 처리
                const events = await getMonthlySchedule(formatDate(date), id);

                // getEventsForGrid를 호출하여 그리드 이벤트 처리
                const gridEvents = getEventsForGrid(events, year, month);

                // 그리드 이벤트에 대해 위치 계산
                const newPositions = gridEvents.map((event) => {
                    const columnStart = (event.day + firstDay - 1) % 7 + 1; // 날짜의 위치
                    const rowStart = Math.floor((event.day + firstDay - 1) / 7) + 2; // 주 위치

                    const gridKey = `${rowStart}-${columnStart}`;

                    if (!gridPositionTracker[gridKey]) {
                        gridPositionTracker[gridKey] = [];
                    }
                    gridPositionTracker[gridKey].push(event);

                    const overlapIndex = gridPositionTracker[gridKey].length - 1;
                    const overlapOffset = 2 + overlapIndex * 1.8; // 중첩 인덱스를 기반으로 top 계산

                    return {
                        top: `${overlapOffset}vh`,
                        columnStart,
                        span: event.span,
                        event,
                    };
                });

                // 상태 업데이트
                setHighlightPositions(newPositions);
            } catch (error) {
                console.error('데이터 가져오기 중 오류 발생:', error);
            }
        };

        fetchData(); // 비동기 함수 호출
    }, [month, year, date, id]); // 의존성 배열에 필요한 값 추가

    return <FirstBoxContainer>
        <BothSideContainer>
            <YearText>{year}</YearText>
            <ArrowButton onClick={handlePrevMonth}>&lt;</ArrowButton>
            <MonthText>{month+1}</MonthText>
            <ArrowButton onClick={handleNextMonth}>&gt;</ArrowButton>
        </BothSideContainer>

        <CalendarWrapper>
            {["일", "월", "화", "수", "목", "금", "토"].map((day,index) => (
                <CalendarHeader key={day} style={{ color: index === 0 ? "red" : index === 6 ? "blue" : "black" }}>
                    {day}
                </CalendarHeader>
            ))}

            {Array(firstDay).fill(null).map((_, index) => (
                <CalendarDay key={`empty-${index}`}/>
            ))}

            {days.map((day) => (
                new Date(year,month,day).getTime() === today.getTime() ?
                    <CalendarDay key = {day} color = '#4F6090' >{day}</CalendarDay> :
                <CalendarDay key={day} >{day}</CalendarDay>
            ))}

            {highlightPositions.map(({ top, columnStart, span, event, overlapIndex }, index) => (
                event ? (
                    overlapIndex > 3 ?
                        <Highlight
                            text="...."
                            style={{
                                gridColumn: `${columnStart} / span ${span}`,
                                gridRow: Math.floor((event.day + firstDay - 1) / 7) + 2,
                                top: top,
                            }}
                        /> : (
                            <Highlight
                                key={event.cid}
                                text={event.name}
                                style={{
                                    gridColumn: `${columnStart} / span ${span}`,
                                    gridRow: Math.floor((event.day + firstDay - 1) / 7) + 2,
                                    top: top,
                                }}
                                color={event.color}
                            >
                                {event.name}
                            </Highlight>
                        )
                ) : null
            ))}

            {Array(totalDays - daysInMonth).fill(null).map((_, index) => (
                <CalendarDay key={`empty-last-${index}`} isSaturday={(index + lastDay) % 7 === 5} />
            ))}
        </CalendarWrapper>

    </FirstBoxContainer>
}

export default CalendarView;

const testEvents = [
    {
        name: "회의",
        start: new Date(2024, 11, 3, 10, 0), // 6월 3일 10:00
        end: new Date(2024, 11, 3, 12, 0),   // 6월 3일 12:00
        tag: "blue",
    },
    {
        name: "운동",
        start: new Date(2024, 11, 3, 10, 0), // 6월 3일 10:00
        end: new Date(2024, 11, 3, 12, 0),   // 6월 3일 12:00
        tag: "red",
    },
    {
        name: "출장",
        start: new Date(2024, 11, 4, 0, 0), // 6월 4일
        end: new Date(2024, 11, 7, 0, 0),   // 6월 7일
        tag: "green",
    },
    {
        name: "휴가",
        start: new Date(2024, 11, 8, 0, 0), // 6월 8일
        end: new Date(2024, 11, 9, 0, 0),   // 6월 9일
        tag: "red",
    },
    {
        name: "프로젝트 마감",
        start: new Date(2024, 11, 15, 0, 0), // 6월 15일
        end: new Date(2024, 11, 15, 0, 0),   // 6월 15일
        tag: "orange",
    },
];
