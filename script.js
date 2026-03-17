// 外部の部品（Module）から関数を取り込む
import { createTodoElement } from './todoModule.js';

const addButton = document.getElementById('add-button');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

addButton.addEventListener('click', () => {
    const taskText = todoInput.value;

    if (taskText !== "") {
        // 部品を使ってタスクを作成
        const todoElement = createTodoElement(taskText);

        // 画面のリストに追加
        todoList.appendChild(todoElement);

        // 入力欄を空にする
        todoInput.value = "";
    }
});