import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import LocalNews from './pages/LocalNews';
import NationalNews from './pages/NationalNews';
import WorldNews from './pages/WorldNews';
import Sports from './pages/SportsNews/Sports';
import Weather from './pages/Weather/Weather';
import UserProfile from './pages/UserProfile';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <Navigation />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/local-news" element={<LocalNews />} />
            <Route path="/national-news" element={<NationalNews />} />
            <Route path="/world-news" element={<WorldNews />} />
            <Route path="/sports" element={<Sports />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/user-profile" element={<UserProfile />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
