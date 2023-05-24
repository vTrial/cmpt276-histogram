const addToHist = (gradeIn) => {
    let lowerBounds = document.querySelectorAll('.lower-bounds-input');
    let lowerBoundFound = false;
    let lowerBoundsIndex = 0;
    while (!lowerBoundFound && lowerBoundsIndex < lowerBounds.length) {
        if (gradeIn > Number(lowerBounds[lowerBoundsIndex].value)) {
            lowerBoundsIndex -= 1;
            lowerBoundFound = true;
        }
        lowerBoundsIndex += 1;
    }
    // if lower than f, we don't crash :)
    if (!lowerBoundFound) {
        return;
    }
    let lowerBoundsToHist = document.querySelectorAll(".histogram-value")[lowerBoundsIndex];
    lowerBoundsToHist.innerHTML += "✗";
}

const clearHist = () => {
    let histList = document.querySelectorAll(".histogram-value");
    histList.forEach(hist => {
        hist.innerHTML = ""
    });
}
let grades = []

let newGrade = document.getElementById("new-grade")
newGrade.onkeydown = (event) => {
    if (event.code == "Enter") {
        let gradeIn = Number(document.getElementById("new-grade").value);
        grades.push(gradeIn);
        addToHist(gradeIn);
    }
};
let lowerBounds = document.getElementById("lower-bounds")
lowerBounds.onchange = () => {
    clearHist()
    grades.forEach(grade => {
        addToHist(grade);
    });
}