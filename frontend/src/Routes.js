import React, { useLayoutEffect } from 'react';
import {
  Route,
  Routes as ReactRouterRoutes,
  useLocation,
} from 'react-router-dom';
import PublicEnrollmentList from './components/templates/PublicEnrollmentList';
import Stats from './components/templates/Stats';
import Accessibilite from './components/templates/Accessibilite';
import { isEmpty } from 'lodash';
import AdminEnrollmentList from './components/templates/InstructorEnrollmentList';
import CopyEnrollment from './components/templates/CopyEnrollment';
import Enrollment from './components/templates/Enrollment';
import UserEnrollmentList from './components/templates/UserEnrollmentList';
import Admin from './components/templates/Admin';
import FAQ from './components/templates/Faq';
import FormRouter from './components/organisms/FormRouter';
import { AuthRequired, useAuth } from './components/organisms/AuthContext';

export const Routes = () => {
  const { user } = useAuth();
  const location = useLocation();
  useLayoutEffect(() => window.scrollTo(0, 0), [location.pathname]);

  return (
    <ReactRouterRoutes>
      <Route path="public" element={<PublicEnrollmentList />}>
        <Route path=":targetApi" element={<PublicEnrollmentList />} />
      </Route>

      <Route path="stats" element={<Stats />}>
        <Route path=":targetApi" element={<Stats />} />
      </Route>

      <Route path="accessibilite" element={<Accessibilite />} />

      <Route path="faq" element={<FAQ />} />

      <Route path="admin" element={<AuthRequired children={<Admin />} />} />

      <Route
        path="copy-authorization-request/:enrollmentId"
        element={<AuthRequired children={<CopyEnrollment />} />}
      />

      <Route
        path="authorization-request/:enrollmentId"
        element={<AuthRequired children={<Enrollment />} />}
      />

      <Route
        index
        element={
          <AuthRequired>
            {user && isEmpty(user.roles) && user.organizations.length < 5 ? (
              <UserEnrollmentList />
            ) : (
              <AdminEnrollmentList />
            )}
          </AuthRequired>
        }
      />

      <Route path=":targetApi" element={<FormRouter />}>
        <Route path=":enrollmentId" element={<FormRouter />} />
      </Route>
    </ReactRouterRoutes>
  );
};

export default Routes;
