// タスクの「部品」を作る関数
export function createTodoElement(taskText) {
    // 1. リストの土台（li）を作る
    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    // 2. 削除ボタンを作る
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    deleteButton.style.marginLeft = '10px';

    // 削除ボタンが押された時の処理
    deleteButton.addEventListener('click', () => {
        listItem.remove();
    });

    // 3. 土台にボタンを合体させる
    listItem.appendChild(deleteButton);

    return listItem;
}