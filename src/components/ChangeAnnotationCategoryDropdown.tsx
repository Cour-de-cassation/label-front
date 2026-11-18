import React, { ReactElement } from 'react';
import { IconDropdown } from 'src/pelta-design-system';
import { annotationType } from 'src/types/annotation';
import { useAnnotatorStateHandler } from '../services/annotatorState';
import { wordings } from '../wordings';
import { CategoryIcon } from './CategoryIcon';
import { getAnnotationCategoryText } from 'src/utils/settings/getAnnotationCategoryText';
import { getCategories } from 'src/utils/settings/getCategories';
import { updateEntityCategory } from 'src/utils/annotation/annotationHandler';
import { MOTIVATION_CATEGORY } from 'src/utils/settings/specialCategories';

export { ChangeAnnotationCategoryDropdown };

const CATEGORY_ICON_SIZE = 30;
const CHANGE_ANNOTATION_CATEGORY_MENU_WIDTH = 300;

function ChangeAnnotationCategoryDropdown(props: {
  annotation: annotationType;
  buttonSize?: number;
  origin: 'document' | 'panel';
}): ReactElement {
  const annotatorStateHandler = useAnnotatorStateHandler();
  const annotatorState = annotatorStateHandler.get();
  const { settings } = annotatorState;
  const categories = getCategories(settings, {
    status: ['annotable', 'visible'],
    canBeAnnotatedBy: 'human',
  });

  return (
    <IconDropdown
      hint={wordings.homePage.changeCategory}
      iconName="puzzle"
      buttonSize={props.buttonSize}
      items={categories.map((category) => ({
        icon: <CategoryIcon category={category} iconSize={CATEGORY_ICON_SIZE} settings={annotatorState.settings} />,
        text: getAnnotationCategoryText(category, annotatorState.settings),
        value: category,
      }))}
      onChange={changeAnnotationCategory}
      width={CHANGE_ANNOTATION_CATEGORY_MENU_WIDTH}
      disabled={props.annotation.category === MOTIVATION_CATEGORY.name}
    />
  );

  function changeAnnotationCategory(newCategory: string) {
    const newAnnotations = updateEntityCategory(
      annotatorState.annotations,
      props.annotation.entityId,
      newCategory,
      settings,
    );

    const newAnnotatorState = { ...annotatorState, annotations: newAnnotations };
    annotatorStateHandler.set(newAnnotatorState);
  }
}
