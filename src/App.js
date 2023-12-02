import './themes/general.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import { SwitchRouter } from './router/SwitchRouter';
import { DocumentProvider } from './contents/DocumentProvider';
import { routes } from './router/routes';
import { AssignPassword } from './accounts/AssignPassword';
import { Testing } from './test/Testing';

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <DocumentProvider>
          <Routes>
            <Route path={routes.updateCredentialByToken()} element={<AssignPassword/>}/>
            <Route path={'/test'} element={<Testing/>}/>
            <Route path={'*'} element={<SwitchRouter/>}/>
          </Routes>
        </DocumentProvider>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
