//---------- Styling Zone ------------//
// import './App.css';


//---------------- Libraries Zone --------------------//
import { Routes, Route, Router } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllAdverts } from './api/AdvertsApi';
import { setAdvert } from './redux/AdvertSlice';
import { useEffect, useState } from 'react';

//------------------ Components Zone -----------------//
import HomePage from './components/frontOffice/HomePage';
import UserZone from './components/backOffice/user/UserZone';
import Core from './components/backOffice/user/4-userCore/Core';
import UserUpdate from './components/backOffice/user/2-userUpdate/UpdateUser';
import AdvertForm from './components/backOffice/user/3-advertList/AdvertForm';
import DisplayAdvert from './components/frontOffice/3-main/DisplayAdvert';
import Login from './components/frontOffice/6-sign/Login';




function App() {

  const Adverts = useSelector(state => state.adverElement);
  const dispatch = useDispatch();

  // Partie getting data from DataBase
  const getAllAdverts = async () => {
    const data = await fetchAllAdverts();
    console.log(data.adverts);
    dispatch(setAdvert(data.adverts));
  }
  // Render Data from DataBase

  useEffect(() => {
    getAllAdverts();
  }, []);

  const [showScrollBTN, setScrollBTN] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setScrollBTN(true);
      } else {
        setScrollBTN(false);
      }
    })
  }, []);

  return (
    <div id="up" className="container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/displayadvert/:id" element={<DisplayAdvert />} />

        <Route path="/userzone" element={<UserZone />}>
          <Route index element={<Core />} />
          <Route path="/userzone/profile" element={<UserUpdate />} />
          <Route path="/userzone/advert" element={<AdvertForm />} />
        </Route>
      </Routes>

      <Routes>

      </Routes>


      <a style={{ opacity: showScrollBTN ? 1 : 0, transition: "1s" }} href="#up">
        <button className="icon-keyboard_arrow_up scroll2Top"></button>
      </a>
    </div >
  );
}

export default App;
