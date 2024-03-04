function submitHomework() {
    var form = document.getElementById('homeworkForm');
    var classInput = form.elements['class'].value;
    var taskInput = form.elements['task'].value;

    displayHomework(classInput, taskInput);

    form.reset();
}


function displayHomework(classInput, taskInput) {
    var outputDiv = document.getElementById('output');
    if (!outputDiv) {
        outputDiv = document.createElement('div');
        outputDiv.id = 'output';
        outputDiv.classList.add('homework-list');
        document.body.appendChild(outputDiv);
    }

    var homeworkRecord = document.createElement('div');
    homeworkRecord.classList.add('homework-record');

    var taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');

    var squarePlaceholder = document.createElement('div');
    squarePlaceholder.classList.add('square-placeholder');

    var taskDescription = document.createElement('div');
    taskDescription.classList.add('task-description');
    taskDescription.textContent = taskInput;

    var removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.innerHTML = '&times;';
    removeButton.onclick = function () {
        homeworkRecord.remove();
    };

    taskContainer.appendChild(squarePlaceholder);
    taskContainer.appendChild(taskDescription);
    taskContainer.appendChild(removeButton);

    if (outputDiv.childNodes.length === 0) {
        var dateParagraph = document.createElement('p');
        dateParagraph.classList.add('date-paragraph');
        dateParagraph.innerHTML = '<em>Date: ' + new Date().toLocaleDateString('en-US') + '</em>';
        outputDiv.appendChild(dateParagraph);
    }

    homeworkRecord.innerHTML = '<p class="class-description">Class: <strong>' + classInput + '</strong></p>';
    homeworkRecord.appendChild(taskContainer);

    outputDiv.appendChild(homeworkRecord);
}


function printHomeworkList() {
    var printWindow = window.open('', '_blank');
    var homeworkListContent = document.getElementById('output').innerHTML;
    var currentDate = new Date().toLocaleDateString('en-US');

    printWindow.document.write('<html><head><title>Homework List</title>');
    printWindow.document.write('<link rel="stylesheet" href="styles.css">');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h2>Homework List</h2>');
    printWindow.document.write('<p>Date: ' + currentDate + '</p>');
    printWindow.document.write('<div>' + homeworkListContent + '</div>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();


    addHistory(homeworkListContent);
}



function addHistory(homeworkListContent) {
    var historyList = document.getElementById('historyList');
    var historyItem = document.createElement('div');
    historyItem.classList.add('history-item');


    historyItem.innerHTML = homeworkListContent;


    var removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.innerHTML = '&times;';
    removeButton.onclick = function () {
        historyItem.remove();
    };
    historyItem.appendChild(removeButton);


    historyList.appendChild(historyItem);
}


function clearHistory() {
    var historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
}
