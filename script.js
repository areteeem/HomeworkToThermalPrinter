// Function to submit homework
function submitHomework() {
    // Get form elements
    var form = document.getElementById('homeworkForm');
    var classInput = form.elements['class'].value;
    var taskInput = form.elements['task'].value;

    // Display homework
    displayHomework(classInput, taskInput);

    // Reset form
    form.reset();
}

// Function to display homework
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

    taskContainer.appendChild(squarePlaceholder);
    taskContainer.appendChild(taskDescription);

    homeworkRecord.innerHTML = '<p class="class-description">Class: <strong>' + classInput + '</strong></p>';
    homeworkRecord.appendChild(taskContainer);

    outputDiv.appendChild(homeworkRecord);
}

// Function to print homework list
function printHomeworkList() {
    var printWindow = window.open('', '_blank');
    var homeworkListContent = document.getElementById('output').innerHTML;
    printWindow.document.write('<html><head><title>Homework List</title>');
    printWindow.document.write('<link rel="stylesheet" href="styles.css">'); // Include CSS for print page
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h2>Homework List</h2>');
    printWindow.document.write('<div>' + homeworkListContent + '</div>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();

    // Add homework list to history
    addHistory(homeworkListContent);
}

// Function to add homework list to history
function addHistory(homeworkListContent) {
    var historyList = document.getElementById('historyList');
    var historyItem = document.createElement('li');
    historyItem.classList.add('history-item');
    historyItem.innerHTML = homeworkListContent;
    historyList.appendChild(historyItem);
}

// Function to clear history
function clearHistory() {
    var historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
}
