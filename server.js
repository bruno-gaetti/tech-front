const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Substitua pela URL do seu front-end
}));
app.use(bodyParser.json());

// Conectando ao MongoDB
mongoose.connect('mongodb://localhost:27017/livrosdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Validando a conexão com MongoDB
const db = mongoose.connection;

db.on('connected', () => {
  console.log('Mongoose conectado ao MongoDB');
});

db.on('error', (err) => {
  console.error('Erro na conexão com o MongoDB:', err.message);
});

db.on('disconnected', () => {
  console.log('Mongoose desconectado do MongoDB');
});

// Definindo o esquema do livro com validação
const livroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  ano: { type: Number, required: true },
  genero: { type: String, required: true }, // Adicionando campo de gênero
  paginas: { type: Number, required: true }, // Adicionando campo de páginas
  editora: { type: String, required: true } // Adicionando campo de editora
});

// Criando o modelo do livro
const Livro = mongoose.model('Livro', livroSchema);

// Rota para buscar um livro específico pelo ID
app.get('/livros/:id', async (req, res) => {
  const { id } = req.params; // Captura o ID do livro da URL
  console.log(`Buscando livro com ID: ${id}`); // Adicionando log para depuração
  try {
    const livro = await Livro.findById(id); // Busca o livro pelo ID
    if (!livro) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }
    res.json(livro); // Retorna o livro encontrado
  } catch (err) {
    console.error('Erro ao buscar livro:', err); // Log de erro para depuração
    res.status(500).json({ error: err.message }); // Retorna um erro se algo falhar
  }
});

// Listar Livros
app.get('/livros', async (req, res) => {
  try {
    const livros = await Livro.find();
    res.json(livros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Adicionar Livro
app.post('/livros', async (req, res) => {
  const { titulo, autor, ano, genero, paginas, editora } = req.body; // Incluindo os novos campos
  try {
    const novoLivro = new Livro({ titulo, autor, ano, genero, paginas, editora }); // Salvando com os novos campos
    await novoLivro.save();
    res.status(201).json({ message: 'Livro adicionado com sucesso!', livro: novoLivro });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Editar Livro
app.put('/livros/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, autor, ano, genero, paginas, editora } = req.body; // Incluindo os novos campos para edição
  try {
    const livroAtualizado = await Livro.findByIdAndUpdate(
      id, 
      { titulo, autor, ano, genero, paginas, editora }, // Atualizando com os novos campos
      { new: true } // Retorna o documento atualizado
    );

    if (!livroAtualizado) {
      return res.status(404).json({ message: 'Livro não encontrado!' });
    }

    res.json({ message: 'Livro atualizado com sucesso!', livro: livroAtualizado });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Excluir Livro
app.delete('/livros/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await Livro.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }
    res.json({ message: 'Livro excluído com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Testar rota POST
app.post('/test', (req, res) => {
  res.json({ message: 'Rota POST funcionando corretamente!' });
});

// Rota de pesquisa de livros
app.get('/livros/search', async (req, res) => {
  const { query } = req.query; // Pegando o termo de busca da URL

  if (!query || query.trim() === '') {
    return res.status(400).json({ message: 'Parâmetro de busca inválido.' });
  }

  try {
    // Busca livros pelo título ou autor com regex para busca parcial e case-insensitive
    const livros = await Livro.find({
      $or: [
        { titulo: { $regex: query, $options: 'i' } },
        { autor: { $regex: query, $options: 'i' } }
      ]
    });

    if (livros.length === 0) {
      return res.status(404).json({ message: 'Nenhum livro encontrado!' });
    }

    res.json(livros); // Retorna os livros encontrados
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});