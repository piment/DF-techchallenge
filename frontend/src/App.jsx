import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import TodosList from './components/TodosList';
import Todo from './components/Todo';
import './App.scss';

function App() {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route path='/DF-techchallenge/' element={<TodosList />} />
          <Route path='/DF-techchallenge/:id' element={<Todo />} />
        </Routes>
      </Router>
    </Layout>
  );
}

export default App;
