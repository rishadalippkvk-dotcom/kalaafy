import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Programs from './components/Programs';
import Scoreboard from './components/Scoreboard';
import NoticeBoard from './components/NoticeBoard';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={
                        <>
                            <Navigation />
                            <Hero />
                            <Programs />
                            <Scoreboard />
                            <NoticeBoard />
                            <Gallery />
                            <Footer />
                        </>
                    } />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
