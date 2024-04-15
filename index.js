#! /usr/bin/env node
import inquirer from "inquirer";
let todos = [];
let condition = true;
while (condition) {
    let todoQuestions = await inquirer.prompt([
        {
            name: "firstQuestion",
            type: "input",
            message: "What would you want to add in your Todos?",
            validate: (input) => {
                if (input.trim() === "") {
                    return "please Add text";
                }
                return true;
            },
        },
        {
            name: "secondQuestion",
            type: "confirm",
            message: "Would you like to add more in your todos?",
            default: "true"
        },
    ]);
    todos.push(todoQuestions.firstQuestion);
    console.log(todos);
    condition = todoQuestions.secondQuestion;
}
;
// remove todos from todo list
let rempoveTodos = await inquirer.prompt([
    {
        name: 'remove',
        type: 'confirm',
        message: 'Do you want to remove Todo?',
        default: 'false',
    }
]);
if (rempoveTodos.remove) {
    let removeTodoChoice = await inquirer.prompt(// used to select which todo you want to remove from your todo list
    {
        name: 'todoRemove',
        type: 'list',
        message: 'Select a todo below option:',
        choices: todos,
    });
    const indexToRemove = todos.indexOf(removeTodoChoice.todoRemove);
    if (indexToRemove !== -1) {
        todos.splice(indexToRemove, 1);
    }
}
;
// update yopur todo from list
let updatetodos = await inquirer.prompt(//used ask to confirm for updating your todofrom your todolist
{
    name: 'update',
    type: 'confirm',
    message: 'Do you want to update todo?',
    default: 'true',
});
if (updatetodos.update) {
    let updateChoice = await inquirer.prompt([
        {
            name: 'todoUpdate',
            type: 'list',
            message: 'Select todo to update:',
            choices: todos,
        },
        {
            name: 'newTodo',
            type: 'input',
            message: 'Enter the new value for the selected todo:',
        },
    ]);
    const indexToUpdate = todos.indexOf(updateChoice.todoUpdate);
    if (indexToUpdate !== -1) {
        todos[indexToUpdate] = updateChoice.newTodo;
    }
}
// Print each todo in separate line
console.log('Your Todo:');
todos.forEach(todo => {
    console.log("." + todo);
});
