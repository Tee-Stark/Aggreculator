//O'level grades
const grades = ["A1", "B2", "B3", "C4", "C5", "C6"];

//O'level subjects
const subjects = [
    "Financial Accounting",
    "Agric science",
    "Book keeping",
    "Commerce",
    "Econimics",
    "English",
    "Civic Education",
    "Chemistry",
    "Catering Crafts",
    "Further maths",
    "Geography",
    "Physics",
    "Biology",
    "Mathematics",
    "Literature",
    "Technical drawing",
    "Food and nutrition",
    "Fine arts",
    "Yoruba",
    "Igbo",
    "Hausa",
    "French",
    "Music",
    "Marketing",
    "Government",
    "C.R.K",
    "I.R.K"
];
//to create the table for O'level results
var olevelTable = document.getElementById('olevel');


let cnt = 0;
//create 5 input spaces for the subjects and grades
while(cnt < 5) {
    var rowElement = document.createElement('tr');     //a new row
    var subjectElement = document.createElement('td'); //a new row daughter for subjects
    var gradeElement = document.createElement('td');   //a new row daughter for grades

    var gradeList = document.createElement('select');  //a select input type or subject grades
    gradeList.setAttribute('class','grades');

    //push all grades from the grades array into the select input as options
    for(grade of grades){
        var optionElement = document.createElement('option')
        optionElement.textContent = grade;
        gradeList.appendChild(optionElement);
    };

    //a new text input space for the subjects
    var subjectInput =document.createElement('input');
    subjectInput.setAttribute('list', 'subjects');
    subjectInput.style.width = '100%'
    //using a datalist to show pre-defined subjects
    var subjectList = document.createElement('datalist');
    subjectList.id = 'subjects';
    subjectInput.setAttribute('placeholder', 'Subject');

    for(subject of subjects){
        var subjectOption = document.createElement('option');
        subjectOption.textContent = subject;
        subjectList.appendChild(subjectOption);
    };
    //append the datalist as a child of subjectInput
    subjectInput.appendChild(subjectList);

    //append both inputs to their parent nodes
    subjectElement.appendChild(subjectInput);
    gradeElement.appendChild(gradeList);

    //then append both daughters<td> to their parent row<tr>
    rowElement.appendChild(subjectElement);
    rowElement.appendChild(gradeElement);

    //then we finally append the row to the table...
    olevelTable.appendChild(rowElement);

    ++cnt;
}

const formElement = document.querySelector('form');
const calcOlevelRes = () => {
    var gradeElements = Array.from(document.getElementsByClassName('grades'));
    var cGrades = [];      //list of the candidates grades
    for(g of gradeElements)
    {
        cGrades.push(g.value);   //extracting the grades from the form
    }
    var point, sum = 0;
    for(cGrade of cGrades)
    {
        switch(cGrade)
        {
            case "A1": point = 4.0;
            break;
            case "B2": point = 3.6;
            break;
            case "B3": point = 3.2;
            break;
            case "C4": point = 2.8;
            break;
            case "C5": point = 2.4;
            break;
            case "C6": point = 2.0;
            break;
        }
        sum += point;
    }
    return sum;
}
formElement.addEventListener('submit', (e)=>{
    e.preventDefault();
    const cName = String(document.forms["candidateInfo"]["cname"].value);
    const cUtme = parseFloat(document.forms["candidateInfo"]["utmescore"].value);
    const cPutme = parseFloat(document.forms["candidateInfo"]["post-utmescore"].value);

    const utme = cUtme / 8;
    const oLevel = calcOlevelRes();

    const aggregate = utme + oLevel + cPutme;
    const aggregateName  = document.getElementById('candidateName');
    cName.split(" ");
    aggregateName.textContent = cName;

    const aggregateScore = document.getElementById('aggregatePts');
    aggregateScore.textContent = aggregate;
    const aggregateSpace = document.getElementById('candidateAggregate');
    aggregateSpace.toggleAttribute("class");
});