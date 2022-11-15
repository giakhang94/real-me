import Header from '../components/Header';
import Hero from './Hero';

function Home() {
    return (
        <>
            <Header />
            <div className="main">
                <Hero />
            </div>
        </>
    );
}

export default Home;
