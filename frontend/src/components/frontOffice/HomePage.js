//----------------- Styling Zone --------------------//

import './../../App.css';

//-----------------Libraries Zone -------------------//



//----------------- Components Zone -----------------//

import Header from './1-header/Header';
import Hero from './2-hero/Hero';
import Main from './3-main/Main';
import RecentlyAdded from './4-Latest/RecentlyAdded';
import Footer from './5-footer/Footer';


const HomePage = () => {
    return (
        <>
            <Header />
            <Hero />
            <div className='divider' />
            < Main />
            <div className='divider' />
            <RecentlyAdded />
            <div className='divider' />
            < Footer />
        </>
    );
}
export default HomePage;