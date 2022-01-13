import React from 'react';
import Form from '../components/templates/Form';
import OrganisationSection from '../components/organisms/form-sections/OrganisationSection';
import DescriptionSection from '../components/organisms/form-sections/DescriptionSection';
import DonneesSection from '../components/organisms/form-sections/DonneesSection';
import CadreJuridiqueSection from '../components/organisms/form-sections/CadreJuridiqueSection';
import CguSection from '../components/organisms/form-sections/CguSection';
import ÉquipeSection from '../components/organisms/form-sections/ÉquipeSection';
import { DATA_PROVIDER_PARAMETERS } from '../config/data-provider-parameters';
import { getDefaultDocumentationUrl } from '../components/organisms/Nav';
import Link from '../components/molecules/hyperTexts/Link';

export const DonneesDescription = () => (
  <>
    <p>
      La loi informatique et libertés définit les principes à respecter lors de
      la collecte, du traitement et de la conservation de données personnelles.
    </p>
    <p>L’article 6 précise :</p>
    <ul>
      <li>
        3° [les données] sont adéquates, pertinentes et non excessives au regard
        des finalités pour lesquelles elles sont collectées et de leurs
        traitements ultérieurs ;
      </li>
      <li>
        4° Elles sont exactes, complètes et, si nécessaire, mises à jour ; les
        mesures appropriées doivent être prises pour que les données inexactes
        ou incomplètes au regard des finalités pour lesquelles elles sont
        collectées ou traitées soient effacées ou rectifiées ;
      </li>
    </ul>
    <p>
      Nous vous remercions de sélectionner uniquement les données strictement
      nécessaires à votre téléservice. Le non-respect du principe de
      proportionnalité vous expose vis-à-vis de la CNIL.
    </p>
  </>
);

export const CadreJuridiqueDescription = () => (
  <>
    <p>
      Pour pouvoir bénéficier du raccordement à l’API prestations sociales, le
      cadre légal et réglementaire des fournisseurs de service doit permettre à
      Direction de la Sécurité Sociale de transmettre des données personnelles à
      votre entité administrative.
    </p>
    <p>
      Dans le cas où vous représentez une collectivité, veuillez joindre la
      délibération du conseil municipal explicitant l’usage des données
      demandées.
    </p>
    <p>
      Important : à priori, vous n’avez pas de nouvelle délibération à réaliser.
      Il vous suffit de déposer la dernière délibération tarifaire qui détaille
      les barèmes de facturation des services, ou le règlement qui décrit les
      données nécessaires à une instruction.
    </p>
    <p>
      Pour en savoir plus, consultez{' '}
      <Link inline href="https://api.gouv.fr/guides/deliberation-api-part">
        notre guide sur ce qu’est une bonne délibération
      </Link>
      .
    </p>
  </>
);

export const availableScopes = [
  {
    value: 'beneficiaire_rsa',
    label: 'Bénéficiaire du RSA',
  },
  {
    value: 'beneficiaire_css',
    label: 'Bénéficiaire de la CSS',
  },
];

const target_api = 'api_prestations_sociales';

const ApiPrestationsSociales = () => (
  <Form
    target_api={target_api}
    contactEmail={DATA_PROVIDER_PARAMETERS[target_api]?.email}
    documentationUrl={getDefaultDocumentationUrl(target_api)}
  >
    <OrganisationSection />
    <DescriptionSection />
    <DonneesSection
      availableScopes={availableScopes}
      DonneesDescription={DonneesDescription}
    />
    <CadreJuridiqueSection
      CadreJuridiqueDescription={CadreJuridiqueDescription}
    />
    <ÉquipeSection />
    <CguSection cguLink="https://api.gouv.fr/resources/CGU%20API%20Particulier.pdf" />
  </Form>
);

export default ApiPrestationsSociales;
