import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Estado para armazenar a pesquisa do usuário

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5001/livros');
      setBooks(response.data);
    } catch (error) {
      console.error('Erro ao buscar os livros:', error);
    }
  };

  // Função para buscar livros com base na pesquisa
  const searchBooks = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página ao submeter o formulário
    try {
      const response = await axios.get(`http://localhost:5001/livros/search?query=${searchQuery}`);
      setBooks(response.data); // Atualiza os livros com o resultado da pesquisa
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
      alert('Nenhum livro encontrado.');
    }
  };

  // Função para deletar o livro
  const handleDelete = async (id) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir este livro?');
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:5001/livros/${id}`);
      setBooks(books.filter(book => book._id !== id)); // Remove o livro da lista sem recarregar a página
      alert('Livro excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir o livro:', error);
      alert('Erro ao excluir o livro!');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Books Database</h1>

      {/* Campo de pesquisa */}
      <form onSubmit={searchBooks} className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Pesquise por título ou autor..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Atualiza o estado de pesquisa
        />
        <button type="submit" className="btn btn-primary mt-2">Pesquisar</button>
      </form>

      {/* Tabela de livros */}
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Gênero</th>
            <th>Páginas</th>
            <th>Editora</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book._id}>
              <td>{book.titulo}</td>
              <td>{book.autor}</td>
              <td>{book.genero}</td>
              <td>{book.paginas}</td>
              <td>{book.editora}</td>
              <td>
                <Link to={`/livros/edit/${book._id}`} className="btn btn-primary">Atualizar</Link>
                <button 
                  className="btn btn-danger ml-2" 
                  onClick={() => handleDelete(book._id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;