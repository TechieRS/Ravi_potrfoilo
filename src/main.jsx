import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import App from './App.jsx';
import { theme } from './theme.js';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'Unknown render error' };
  }

  componentDidCatch(error) {
    console.error('Portfolio render failed:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main
          style={{
            minHeight: '100vh',
            display: 'grid',
            placeItems: 'center',
            padding: '32px',
            background: '#03070b',
            color: '#f7fafc',
            fontFamily: 'Inter, Segoe UI, system-ui, sans-serif',
          }}
        >
          <section style={{ maxWidth: '720px' }}>
            <p style={{ color: '#4fffc7', fontWeight: 800, textTransform: 'uppercase' }}>
              Portfolio render failed
            </p>
            <h1 style={{ fontSize: '42px', lineHeight: 1.05 }}>React caught an error before painting.</h1>
            <p style={{ color: 'rgba(255,255,255,0.78)', lineHeight: 1.7 }}>{this.state.message}</p>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
