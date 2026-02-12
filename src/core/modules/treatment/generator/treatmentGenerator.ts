import { generatorType } from '../../../types';
import { annotationsDiffModule } from '../../annotationsDiff';
import { treatmentType } from '../treatmentType';

export { treatmentGenerator };

const treatmentGenerator: generatorType<treatmentType> = {
  generate: ({
    _id,
    annotationsDiff,
    documentId,
    duration,
    lastUpdateDate,
    order,
    source,
    subAnnotationsSensitiveCount,
    surAnnotationsCount,
    subAnnotationsNonSensitiveCount,
  } = {}) => ({
    _id: _id ? _id : 'monId123',
    annotationsDiff: annotationsDiff ? annotationsDiff : annotationsDiffModule.generator.generate(),
    documentId: documentId ? documentId : 'monId123',
    duration: duration ? duration : 0,
    lastUpdateDate: lastUpdateDate ? lastUpdateDate : new Date().getTime(),
    order: order ? order : 0,
    source: source ? source : 'NLP',
    subAnnotationsNonSensitiveCount:
      subAnnotationsNonSensitiveCount !== undefined ? subAnnotationsNonSensitiveCount : 0,
    subAnnotationsSensitiveCount: subAnnotationsSensitiveCount !== undefined ? subAnnotationsSensitiveCount : 0,
    surAnnotationsCount: surAnnotationsCount !== undefined ? surAnnotationsCount : 0,
  }),
};
