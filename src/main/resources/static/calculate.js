const histWidthEdit = () => {
    let gradeCount = grades.length;
    let histValues = document.querySelectorAll(".histogram-value");
    histValues.forEach(histValue => {
        if (grades.length == 0) {
            let scaleValue = 40 / 11 / histValue.innerHTML.length
            histValue.style.transform = `scaleX(${scaleValue})`;
        }
        let histValueInner = Number(histValue.innerHTML);
        let widthPercent = histValueInner / gradeCount
        let translateValue = 0.2 * widthPercent / histValue.innerHTML.length + (histValue.innerHTML.length - 1) * 0.3
        let scaleValue = 40 * widthPercent / histValue.innerHTML.length
        histValue.style.transform = `scaleX(${scaleValue}) translateX(${translateValue}em)`;
    });
}

const addToHist = (gradeIn) => {
    let lowerBoundsTemp = document.querySelectorAll('.lower-bounds-input');
    let lowerBoundsTempFound = false;
    let lowerBoundsTempIndex = 0;
    let gradeInputErrorText = document.getElementById("grade-input-error");
    if (gradeIn < 0) {
        gradeInputErrorText.innerHTML = "Please input higher grade."
        return;
    } else if (gradeIn > 100) {
        gradeInputErrorText.innerHTML = "Please input lower grade."
        return;
    } else {
        gradeInputErrorText.innerHTML = "​"
    }
    while (!lowerBoundsTempFound && lowerBoundsTempIndex < lowerBoundsTemp.length) {
        if (gradeIn >= Number(lowerBoundsTemp[lowerBoundsTempIndex].value)) {
            lowerBoundsTempIndex -= 2;
            lowerBoundsTempFound = true;
            if (lowerBoundsTempIndex < -1) {
                lowerBoundsTempIndex = -1
            }

        }
        lowerBoundsTempIndex += 1;
    }
    let lowerBoundsToHist = document.querySelectorAll(".histogram-value")[lowerBoundsTempIndex];
    lowerBoundsToHist.innerHTML = Number(lowerBoundsToHist.innerHTML) + 1
}

const clearHist = () => {
    let histList = document.querySelectorAll(".histogram-value");
    histList.forEach(hist => {
        hist.innerHTML = "0"
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
                let lowerBoundsEnded = false;
                for (let j = i - 1; j > 0 && !lowerBoundsEnded; j--) {
                    if (Number(lowerBoundsTemp[j + 1].value) > Number(lowerBoundsTemp[j].value)) {
                        lowerBoundsTemp[j].value = Number(lowerBoundsTemp[j + 1].value);
                    } else {
                        lowerBoundsEnded = true;
                    }
                }
            }
        }
        if (i < lowerBoundsTemp.length - 1) {
            let boundsNext = Number(lowerBoundsTemp[i + 1].value)
            if (boundsInt < boundsNext && boundsInt < gradesBounds[i]) {
                let lowerBoundsEnded = false;
                for (let j = i + 1; j < lowerBoundsTemp.length - 1 && !lowerBoundsEnded; j++) {
                    if (Number(lowerBoundsTemp[j - 1].value) < Number(lowerBoundsTemp[j].value)) {
                        lowerBoundsTemp[j].value = Number(lowerBoundsTemp[j - 1].value);
                    } else {
                        lowerBoundsEnded = true;
                    }
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
let gradesBounds = []
gradesBoundsEles.forEach(grade => {
    gradesBounds.push(grade.value);
  });

let newGrade = document.getElementById("new-grade")
newGrade.onkeydown = (event) => {
    if (event.code == "Enter") {
        let gradeIn = Number(document.getElementById("new-grade").value);
        if (gradeIn >= 0 && gradeIn <= 100) grades.push(gradeIn);
        addToHist(gradeIn);
        histWidthEdit()
    }
};
let lowerBounds = document.getElementById("lower-bounds")
lowerBounds.onchange = () => {
    checkBounds()
    clearHist()
    grades.forEach(grade => {
        addToHist(grade);
    });
    histWidthEdit();
}

grades.forEach(grade => {
    addToHist(grade);
});
histWidthEdit();