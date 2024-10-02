import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Substitua useHistory por useNavigate

const AddBook = () => {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [ano, setAno] = useState('');
  const [genero, setGenero] = useState('');
  const [paginas, setPaginas] = useState('');
  const [editora, setEditora] = useState('');
  const navigate = useNavigate(); // useNavigate em vez de useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Objeto com os dados do livro
    const novoLivro = {
      titulo,
      autor,
      ano: parseInt(ano), // Convertendo para número, se necessário
      genero,
      paginas: parseInt(paginas), // Convertendo para número
      editora,
    };

    try {
      // Envia os dados para a API (assumindo que o backend está rodando em localhost:5001)
      await axios.post('http://localhost:5001/livros', novoLivro);
      alert('Livro adicionado com sucesso!');
      navigate('/livros'); // Redireciona para a página de listagem de livros
    } catch (error) {
      console.error('Erro ao adicionar o livro', error);
      alert('Erro ao adicionar o livro');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Adicionar Novo Livro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título</label>
          <input
            type="text"
            className="form-control"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Autor</label>
          <input
            type="text"
            className="form-control"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Ano</label>
          <input
            type="number"
            className="form-control"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Gênero</label>
          <input
            type="text"
            className="form-control"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Páginas</label>
          <input
            type="number"
            className="form-control"
            value={paginas}
            onChange={(e) => setPaginas(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Editora</label>
          <input
            type="text"
            className="form-control"
            value={editora}
            onChange={(e) => setEditora(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Adicionar Livro</button>
      </form>
    </div>
  );
};

export default AddBook;