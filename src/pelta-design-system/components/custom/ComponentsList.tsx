import React, { ReactElement } from 'react';

export { ComponentsList };

function ComponentsList(props: {
  components: Array<ReactElement | undefined>;
  spaceBetweenComponents: number;
}): ReactElement {
  const style = buildStyle();

  return (
    <div style={style.container}>
      {props.components.filter(Boolean).reduce(
        (componentList, component, ind) => [
          ...componentList,
          // eslint-disable-next-line @eslint-react/no-array-index-key -- components are passed without keys
          <span key={2 * ind} style={style.componentContainer}>
            {component}
          </span>,
          // eslint-disable-next-line @eslint-react/no-array-index-key -- spacers have no identity
          <span key={2 * ind + 1} style={style.spaceBetweenComponents} />,
        ],
        [] as ReactElement[],
      )}
    </div>
  );

  function buildStyle() {
    return {
      container: { display: 'flex' },
      componentContainer: { display: 'flex', alignItems: 'center' },
      spaceBetweenComponents: {
        paddingRight: props.spaceBetweenComponents,
      },
    };
  }
}
