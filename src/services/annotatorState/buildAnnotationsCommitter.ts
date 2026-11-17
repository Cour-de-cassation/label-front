import { annotationType } from 'src/types/annotation';
import { annotationsDiffType } from 'src/types/annotationsDiff';
import { computeAnnotationsDiff } from 'src/services/annotatorState/annotationsDiff/computeAnnotationsDiff';
import { applyToAnnotations } from 'src/services/annotatorState/annotationsDiff/applyToAnnotations';
import { inverse } from 'src/services/annotatorState/annotationsDiff/inverse';

export type annotationsCommitterType = {
  clean: () => void;
  commit: (previousAnnotations: annotationType[], nextAnnotations: annotationType[]) => annotationsDiffType;
  revert: (previousAnnotations: annotationType[]) => {
    annotations: annotationType[];
    commit: annotationsDiffType;
  };
  restore: (previousAnnotations: annotationType[]) => {
    annotations: annotationType[];
    commit: annotationsDiffType;
  };
  canRevert: () => boolean;
  canRestore: () => boolean;
};

export function buildAnnotationsCommitter(): annotationsCommitterType {
  let annotationCommitsToRevert: annotationsDiffType[] = [];
  let annotationCommitsToRestore: annotationsDiffType[] = [];

  return {
    clean,
    commit,
    revert,
    restore,
    canRevert,
    canRestore,
  };

  function clean() {
    annotationCommitsToRevert = [];
    annotationCommitsToRestore = [];
  }

  function commit(previousAnnotations: annotationType[], nextAnnotations: annotationType[]) {
    const annotationsDiff = computeAnnotationsDiff(previousAnnotations, nextAnnotations);
    annotationCommitsToRevert.push(annotationsDiff);
    annotationCommitsToRestore = [];

    return annotationsDiff;
  }

  function revert(previousAnnotations: annotationType[]) {
    return revertCommit(previousAnnotations, annotationCommitsToRevert, annotationCommitsToRestore);
  }

  function restore(previousAnnotations: annotationType[]) {
    return revertCommit(previousAnnotations, annotationCommitsToRestore, annotationCommitsToRevert);
  }

  function canRevert() {
    return annotationCommitsToRevert.length > 0;
  }

  function canRestore() {
    return annotationCommitsToRestore.length > 0;
  }

  function revertCommit(
    annotations: annotationType[],
    previousCommits: annotationsDiffType[],
    nextCommits: annotationsDiffType[],
  ): { annotations: annotationType[]; commit: annotationsDiffType } {
    const previousCommit = previousCommits.pop();
    if (!previousCommit) {
      throw new Error('No commit to revert');
    }

    const revertedPreviousCommit = inverse(previousCommit);

    nextCommits.push(revertedPreviousCommit);

    return {
      annotations: applyToAnnotations(annotations, revertedPreviousCommit),
      commit: revertedPreviousCommit,
    };
  }
}
