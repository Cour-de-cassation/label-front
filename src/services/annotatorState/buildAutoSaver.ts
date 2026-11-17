import { annotationsDiffType } from 'src/types/annotationsDiff';
import { squash } from 'src/services/annotatorState/annotationsDiff/squash';

export type autoSaverType = {
  autoSave: () => void;
  saveCommit: (commit: annotationsDiffType) => void;
};

export function buildAutoSaver({
  applySave = async () => {},
}: {
  applySave?: (annotationsDiff: annotationsDiffType) => Promise<void>;
}): autoSaverType {
  let commitsToSave = [] as annotationsDiffType[];

  return {
    autoSave,
    saveCommit,
  };

  async function autoSave() {
    const cachedCommitsToSave = [...commitsToSave];
    const annotationsDiffToSave = squash(commitsToSave);
    commitsToSave = [];
    try {
      await applySave(annotationsDiffToSave);
    } catch (error) {
      commitsToSave = [...cachedCommitsToSave, ...commitsToSave];
      console.warn(error);
    }
  }

  function saveCommit(commit: annotationsDiffType) {
    commitsToSave.push(commit);

    autoSave();
  }
}
