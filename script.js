import { createTodoElement } from './todoModule.js';

const addButton = document.getElementById('add-button');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// 追加ボタンをクリックした時の処理（抜粋）
addButton.addEventListener('click', async () => {
  const taskText = todoInput.value;
  if (taskText === "") return;

  // --- 【ここからバックエンドへの通信】 ---
  try {
    const response = await fetch('/api/todos', {
      method: 'POST', // 「登録して！」というリクエスト
      headers: {
        'Content-Type': 'application/json' // 「JSONを送るよ」という合図
      },
      body: JSON.stringify({ task: taskText }) // データをJSON文字列に変えて送る
    });

    const result = await response.json();
    console.log('サーバーからの返事:', result.message);
  } catch (error) {
    console.error('通信に失敗しました:', error);
  }
  // --- 【ここまで】 ---

  // 画面に表示するこれまでの処理
  const li = createTodoElement(taskText);
  todoList.appendChild(li);
  todoInput.value = "";
});

// --- //追加: ページを読み込んだ時に実行する処理 ---
window.addEventListener('load', async () => {
  try {
    // 1. サーバーに「保存されているデータをちょうだい」と頼む（GET）
    const response = await fetch('/api/todos');
    const todos = await response.json(); // [ { "task": "git勉強" } ] が届く

    // 2. 届いたデータの数だけ、画面にリストを作る
    todos.forEach(todo => {
      const li = createTodoElement(todo.task);
      todoList.appendChild(li);
    });
  } catch (error) {
    console.error('データの読み込みに失敗しました:', error);
  }
});
// -------------------------------------------------- 