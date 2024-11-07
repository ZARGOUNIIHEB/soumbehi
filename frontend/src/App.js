import './App.css';
import Header from './components/frontOffice/1-header/Header';

import { useSelector, useDispatch } from 'react-redux';
import { fetchAllAdverts } from './api/AdvertsApi';
import { useEffect } from 'react';
function App() {

  const Adverts = useSelector(state => state.adverElement);
  const dispatch = useDispatch();

  // Partie getting data from DataBase
  const getAllAdverts = async () => {
    const data = await fetchAllAdverts();
    console.log(data.adverts);
  }
  // Render Data from DataBase

  useEffect(() => {
    getAllAdverts();
  }, []);

  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
