// 画面上の要素（ボタンや入力欄）をつかまえる
const addButton = document.getElementById('add-button');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// 追加ボタンが押された時の処理
addButton.addEventListener('click', () => {
    const taskText = todoInput.value;

    if (taskText !== "") {
        // 新しいリスト（li）を作る
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // リストを画面に追加する
        todoList.appendChild(listItem);

        // 入力欄を空にする
        todoInput.value = "";
    }
});