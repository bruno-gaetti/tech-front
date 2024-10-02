import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Importa o axios para fazer requisições HTTP

const BookCard = ({ id, title, author, year, genre, pages, publisher, onDelete }) => {
  
  // Função para deletar um livro pelo ID
  const handleDelete = async () => {
    try {
      // Faz uma requisição DELETE para o servidor para deletar o livro
      await axios.delete(`http://localhost:5001/livros/${id}`);
      
      // Chama a função para remover o livro da interface após a exclusão
      onDelete(id); 
      
      // Exibe um alerta de sucesso
      alert('Livro deletado com sucesso!');
    } catch (error) {
      // Exibe uma mensagem de erro no console e um alerta para o usuário
      console.error('Erro ao deletar o livro:', error);
      alert('Erro ao deletar o livro!');
    }
  };

  return (
    <div className="card" style={{ width: '18rem' }}>
      <div className="card-body">
        {/* Exibe o título do livro */}
        <h5 className="card-title">{title}</h5>
        
        {/* Exibe o autor, ano, gênero, páginas e editora */}
        <p className="card-text">Autor: {author}</p>
        <p className="card-text">Ano: {year}</p>
        <p className="card-text">Gênero: {genre}</p>
        <p className="card-text">Páginas: {pages}</p>
        <p className="card-text">Editora: {publisher}</p>
        
        {/* Link para ver mais detalhes do livro */}
        <Link to={`/livros/${id}`} className="btn btn-primary">
          Ver Mais
        </Link>
        
        {/* Link para a página de edição do livro */}
        <Link to={`/livros/edit/${id}`} className="btn btn-warning ml-2">
          Editar
        </Link>
        
        {/* Botão para deletar o livro */}
        <button onClick={handleDelete} className="btn btn-danger ml-2">
          Deletar
        </button>
      </div>
    </div>
  );
};

export default BookCard;