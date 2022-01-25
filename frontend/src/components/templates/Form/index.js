import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';

import { getUserEnrollment } from '../../../services/enrollments';
import SubmissionPanel from './SubmissionPanel';
import { DATA_PROVIDER_PARAMETERS } from '../../../config/data-provider-parameters';
import { getStateFromUrlParams } from '../../../lib';
import Nav from '../../organisms/Nav';
import { Linkify } from '../../molecules/Linkify';
import { enrollmentReducerFactory } from './enrollmentReducer';
import './style.css';
import Alert from '../../atoms/Alert';
import WarningEmoji from '../../atoms/icons/WarningEmoji';
import HeadSection from '../../organisms/form-sections/HeadSection';
import StepperSection from '../../organisms/form-sections/StepperSection';
import useListItemNavigation from '../hooks/use-list-item-navigation';
import NotFound from '../../organisms/NotFound';

export const FormContext = React.createContext();

export const Form = ({
  target_api,
  demarches = null,
  children,
  documentationUrl,
  contactEmail,
}) => {
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessages, setSuccessMessages] = useState([]);
  const [isUserEnrollmentLoading, setIsUserEnrollmentLoading] = useState(true);
  const { enrollmentId } = useParams();
  const [hasNotFoundError, setHasNotFoundError] = useState(false);
  const navigate = useNavigate();
  const { goBackToList } = useListItemNavigation();

  const sectionLabels = useMemo(() => {
    return React.Children.map(
      children,
      ({ type: { sectionLabel } }) => sectionLabel
    );
  }, [children]);

  const enrollmentReducer = useMemo(
    () => enrollmentReducerFactory(demarches),
    [demarches]
  );

  const [enrollment, dispatchSetEnrollment] = useReducer(enrollmentReducer, {
    acl: {
      update: true,
      submit: true, // Enable edition for new enrollment (ie. enrollment has no id)
    },
    status: 'draft',
    events: [],
    target_api,
    additional_content: {},
  });

  useEffect(() => {
    async function fetchUserEnrollment() {
      try {
        const userEnrollment = await getUserEnrollment(enrollmentId);
        dispatchSetEnrollment(userEnrollment);
        setIsUserEnrollmentLoading(false);
      } catch (error) {
        if ([403, 404].includes(error.response?.status)) {
          setHasNotFoundError(true);
          setTimeout(() => goBackToList(), 3000);
        }
      }
    }

    if (enrollmentId) {
      fetchUserEnrollment();
    } else {
      const { demarche } = getStateFromUrlParams({
        demarche: '',
      });

      if (demarche) {
        // team_members within demarches needs enrollments team_member
        // collection to be initialized first. We wait 500ms to ensure
        // team_members are initialized by ÉquipeSection component.
        setTimeout(
          () =>
            dispatchSetEnrollment({
              target: { name: 'demarche', value: demarche },
            }),
          500
        );
      }
      setIsUserEnrollmentLoading(false);
    }
  }, [enrollmentId, goBackToList]);

  useEffect(() => {
    const targetApiLabel = `${DATA_PROVIDER_PARAMETERS[target_api]?.label}`;

    if (targetApiLabel) {
      document.title = targetApiLabel;
    }

    if (enrollment.id) {
      document.title = `${enrollment.id} - ${
        enrollment.intitule || targetApiLabel
      }`;
    }
  }, [enrollment.id, enrollment.intitule, target_api]);

  useEffect(() => {
    if (enrollment.id && !window.location.pathname.includes(enrollment.id)) {
      navigate(`${enrollment.id}`, { replace: true });
    }
  }, [enrollment.id, navigate]);

  const handlePostEvent = useCallback(
    ({ errorMessages = [], successMessages = [], redirectToHome = false }) => {
      if (redirectToHome) {
        return goBackToList();
      }

      setErrorMessages(errorMessages);
      setSuccessMessages(successMessages);
    },
    [goBackToList]
  );

  if (hasNotFoundError) {
    return <NotFound />;
  }

  return (
    <main className="dashboard-page">
      <Nav
        target_api={target_api}
        documentationUrl={documentationUrl}
        contactEmail={contactEmail}
        sectionLabels={sectionLabels}
      />
      <div className="form-container">
        <FormContext.Provider
          value={{
            disabled: !enrollment.acl.submit,
            onChange: dispatchSetEnrollment,
            enrollment,
            isUserEnrollmentLoading,
            demarches,
          }}
        >
          <HeadSection />
          <StepperSection />
          {children}
        </FormContext.Provider>

        {(!isEmpty(errorMessages) || !isEmpty(successMessages)) && (
          <div>
            {successMessages.map((successMessage) => (
              <Alert type="success" key={successMessage}>
                <Linkify message={successMessage} />
              </Alert>
            ))}
            {!isEmpty(errorMessages) && (
              <Alert title="Erreur" type="error">
                {errorMessages.map((errorMessage) => (
                  <p key={errorMessage} style={{ whiteSpace: 'pre-line' }}>
                    <WarningEmoji />
                    {' '}
                    <Linkify message={errorMessage} />
                  </p>
                ))}
              </Alert>
            )}
          </div>
        )}

        <SubmissionPanel
          enrollment={enrollment}
          updateEnrollment={dispatchSetEnrollment}
          handlePostEvent={handlePostEvent}
        />
      </div>
    </main>
  );
};

export default Form;
