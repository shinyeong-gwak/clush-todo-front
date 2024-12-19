export const getEventsForGrid = (events, year, month) => {
    const gridEvents = [];

    events.forEach((event) => {
        let startDay =new Date(event.start).getDate();
        let endDay = new Date(event.end).getDate();
        let startWeekDay = new Date(year, month, startDay).getDay();

        let topOffset = 2;

        // 일정이 시작하는 날부터 끝날 때까지 처리
        while (startDay <= endDay) {
            const currentDay = new Date(year, month, startDay);
            const currentWeekDay = currentDay.getDay();

            // 시작 날짜가 토요일인 경우, 새로운 행을 시작
            if (currentWeekDay === 6) {
                gridEvents.push({
                    day: startDay,
                    span: 1, // 토요일에는 1일만 표시
                    name: event.name,
                    cid: event.cid,
                    color: event.tag,
                    top: `${topOffset}vh`,
                });
                // 다음 주로 넘어가도록 처리
                startDay++;
                startWeekDay = 0;
            } else {
                // 주의 나머지 날짜
                const span = Math.min(7 - currentWeekDay, endDay - startDay + 1);
                gridEvents.push({
                    day: startDay,
                    span,
                    name: event.name,
                    cid: event.cid,
                    color: event.tag,
                    top: `${topOffset}vh`,
                });

                startDay += span;
            }
        }
    });

    return gridEvents;
};


export function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth()는 0부터 시작하므로 1을 더합니다.
    const day = String(date.getDate()).padStart(2, '0'); // 두 자릿수로 맞추기 위해 padStart 사용

    return `${year}-${month}-${day}`;
}