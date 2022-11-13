import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import Office from './pages/Office';
import SignIn from './pages/SignIn';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/forgotpassword" element={<ForgotPassword />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/office" element={<Office />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
