import { buildDependencyManager } from 'src/core';
export { dependencyManager };

const { dependencyManager } = buildDependencyManager(process.env.REACT_ENV_RUN_MODE);
