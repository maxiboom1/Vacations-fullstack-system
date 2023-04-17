import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Components/LayoutArea/Layout/Layout';
import './index.css';
import reportWebVitals from './reportWebVitals';
import interceptorService from './Services/InterceptorService';
import startSocketListener from './Services/SocketIoService';

// Create interceptor to insert token header to axios requests:
interceptorService.create();

// Start socket listener to receive live updates from server
startSocketListener();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
        <Layout />
    </BrowserRouter>
);

reportWebVitals();
