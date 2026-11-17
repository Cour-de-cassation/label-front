import React from 'react';
import { customThemeType, useCustomTheme, Text } from 'src/pelta-design-system';
import { CategoryIcon } from '../../../../components';
import { useAnnotatorStateHandler } from '../../../../services/annotatorState';
import { getAnnotationCategoryText } from 'src/utils/settings/getAnnotationCategoryText';

export { EmptyCategory };

function EmptyCategory(props: { category: string }) {
  const annotatorStateHandler = useAnnotatorStateHandler();
  const theme = useCustomTheme();
  const iconSize = theme.shape.borderRadius.l;
  const styles = buildStyles(theme);
  const annotatorState = annotatorStateHandler.get();

  const categoryName = getAnnotationCategoryText(props.category, annotatorState.settings);

  return (
    <div style={styles.container}>
      <div style={styles.categoryIconContainer}>
        <CategoryIcon category={props.category} iconSize={iconSize} settings={annotatorState.settings} />
      </div>
      <div style={styles.categoryTextContainer}>
        <Text>{`${categoryName} (0)`}</Text>
      </div>
    </div>
  );
  function buildStyles(theme: customThemeType) {
    return {
      container: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
      },
      categoryIconContainer: {
        paddingLeft: theme.spacing,
      },
      categoryTextContainer: {
        paddingLeft: theme.spacing,
      },
    } as const;
  }
}
