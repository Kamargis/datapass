import React from 'react';
import PropTypes from 'prop-types';

import Form from '../../components/templates/Form';
import CadreJuridiqueSection from '../../components/organisms/form-sections/CadreJuridiqueSection';
import HomologationSecuriteSection from '../../components/organisms/form-sections/dgfip-sections/HomologationSecuriteSection';
import RecetteFonctionnelleSection from '../../components/organisms/form-sections/dgfip-sections/RecetteFonctionnelleSection';
import VolumetrieSection from '../../components/organisms/form-sections/dgfip-sections/VolumetrieSection';
import CguSection from '../../components/organisms/form-sections/CguSection';
import ÉquipeInitializerSection from '../../components/organisms/form-sections/ÉquipeSection/ÉquipeInitializerSection';
import { DATA_PROVIDER_CONTACT_EMAILS } from '../../config/data-provider-parameters';

const target_api = 'api_hermes_production';
const steps = ['api_hermes_sandbox', target_api];

const ApiHermesProduction = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <Form
    enrollmentId={enrollmentId}
    target_api={target_api}
    steps={steps}
    contactEmail={DATA_PROVIDER_CONTACT_EMAILS.dgfip}
    documentationUrl="https://api.gouv.fr/producteurs/dgfip"
  >
    <ÉquipeInitializerSection />
    <RecetteFonctionnelleSection />
    <CadreJuridiqueSection />
    <HomologationSecuriteSection />
    <VolumetrieSection options={[200, 1000]} />
    <CguSection cguLink="/docs/cgu_api_hermes_production_v1_3_05-05-2021_cdc.pdf" />
  </Form>
);

ApiHermesProduction.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

ApiHermesProduction.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default ApiHermesProduction;
