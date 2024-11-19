import Hero from '../../../frontOffice/2-hero/Hero';
import Main from '../../../frontOffice/3-main/Main';
import LatestAdverts from '../../../frontOffice/4-Latest/RecentlyAdded';

const Core = () => {
    return (
        <>
            <Hero />
            <div className='divider' />
            < Main />
            <div className='divider' />
            <LatestAdverts />
        </>);
}
export default Core;