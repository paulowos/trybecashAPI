const app = require('./app');
const connection = require('./db/connection');

const PORT = 3002;

app.listen(PORT, async () => {
  console.log(`Server running at port ${PORT}`);

  const [result] = await connection.execute('SELECT 1');

  if (result) {
    console.log('MySQL connection OK');
  }
});
