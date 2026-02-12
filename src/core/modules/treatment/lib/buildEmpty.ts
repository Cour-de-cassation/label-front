import { treatmentGenerator } from '../generator';
import { treatmentType } from '../treatmentType';

export { buildEmpty };

function buildEmpty(
  treatmentFields: Omit<
    treatmentType,
    | '_id'
    | 'duration'
    | 'lastUpdateDate'
    | 'subAnnotationsSensitiveCount'
    | 'subAnnotationsNonSensitiveCount'
    | 'surAnnotationsCount'
  >,
): treatmentType {
  const treatment = treatmentGenerator.generate(treatmentFields);

  return {
    ...treatment,
    _id: 'monId123',
    subAnnotationsSensitiveCount: 0,
    surAnnotationsCount: 0,
    subAnnotationsNonSensitiveCount: 0,
    duration: 0,
    lastUpdateDate: new Date().getTime(),
  };
}
