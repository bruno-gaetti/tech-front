import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importar o useNavigate

const Home = () => {
  const navigate = useNavigate(); // Definir o navigate aqui

  return (
    <div className="container mt-5 text-center">
      <h1>Bem-vindo à Biblioteca</h1>
      <p>Gerencie sua coleção de livros facilmente!</p>
      <div className="button-group"> {/* Adicionando a classe aqui */}
        <button className="btn btn-primary" onClick={() => navigate('/livros')}>Ver Livros</button>
        <button className="btn btn-secondary" onClick={() => navigate('/adicionar-livro')}>Adicionar Novo Livro</button>
      </div>
    </div>
  );
};

export default Home;