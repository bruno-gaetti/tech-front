import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBook = () => {
  const { id } = useParams(); // Pega o ID do livro da URL
  const navigate = useNavigate();

  // Definindo os estados para os campos do livro
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [ano, setAno] = useState('');
  const [genero, setGenero] = useState(''); // Estado para o gênero
  const [paginas, setPaginas] = useState(''); // Estado para o número de páginas
  const [editora, setEditora] = useState(''); // Estado para a editora

  useEffect(() => {
    // Busca os dados do livro ao carregar o componente
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/livros/${id}`);
        const livro = response.data;
        setTitulo(livro.titulo);
        setAutor(livro.autor);
        setAno(livro.ano);
        setGenero(livro.genero); // Preenche o campo gênero
        setPaginas(livro.paginas); // Preenche o campo páginas
        setEditora(livro.editora); // Preenche o campo editora
      } catch (error) {
        console.error('Erro ao buscar livro:', error);
      }
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    try {
      await axios.put(`http://localhost:5001/livros/${id}`, {
        titulo,
        autor,
        ano,
        genero, 
        paginas, 
        editora, 
      });
      alert('Livro atualizado com sucesso!');
      navigate('/livros');
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
      alert('Erro ao atualizar livro!');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Editar Livro</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="autor" className="form-label">Autor</label>
          <input
            type="text"
            className="form-control"
            id="autor"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ano" className="form-label">Ano</label>
          <input
            type="number"
            className="form-control"
            id="ano"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genero" className="form-label">Gênero</label>
          <input
            type="text"
            className="form-control"
            id="genero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="paginas" className="form-label">Páginas</label>
          <input
            type="number"
            className="form-control"
            id="paginas"
            value={paginas}
            onChange={(e) => setPaginas(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="editora" className="form-label">Editora</label>
          <input
            type="text"
            className="form-control"
            id="editora"
            value={editora}
            onChange={(e) => setEditora(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Salvar</button>
      </form>
    </div>
  );
};

export default EditBook;