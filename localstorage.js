var btn = document.getElementById('button');
var tasksRow = document.getElementById('tasksRow');
var inputText = document.getElementById('textarea');
var inputTime = document.getElementById('inputDate');

//   1. getitem : var = window.localStorage.getItem('') 
var tasksJson = window.localStorage.getItem('tasks');
// 2. variable = JSON.parse() 
var tasks = []; 
if(tasksJson){
    tasks = JSON.parse(tasksJson);
    for (var i = 0; i < tasks.length; i++){
        createNote(tasks[i]);
    }
    counter = tasks.length;
} else {
    var counter = 0;
};

btn.addEventListener('click', function(e){
        //   1. getitem : var = window.localStorage.getItem('') 
        var tasksJson = window.localStorage.getItem('tasks');
        // 2. variable = JSON.parse() 
        var tasksList = []; 
        if(tasksJson){
            tasksList = JSON.parse(tasksJson);
        };
        // 3. arr.push(objet)
        var newTask = {
            text: inputText.value,
            finishDate: inputTime.value,
            index: counter,
            done: false
        };
        tasksList.push(newTask);
        // 4. JSON.stringify(arr)
        var strTasksJson = JSON.stringify(tasksList); 
        // 5.setitem  window.localStorage.setItem('c');
        window.localStorage.setItem('tasks', strTasksJson);
        createNote(newTask);
        inputText.value="";
});
    
function createNote(note){
    if(note.done==false){
        const num = note.index;
        const newNote = document.createElement('div');
        newNote.className = "col-6 col-sm-4 col-md-3 note w3-animate-opacity";
        newNote.id = 
        strNote = '';
        // strNote += '<div class="tasktext">';
        // strNote += '<textarea class="noteText" cols="30" rows="4">' + note.text + '</textarea>';
        // strNote += '</div>';
        strNote += '<p class="noteText ">'+note.text+'</p>';
        strNote += '<p class="dateOutput col-sm">'+ note.finishDate+'</p>';
        newNote.innerHTML = strNote;
        const newIcon= document.createElement('div');
        newIcon.id = num;
        newIcon.className = 'iconDelete';
        // newIcon.innerHTML = '<i class="glyphicon glyphicon-remove" syle="width: 100px; height: 100px"></i>'
        newNote.appendChild(newIcon);
        tasksRow.appendChild(newNote);

        newIcon.addEventListener('click', function(e){
            tasksRow.removeChild(newNote);
            noteDone((newIcon.id));
        });
        newNote.addEventListener('mouseover', function(e){
            newIcon.style.display='block';
        });
        newNote.addEventListener('mouseleave', function(e){
            newIcon.style.display='none';
        });
        counter++;
    }
};

function noteDone(number){
    var tasksJson = window.localStorage.getItem('tasks');
    tasks = JSON.parse(tasksJson);
    tasks[number].done = true;
    var strTasksJson = JSON.stringify(tasks); 
    // 5.setitem  window.localStorage.setItem('');
    window.localStorage.setItem('tasks', strTasksJson);
};