import React, {useEffect} from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'context/AuthContext';
import { RoleContextProvider } from 'context/UserRoleContext';

// assets
import 'assets/scss/style.scss';

// third party
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import './index.css';
// project import
import App from 'layout/App';
import reducer from 'store/reducer';
import * as serviceWorker from 'serviceWorker';
import { ItemProvider } from 'context/ItemContext';
import { AuthRolesProvider } from 'context/AuthRolesContext';
import { WorkOrderProvider } from 'context/WorkOrderContext';

const store = configureStore({ reducer });

const root = createRoot(document.getElementById('root'));

// ==============================|| MAIN - REACT DOM RENDER  ||==============

root.render(
  <Provider store={store}>
    <RoleContextProvider>
      <AuthRolesProvider>
        <AuthProvider>
          <WorkOrderProvider>
            <ItemProvider>
              <BrowserRouter basename={process.env.REACT_APP_BASE_NAME}>
                <App />
              </BrowserRouter>
            </ItemProvider>
          </WorkOrderProvider>
        </AuthProvider>
      </AuthRolesProvider>
    </RoleContextProvider>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
