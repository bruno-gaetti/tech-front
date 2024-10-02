import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetail = () => {
  const { id } = useParams(); // Pegar o ID da URL
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/livros/${id}`);
      setBook(response.data);
    } catch (error) {
      console.error('Erro ao buscar o livro', error);
    }
  };

  if (!book) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="container mt-5">
      <h2>{book.titulo}</h2>
      <img
        src="https://via.placeholder.com/150"  // Substitua pelo link correto da imagem
        alt={`Capa de ${book.titulo}`}
        className="img-fluid"
      />
      <p><strong>Autor:</strong> {book.autor}</p>
      <p><strong>Ano:</strong> {book.ano}</p>
      <p><strong>Descrição:</strong> {book.descricao || 'Sem descrição disponível.'}</p>
    </div>
  );
};

export default BookDetail;