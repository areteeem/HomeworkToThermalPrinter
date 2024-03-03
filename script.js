var dateWritten = false;

function submitHomework() {
    var form = document.getElementById('homeworkForm');
    var classInput = form.elements['class'].value;
    var taskInput = form.elements['task'].value;

    displayHomework(classInput, taskInput);

    form.reset();
}

function removeTask(taskElement) {
    var homeworkRecord = taskElement.closest('.homework-record');
    homeworkRecord.remove();
}

function displayHomework(classInput, taskInput) {
    var outputDiv = document.getElementById('output');
    if (!outputDiv) {
        outputDiv = document.createElement('div');
        outputDiv.id = 'output';
        outputDiv.classList.add('homework-list');
        document.body.appendChild(outputDiv);
    }

    if (!dateWritten) {
        var currentDate = new Date().toLocaleDateString('en-US');
        var dateParagraph = document.createElement('p');
        dateParagraph.textContent = 'Date: ' + currentDate;
        outputDiv.appendChild(dateParagraph);
        dateWritten = true;
    }

    var homeworkRecord = document.createElement('div');
    homeworkRecord.classList.add('homework-record');

    var classParagraph = document.createElement('p');
    classParagraph.classList.add('class-description');
    classParagraph.innerHTML = '<span class="bold-text">Class:</span> ' + classInput;

    var taskParagraph = document.createElement('p');
    taskParagraph.classList.add('task-description');
    taskParagraph.textContent = taskInput;

    var tickPlaceholder = document.createElement('span');
    tickPlaceholder.classList.add('square-placeholder');
    var taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');
    taskContainer.appendChild(tickPlaceholder); // Add square placeholder
    taskContainer.appendChild(taskParagraph); // Add task description

    var removeButton = document.createElement('button');
    removeButton.innerHTML = '&#10005;'; // Cross symbol
    removeButton.classList.add('remove-button');
    removeButton.onclick = function() {
        removeTask(this);
    };

    homeworkRecord.appendChild(classParagraph);
    homeworkRecord.appendChild(taskContainer); // Add task container to homework record
    homeworkRecord.appendChild(removeButton); // Add remove button to homework record

    outputDiv.appendChild(homeworkRecord);
}

function printHomeworkList() {
    var homeworkRecords = document.querySelectorAll('.homework-record');

    var printWindow = window.open('', '_blank');
    var printContent = '<html><head><title>Homework List</title>';
    printContent += '<link rel="stylesheet" href="styles.css">'; // Include CSS file for print styling
    printContent += '</head><body>';
    printContent += '<h2>Homework List</h2>';

    homeworkRecords.forEach(function(record) {
        var classDescription = record.querySelector('.class-description');
        classDescription.style.fontWeight = 'bold';

        var tickPlaceholder = record.querySelector('.square-placeholder');
        tickPlaceholder.style.display = 'inline-block'; // Display square placeholder

        var removeButton = record.querySelector('.remove-button');
        removeButton.style.display = 'none'; // Hide remove button on print page

        printContent += '<div>' + record.innerHTML + '</div>'; // Add record content
    });

    printContent += '</body></html>';

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
}
