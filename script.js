var dateWritten = false;

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
    classParagraph.textContent = 'Class: ' + classInput;

    var taskParagraph = document.createElement('p');
    taskParagraph.classList.add('task-description');
    taskParagraph.textContent = taskInput;

    var editButton = document.createElement('button');
    editButton.textContent = 'Edit Task';
    editButton.addEventListener('click', function() {
        editTask(taskParagraph, homeworkRecord);
    });

    homeworkRecord.appendChild(classParagraph);
    homeworkRecord.appendChild(taskParagraph);
    homeworkRecord.appendChild(editButton);

    outputDiv.appendChild(homeworkRecord);
}

function editTask(taskParagraph, homeworkRecord) {
    var taskText = taskParagraph.textContent;
    var taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.classList.add('editable-task');
    taskInput.value = taskText;
    taskParagraph.textContent = '';
    taskParagraph.appendChild(taskInput);
    
    var saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', function() {
        taskParagraph.textContent = taskInput.value;
        homeworkRecord.removeChild(taskInput);
        homeworkRecord.removeChild(saveButton);
    });
    
    homeworkRecord.appendChild(saveButton);
}

function printHomeworkList() {
    var printWindow = window.open('', '_blank');
    var homeworkListContent = document.getElementById('output').innerHTML;
    printWindow.document.write('<html><head><title>Homework List</title></head><body>');
    printWindow.document.write('<h2>Homework List</h2>');
    printWindow.document.write('<div>' + homeworkListContent + '</div>');
    printWindow.document.write('<style>.editable-task { display: none; }</style>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}
