import express from 'express';
import fs from 'fs'; // --- //追加: ファイルを読み書きする道具 ---

const app = express();
const port = 3000;
const DATA_FILE = './todo.json'; // --- //追加: 保存先のファイル名 ---

app.use(express.json());
app.use(express.static('./'));

app.post('/api/todos', (req, res) => {
  const newTodo = req.body;

  // 1. 【読み込み】今までのデータをファイルから取り出す（なければ空の配列）
  let todos = [];
  if (fs.existsSync(DATA_FILE)) {
    todos = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  }

  // 2. 【追加】新しいタスクを配列に加える
  todos.push(newTodo);

  // 3. 【書き込み】配列をJSON文字列にしてファイルに保存する（これがバックエンドの真髄！）
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));

  console.log('ファイルに保存しました！');
  res.json({ message: 'サーバーのファイルに保存したよ！', data: newTodo });
});

// --- //追加: 保存されている全データを返す窓口（GET） ---
app.get('/api/todos', (req, res) => {
  let todos = [];
  if (fs.existsSync(DATA_FILE)) {
    todos = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  }
  res.json(todos); // 保存されているリストを丸ごとJSONで返す
});
// --------------------------------------------------

app.listen(port, () => {
  console.log(`サーバーが起動したよ！ http://localhost:${port}`);
});