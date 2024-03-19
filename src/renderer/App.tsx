import { MemoryRouter as Router } from 'react-router-dom';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Suspense } from 'react';
import Header from './components/header/Header';
import AppRouter from './components/router/AppRouter';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<p>Loading...</p>}>
        <Router>
          <Header />
          <AppRouter />
        </Router>
      </Suspense>
    </QueryClientProvider>
  );
}
