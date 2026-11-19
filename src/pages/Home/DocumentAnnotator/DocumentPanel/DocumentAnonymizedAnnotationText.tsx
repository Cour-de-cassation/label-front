import { clientAnonymizerType } from 'src/types/anonymizer';
import React from 'react';
import { annotationType } from 'src/types/annotation';

export { DocumentAnonymizedAnnotationText };

function DocumentAnonymizedAnnotationText(props: { anonymizer: clientAnonymizerType; annotation: annotationType }) {
  return <span>{props.anonymizer.anonymize(props.annotation)}</span>;
}
