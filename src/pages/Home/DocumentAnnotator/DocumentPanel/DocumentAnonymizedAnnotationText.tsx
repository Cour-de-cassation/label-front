import { clientAnonymizerType } from '../../../../types';
import React from 'react';
import { annotationType } from 'src/core';

export { DocumentAnonymizedAnnotationText };

function DocumentAnonymizedAnnotationText(props: { anonymizer: clientAnonymizerType; annotation: annotationType }) {
  return <span>{props.anonymizer.anonymize(props.annotation)}</span>;
}
