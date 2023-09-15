import { filterByTask, getScores, getStat } from './stat.js';

// Получение данных
const getData = url => fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }, }
).then(response => {
  if (response.status !== 200) {
    throw new Error('Network status not 200.');
  }
  return response.json();
});

const filepath = './score.json'
getData(filepath).then(data => {

const libraryP1 = 2687;
const libraryP2 = 2688;
const libraryP3 = 2689;

// const readData = (filepath) => JSON.parse(fs.readFileSync(filepath).toString());

const dataAll = data;
const dataActive = dataAll.filter((st) => !!st.active);
const dataInactive = dataAll.filter((st) => !st.active);

const allStudentsCount = dataAll.length;
const activeStudentsCount = dataActive.length;
const inactiveStudentsCount = dataInactive.length;

const allPassLibraryP1 = filterByTask(dataAll, libraryP1);
const activePassLibraryP1 = filterByTask(dataActive, libraryP1);
const inactivePassLibraryP1 = filterByTask(dataInactive, libraryP1);
const allPassLP1Count = allPassLibraryP1.length;
const activePassLP1Count = activePassLibraryP1.length;
const inactivePassLP1Count = inactivePassLibraryP1.length;

const activeLibraryP1Scores = getScores(activePassLibraryP1, libraryP1);

const allPassLibraryP2 = filterByTask(dataAll, libraryP2);
const activePassLibraryP2 = filterByTask(dataActive, libraryP2);
const inactivePassLibraryP2 = filterByTask(dataInactive, libraryP2);
const allPassLP2Count = allPassLibraryP2.length;
const activePassLP2Count = activePassLibraryP2.length;
const inactivePassLP2Count = inactivePassLibraryP2.length;

const activeLibraryP2Scores = getScores(activePassLibraryP2, libraryP2);

const allPassLibraryP3 = filterByTask(dataAll, libraryP3);
const activePassLibraryP3 = filterByTask(dataActive, libraryP3);
const inactivePassLibraryP3 = filterByTask(dataInactive, libraryP3);
const allPassLP3Count = allPassLibraryP3.length;
const activePassLP3Count = activePassLibraryP3.length;
const inactivePassLP3Count = inactivePassLibraryP3.length;

const activeLibraryP3Scores = getScores(activePassLibraryP3, libraryP3);


const passL2afterLP1Count = dataActive.filter(st => st.taskResults.some(task => task?.courseTaskId === libraryP1) && st.taskResults.some(task => task?.courseTaskId === libraryP2)).length;
const passL2woLP1Count = dataActive.filter(st => !st.taskResults.some(task => task?.courseTaskId === libraryP1) && st.taskResults.some(task => task?.courseTaskId === libraryP2)).length;
const passL3afterLP2Count = dataActive.filter(st => st.taskResults.some(task => task?.courseTaskId === libraryP2) && st.taskResults.some(task => task?.courseTaskId === libraryP3)).length;
const passL3woLP2Count = dataActive.filter(st => !st.taskResults.some(task => task?.courseTaskId === libraryP2) && st.taskResults.some(task => task?.courseTaskId === libraryP3)).length;
const passL3woLP1Count = dataActive.filter(st => !st.taskResults.some(task => task?.courseTaskId === libraryP1) && st.taskResults.some(task => task?.courseTaskId === libraryP3)).length;



const ranges = [
  [0, 0],
  [1, 24],
  [25, 49],
  [50, 79],
  [80, 89],
  [90, 94],
  [95, 97],
  [98, 99],
  [100, 100],
];

const ranges2 = [
  [0, 0],
  [1, 24],
  [25, 34],
  [35, 39],
  [40, 44],
  [45, 49],
  [50, 50],
];

const ranges3 = [
    [0, 0],
    [1, 49],
    [50, 99],
    [100, 159],
    [160, 179],
    [180, 189],
    [190, 195],
    [196, 199],
    [200, 200],
  ];

const libraryP1Score = (getStat(ranges, activeLibraryP1Scores, false)).map(obj => ({label: obj.range, y: obj.count}));
const libraryP2Score = (getStat(ranges2, activeLibraryP2Scores, false)).map(obj => ({label: obj.range, y: obj.count}));
const libraryP3Score = (getStat(ranges3, activeLibraryP3Scores, false)).map(obj => ({label: obj.range, y: obj.count}));



const students = window.students.querySelector('H1');
const subtitlesMain = window.students.querySelectorAll('.subtitle');

const title = window.t1;
const subtitles = document.querySelectorAll('.wrapper1 .subtitle');

const title2 = window.t2;
const subtitles2 = document.querySelectorAll('.wrapper2 .subtitle');

const title3 = window.t3;
const subtitles3 = document.querySelectorAll('.wrapper3 .subtitle');

const passLp1 = libraryP1Score.reduce((acc, item) => acc + item.y, 0);

const passLp2 = libraryP2Score.reduce((acc, item) => acc + item.y, 0);
const passLp3 = libraryP3Score.reduce((acc, item) => acc + item.y, 0);

const passAll = filterByTask(filterByTask(activePassLibraryP1, libraryP2), libraryP3);
const passAllCount = passAll.length;

const passAllMax = passAll.filter(item => (item.taskResults.find(task => task?.courseTaskId === libraryP1).score === 100) && (item.taskResults.find(task => task?.courseTaskId === libraryP2).score === 50) && (item.taskResults.find(task => task?.courseTaskId === libraryP3).score === 200));
console.log("getData ~ passAllMax:", passAllMax)
const passAllMaxCount = passAllMax.length;

const passAll95Perc = passAll.filter(item => {
  const task1 = item.taskResults.find(task => task?.courseTaskId === libraryP1);
  const task2 = item.taskResults.find(task => task?.courseTaskId === libraryP2);
  const task3 = item.taskResults.find(task => task?.courseTaskId === libraryP3);
  
  if(task1.score === 100 && task2.score === 50 && task3.score === 200) return false;
  return  task1.score >= 95 && task2.score >= 43 && task3.score >= 190}); 
console.log("getData ~ passAll95Perc:", passAll95Perc)
const passAll95PercCount = passAll95Perc.length;


students.innerHTML = `Students: <span>All ${allStudentsCount}</span> <span>Active ${activeStudentsCount}</span>`;
subtitlesMain[0].innerHTML = `
<span>Pass All Parts: ${passAllCount} / ${activeStudentsCount}</span> 
<span>(${(passAllCount / activeStudentsCount * 100).toFixed(2)}% from active)</span>`;
subtitlesMain[1].innerHTML = `
<span>Pass All Score Max: ${passAllMaxCount} / ${activeStudentsCount}</span> 
<span>(${(passAllMaxCount / activeStudentsCount * 100).toFixed(2)}% from active)</span>`;
subtitlesMain[2].innerHTML = `
<span>Pass All Score more 95%: ${passAll95PercCount} / ${activeStudentsCount}</span> 
<span>(${(passAll95PercCount / activeStudentsCount * 100).toFixed(2)}% from active)</span>`;

title.textContent = "Library Part 1";
subtitles[0].innerHTML = `
<span>Pass all: ${allPassLP1Count} / ${allStudentsCount}</span>
<span>(${((allPassLP1Count / allStudentsCount) * 100).toFixed(2)}% from all)</span>`;
subtitles[1].innerHTML = `
<span>Pass active: ${activePassLP1Count} / ${activeStudentsCount}</span> 
<span>(${(activePassLP1Count / activeStudentsCount * 100).toFixed(2)}% from active)</span>`;

title2.textContent = "Library Part 2";
subtitles2[0].innerHTML = `
<span>Pass all: ${allPassLP2Count} / ${allStudentsCount}</span> 
<span>(${((allPassLP2Count / allStudentsCount) * 100).toFixed(2)}% from all)</span>`;
subtitles2[1].innerHTML = `
<span>Pass active: ${activePassLP2Count} / ${activeStudentsCount}</span> 
<span>(${(activePassLP2Count / activeStudentsCount * 100).toFixed(2)}% from active)</span>`;
subtitles2[2].innerHTML = `
<span>Pass LP2 after LP1: ${passL2afterLP1Count} / ${activePassLP1Count}</span> 
</span>(${(passL2afterLP1Count / activePassLP1Count * 100).toFixed(2)}% from Library#1)<span>`;
subtitles2[3].innerHTML = `
<span>Pass LP2 without LP1: ${passL2woLP1Count}</span>`;

title3.textContent = "Library Part 3";
subtitles3[0].innerHTML = `
<span>Pass all: ${allPassLP3Count} / ${allStudentsCount}</span>
<span>(${((allPassLP3Count / allStudentsCount) * 100).toFixed(2)}% from all)</span>`;
subtitles3[1].innerHTML = `
<span>Pass active: ${activePassLP3Count} / ${activeStudentsCount}</span> 
<span>(${(activePassLP3Count / activeStudentsCount * 100).toFixed(2)}% from active)</span>`;
subtitles3[2].innerHTML = `
<span>Pass LP3 after LP2: ${passL2afterLP1Count} / ${activePassLP2Count}</span> 
<span>(${(passL3afterLP2Count / activePassLP2Count * 100).toFixed(2)}% from Library#2)</span>`;
subtitles3[3].innerHTML = `
<span>Pass LP3 without LP2: ${passL3woLP2Count}</span>`;



// const passL1_top = dataActive.filter(item => item.taskResults.some(task => task?.courseTaskId === libraryP2) && (item.taskResults.find(task => task?.courseTaskId === libraryP2).score >= 45) && item.taskResults.some(task => task?.courseTaskId === libraryP1) && (item.taskResults.find(task => task?.courseTaskId === libraryP1).score >= 95));

    CanvasJS.addColorSet("greenShades",
        [//colorSet Array
            "#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0"]);
    var chart = new CanvasJS.Chart("chartContainerLP1", {
        colorSet: "greenShades",
        data: [{
            type: "doughnut",
            startAngle: 270,
            radius: "90%",
            innerRadius: "50%",
            indexLabelFontSize: 20,
            indexLabel: "{label}: {y} (#percent%)",
            dataPoints: libraryP1Score,
        }]
    });

    var chart2 = new CanvasJS.Chart("chartContainerLP2", {
        colorSet: "greenShades",
        data: [{
            type: "doughnut",
            startAngle: 260,
            radius: "90%",
            innerRadius: "50%",
            indexLabelFontSize: 20,
            indexLabel: "{label}: {y} (#percent%)",
            dataPoints: libraryP2Score,
        }]
    });

    var chart3 = new CanvasJS.Chart("chartContainerLP3", {
      colorSet: "greenShades",
      data: [{
          type: "doughnut",
          startAngle: 270,
          radius: "90%",
          innerRadius: "50%",
          indexLabelFontSize: 20,
          indexLabel: "{label}: {y} (#percent%)",
          dataPoints: libraryP3Score,
      }]
  });

    chart.render();
    chart2.render();
    chart3.render();




});


// const passL1_top = dataActive.filter(item => item.taskResults.some(task => task?.courseTaskId === libraryP2) && (item.taskResults.find(task => task?.courseTaskId === libraryP2).score >= 45) && item.taskResults.some(task => task?.courseTaskId === libraryP1) && (item.taskResults.find(task => task?.courseTaskId === libraryP1).score >= 95));
// console.log("passL1_0:", passL1_top.length)
// console.log((getStat(ranges, getScores(passL1_top, libraryP1), false)));

// console.log('pass L2 first', passL2first.length);

// const passL2firstScores = getScores(passL2first, libraryP2);
// console.log(getStat(ranges2, passL2firstScores, false))
