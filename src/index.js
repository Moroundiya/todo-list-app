import {
  factoryTask as Task,
  factoryProject as Project,
  USER_MODULE as USER,
} from './data-logic.js';

import { factoryFormElement as Form, launchForm } from './form-components.js';

import { DOM_DISPLAY as DOM } from './dom-interaction.js';

DOM.displayProjects();
DOM.selectProject(2);

console.log(DOM.getCurrentProject());

// FORMS AND DATA HANDLING

const addForm = new Form(
  'Add new Task',
  {
    id: 'desc',
    name: 'Description',
    type: 'textarea',
    required: true,
  },
  {
    id: 'date',
    name: 'Due date',
    type: 'date',
    required: true,
  },
  {
    id: 'priority',
    name: 'Priority (0 low - 3 max)',
    type: 'number',
    required: true,
    minrange: 0,
    maxrange: 3,
  }
);

(() => {
  let addTaskBtn = document.querySelector('#list-add-btn');

  addTaskBtn.addEventListener('click', (e) => {
    launchForm(addForm, (formElement) => {
      let newTask = new Task(
        formElement.querySelector('#desc').value,
        formElement.querySelector('#priority').value,
        formElement.querySelector('#date').value
      );

      let project = DOM.getCurrentProject();
      project.addTask(newTask);

      let index = USER.getProjects().indexOf(project);

      USER.updateData();
      DOM.displayProjects();
      DOM.selectProject(index);
    });
  });
})();

const deleteForm = new Form('Delete this task?');

(() => {
  let tasksElements = document.querySelectorAll('.list-item');

  tasksElements.forEach((taskElem) => {
    const taskIndex = [...tasksElements].indexOf(taskElem);

    let editBtn = taskElem.querySelector('.btn-edit');
    let deleteBtn = taskElem.querySelector('.btn-delete');

    editBtn.addEventListener('click', (e) => {
      console.log('cheers');
    });

    deleteBtn.addEventListener('click', (e) => {
      launchForm(deleteForm, (formElement) => {
        let project = DOM.getCurrentProject();
        project.removeTaskAtIndex(taskIndex);

        let index = USER.getProjects().indexOf(project);

        USER.updateData();
        DOM.displayProjects();
        DOM.selectProject(index);
      });
    });
  });
})();

/*
let project1 = new Project('first');
let task1 = new Task('test0', '0', 'today');
let task2 = new Task('test1', '1', 'yesterday');
let task3 = new Task('test2', '2', 'tomorrow');
let task4 = new Task('test3', '3', 'sunday');
project1.addTask(task1);
project1.addTask(task2);
project1.addTask(task3);
project1.addTask(task4);
USER.addProject(project1);
*/
/*
let project2 = new Project('second');
let task2 = new Task('maybe', 'no', 'tomorrow', true);
project2.addTask(task2);
USER.addProject(project2);

let project3 = new Project('third');
let task3 = new Task('also', 'yes', 'today');
project3.addTask(task3);
USER.addProject(project3);
*/
