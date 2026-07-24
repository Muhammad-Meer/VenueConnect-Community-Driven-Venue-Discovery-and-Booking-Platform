import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../store';
import { ToastProvider } from '../components/ui/Toast';

export default function AppProviders({ children }) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastProvider>{children}</ToastProvider>
      </BrowserRouter>
    </Provider>
  );
}
