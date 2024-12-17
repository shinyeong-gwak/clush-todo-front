export const dynamicColorMap = new Map();
export let colorIndex = 0;

const colorPalette = ['#cc5f3c', '#6aa0bd', '#6db378', '#c1b464', '#b785c2', '#d998a5'];
export const getCategoryColor = (category) => {
    if (!dynamicColorMap.has(category)) {
        const color = colorPalette[colorIndex % colorPalette.length];
        dynamicColorMap.set(category, color);
        colorIndex++;
    }
    return dynamicColorMap.get(category);
};

// priority 기준으로 그룹화된 아이템 정렬
export const sortGroupedItems = (groupedItems) => {
    Object.keys(groupedItems).forEach((category) => {
        groupedItems[category].sort((a, b) => a.priority - b.priority);
    });
};