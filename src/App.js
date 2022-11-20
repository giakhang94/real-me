import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import Offer from './pages/Offer';
import SignIn from './pages/SignIn';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import Spinner from './components/Spinner';
import Header from './components/Header';
import CreateListing from './pages/CreateListing';
import CreateListingTest from './pages/CreateListingTest';
import EditListing from './pages/EditListing';
import Listing from './pages/Listing';
import Home2 from './pages/Home2';

function App() {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home2 />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/forgotpassword" element={<ForgotPassword />} />
                    <Route path="/profile" element={<PrivateRoute />}>
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route path="/offer" element={<Offer />} />
                    <Route path="/spinner" element={<Spinner />} />
                    <Route path="/create-listing" element={<PrivateRoute />}>
                        <Route path="/create-listing" element={<CreateListing />} />
                    </Route>
                    <Route path="/create-listing-test" element={<PrivateRoute />}>
                        <Route path="/create-listing-test" element={<CreateListingTest />} />
                    </Route>
                    <Route path="/edit-listing" element={<PrivateRoute />}>
                        <Route path="/edit-listing/:itemID" element={<EditListing />} />
                    </Route>
                    <Route path="/category/:categoryName/:listingId" element={<Listing />} />
                </Routes>
            </Router>
            <ToastContainer
                position="bottom-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    );
}

export default App;
