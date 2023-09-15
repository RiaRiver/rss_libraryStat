
export const filterByTask = (data, taskId) => data.filter(item => item.taskResults.some(task => task?.courseTaskId === taskId));

export const getScores = (students, taskId) => students.reduce((acc, item,) => {
    const score = (item.taskResults.find(task => task?.courseTaskId === taskId).score);
    acc[score] = ++acc[score] || 1;
    return acc;
}, []);

export const getStat = (ranges, scores, percentFlag) => {
    const totalTask = scores.reduce((acc, score) => acc + score, 0)
    return ranges.map(([min, max]) => {
        let result = 0;
        for (let i = min; i <= max; i++) {
            result += scores[i] || 0;
        }
        return {
            range: `${min}-${max}`,
            count: result,
            ...(percentFlag && {
                percentage: (result / totalTask * 100).toFixed(2)
            }),
        }
    })
};