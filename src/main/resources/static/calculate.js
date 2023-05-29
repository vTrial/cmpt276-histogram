const addToHist = (gradeIn) => {
    let lowerBoundsTemp = document.querySelectorAll('.lower-bounds-input');
    let lowerBoundsTempFound = false;
    let lowerBoundsTempIndex = 0;
    if (gradeIn < 0) {
        alert("The grade inputted is too low");
        return;
    } else if (gradeIn > 100) {
        alert("The grade inputted is too high");
        return;
    }
    while (!lowerBoundsTempFound && lowerBoundsTempIndex < lowerBoundsTemp.length) {
        if (gradeIn > Number(lowerBoundsTemp[lowerBoundsTempIndex].value)) {
            lowerBoundsTempIndex -= 1;
            lowerBoundsTempFound = true;
        }
        lowerBoundsTempIndex += 1;
    }
    let lowerBoundsToHist = document.querySelectorAll(".histogram-value")[lowerBoundsTempIndex];
    lowerBoundsToHist.innerHTML += "✗";
}

const clearHist = () => {
    let histList = document.querySelectorAll(".histogram-value");
    histList.forEach(hist => {
        hist.innerHTML = ""
    });
}

const checkBounds = () => {
    let lowerBoundsTemp = document.querySelectorAll('.lower-bounds-input');
    for (let i = 0; i < lowerBoundsTemp.length; i++) {
        if (lowerBoundsTemp[i].value == "") {
            lowerBoundsTemp[i].value = 0
        }
        let boundsInt = Number(lowerBoundsTemp[i].value)
        if (boundsInt > 100) {
            lowerBoundsTemp[i].value = 100
            boundsInt = 100
        }
        else if (boundsInt < 0) {
            lowerBoundsTemp[i].value = 0
            boundsInt = 0
        }
        if (i > 0) {
            let boundsPrev = Number(lowerBoundsTemp[i - 1].value)
            if (boundsInt > boundsPrev && boundsInt > gradesBounds[i]) {
                for (let j = 1; j < i; j++) {
                    lowerBoundsTemp[j].value = boundsInt
                }
            }
        }
        if (i < lowerBoundsTemp.length - 1) {
            let boundsNext = Number(lowerBoundsTemp[i + 1].value)
            if (boundsInt < boundsNext && boundsInt < gradesBounds[i]) {
                for (let j = lowerBoundsTemp.length - 2; j > i; j--) {
                    lowerBoundsTemp[j].value = boundsInt
                }
            }
        }
    }
    gradesBounds = []
    lowerBoundsTemp.forEach(bound => {
        gradesBounds.push(Number(bound.value))
    })
}
let grades = []
let gradesBoundsEles = document.querySelectorAll('.lower-bounds-input')
gradesBounds = []
gradesBoundsEles.forEach(grade => {
    gradesBounds.push(grade.value);
  });

let newGrade = document.getElementById("new-grade")
newGrade.onkeydown = (event) => {
    if (event.code == "Enter") {
        let gradeIn = Number(document.getElementById("new-grade").value);
        if (gradeIn >= 0 && gradeIn <= 100) grades.push(gradeIn);
        addToHist(gradeIn);
    }
};
let lowerBounds = document.getElementById("lower-bounds")
lowerBounds.onchange = () => {
    checkBounds()
    clearHist()
    grades.forEach(grade => {
        addToHist(grade);
    });
}

grades.forEach(grade => {
    addToHist(grade);
});