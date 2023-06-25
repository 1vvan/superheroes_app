import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import SuperheroList from './components/SuperheroList/superhero_list';
import AddForm from './components/AddForm/AddForm';

function App() {
  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={<SuperheroList />} />
          <Route path='/add-form' element={<AddForm />} />
          <Route path='*' element={
            <div className='no-page'>
              <span>Страница не найдена !</span>
            </div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
