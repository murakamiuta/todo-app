import { createTodoElement } from './todoModule.js';

const addButton = document.getElementById('add-button');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// --- //追加: 1つのタスクに対して「削除」の通信機能をセットする関数 ---
const setupDeleteEvent = (li, taskText) => {
  const deleteButton = li.querySelector('button'); // そのタスクの中の削除ボタンを探す
  
  deleteButton.addEventListener('click', async () => {
    try {
      const response = await fetch('/api/todos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: taskText })
      });

      if (response.ok) {
        li.remove();
        console.log('サーバーと画面の両方から消去しました');
      }
    } catch (error) {
      console.error('削除の通信に失敗しました:', error);
    }
  });
};
// --------------------------------------------------

// 追加ボタンをクリックした時の処理
addButton.addEventListener('click', async () => {
  const taskText = todoInput.value;
  if (taskText === "") return;

  try {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: taskText })
    });
    const result = await response.json();
    console.log('サーバーからの返事:', result.message);

    // 画面に追加
    const li = createTodoElement(taskText);
    todoList.appendChild(li);
    
    // //追加: 作ったばかりのボタンに削除機能をセット
    setupDeleteEvent(li, taskText);

    todoInput.value = "";
  } catch (error) {
    console.error('通信に失敗しました:', error);
  }
});

// ページを読み込んだ時に実行する処理
window.addEventListener('load', async () => {
  try {
    const response = await fetch('/api/todos');
    const todos = await response.json();

    todos.forEach(todo => {
      const li = createTodoElement(todo.task);
      todoList.appendChild(li);
      
      // //追加: 読み込んだタスクのボタンにも削除機能をセット
      setupDeleteEvent(li, todo.task);
    });
  } catch (error) {
    console.error('データの読み込みに失敗しました:', error);
  }
});