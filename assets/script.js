let titleInput = document.getElementById('titleInput');
let hourInput = document.getElementById('hourInput');
let submitButton = document.getElementById('submitButton');
let entryList = document.getElementById('entryList');


// submitButton.addEventListener('click', () =>  {
    
//     if(titleInput.value == '' || hourInput.value == ''){
//         alert('Please Enter the valid input.');
//     }
//     let tempText = "";
//     let totalEntryCounter = document.querySelectorAll("#entryList tr").length;
//     totalEntryCounter++;

//     // const tableTr = document.createElement('tr');
//     // tableTr.id = "entry-" + totalEntryCounter;

//     // const snTh = document.createElement('th');
//     // snTh.innerHTML = totalEntryCounter;
//     // tableTr.append(snTh);

//     // const titleTd = document.createElement('td');
//     // titleTd.innerHTML = titleInput.value;
//     // tableTr.append(titleTd);


//     // const hourTd = document.createElement('td');
//     // hourTd.innerHTML = hourInput.value;
//     // tableTr.append(hourTd);

//     // const buttonTd = document.createElement('td');
//     // buttonTd.classList.add('text-end');

//     // const deleteBtn = document.createElement('button');
//     // deleteBtn.type = "button";
//     // deleteBtn.classList.add("btn", "btn-outline-danger");
//     // deleteBtn.setAttribute('onclick', "removeItem(this)");
//     // deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

//     // buttonTd.append(deleteBtn);

//     // const moveBtn = document.createElement('button');
//     // moveBtn.type = "button";
//     // moveBtn.classList.add("btn", "btn-success");
//     // moveBtn.setAttribute('onclick', "moveToBadList(this)");
//     // moveBtn.innerHTML = `<i class="fa-solid fa-arrow-right"></i>`;

//     // buttonTd.append(moveBtn);

//     // tableTr.append(buttonTd);


//     tempText = `<tr id="entry ${totalEntryCounter}">` +
//                     `<th scope="row">${totalEntryCounter}</th>`+
//                     `<td>${titleInput.value}</td>`+
//                     `<td>${hourInput.value} Hrs</td>`+
//                     `<td class="text-end">`+
//                         `<button type="button" class="btn btn-outline-danger" onclick="removerFromEntryList(this)"><i class="fa-solid fa-trash"></i></button>  `+
//                         `<button type="button" class="btn btn-success" onclick="addToBadList(this)"><i class="fa-solid fa-arrow-right"></i></button>`+
//                     `</td>`+
//                 `</tr>`;

//     entryList.innerHTML += tempText;


// });



// Second method

let taskList = [];

const addTask = (myForm) => {
    
    
    const formData = new FormData(myForm);
    const task = formData.get('task_title');
    const hour = parseInt(formData.get('task_hour'));
    
    if(task == '' || hour == ''){
        alert('Please Enter the valid input.');
        return;
    }
    
    // console.log(task, hour);
    const id = getRandomUniqueID();
    
    const taskObj = {
        id,
        task,
        hour,
        type: "good"
    }
    
    taskList.push(taskObj);
    displayEntryList();
    
    // myForm.reset();
    
}

const displayEntryList = () => {
    const entryListElement = document.getElementById('entryList');
    let entryListElementContent = '';
    
    taskList.map((item, index) => {
        
        if(item.type == "good"){
            entryListElementContent += `<tr id="entry-1">
                                        <th scope="row">${index + 1}.</th>
                                        <td>${item.task}</td>
                                        <td>${item.hour} Hrs</td>
                                        <td class="text-end">
                                            <button type="button" class="btn btn-outline-danger" onclick="deleteTask(${item.id})"><i class="fa-solid fa-trash"></i></button>
                                            <button type="button" class="btn btn-success" onclick="switchTask(${item.id})"><i class="fa-solid fa-arrow-right"></i></button>
                                        </td>
                                    </tr>`;
        }
        
    });
    
    entryListElement.innerHTML = entryListElementContent;
    
    const totalHours = getTotalHours();
    // console.log(totalHours);
    const totalHourElememnt = document.getElementById("totalHour");
    
    totalHourElememnt.innerText = totalHours;

    // Bad list Starts
    
    const badListElement = document.getElementById('badList');
    let badListElementContent = '';
    
    taskList.map((item, index) => {
        
        if(item.type == "bad"){
            badListElementContent += `<tr id="entry-1">
                                        <th scope="row">${index + 1}.</th>
                                        <td>${item.task}</td>
                                        <td>${item.hour} Hrs</td>
                                        <td class="text-end">
                                            <button type="button" class="btn btn-warning" onclick="switchTask(${item.id})"><i class="fa-solid fa-arrow-left"></i></button>
                                            <button type="button" class="btn btn-outline-danger" onclick="deleteTask(${item.id})"><i class="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr>`;
        }
        
    });
    
    badListElement.innerHTML = badListElementContent;
    
}


const getTotalHours = () => {
    
    
    total = taskList.reduce((acc, item) => {
        return acc + parseInt(item.hour);
    },0);
    
    return total;
}

const deleteTask = (id) => {
    
    taskList = taskList.filter((task) => {
        return task.id != id;
    });
    
    displayEntryList();

}

const getRandomUniqueID = () => {
    let randomId = new Date().getTime();
    
    return randomId;
}

const switchTask = (id) => {
    let task = taskList.find((task) => task.id == id);
    task.type = task.type == "good" ? "bad" : "good";
    
    displayEntryList();
    
}