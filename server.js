import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/dataGallery', (req, res) => {
  const json = fs.readFileSync('./data/dataGallery.json', 'utf8');
  res.setHeader('Cache-Control', 'no-store');
  res.json(JSON.parse(json));
});

app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});
