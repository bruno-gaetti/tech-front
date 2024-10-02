import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import BookDetail from './components/BookDetail';
import EditBook from './components/EditBook'; // Importando o componente EditBook
import './App.css';
import './table.css'
import './form.css'

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/livros" element={<BookList />} />
          <Route path="/adicionar-livro" element={<AddBook />} />
          <Route path="/livros/:id" element={<BookDetail />} />
          <Route path="/livros/edit/:id" element={<EditBook />} /> {/* Nova rota para editar livro */}
        </Routes>

        <Link to="/" className="btn-home">
          Home
        </Link>
      </div>
    </Router>
  );
};

export default App;