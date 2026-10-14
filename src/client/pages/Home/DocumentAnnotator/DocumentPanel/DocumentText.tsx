import React, { ReactElement, useState, MouseEvent } from 'react';
import { useAlert } from './../../../../services/alert';
import { positionType } from 'pelta-design-system';
import { AnnotationCreationTooltipMenu } from './AnnotationCreationTooltipMenu';
import { textNeighboursType } from '../lib';
import { useIsCtrlPressed } from '../hooks';
import { wordings } from 'src/client/wordings';

export { PureDocumentText as DocumentText };

export type { textSelectionType };

type textSelectionType = Array<{
  index: number;
  text: string;
}>;

type propsType = { neighbours: textNeighboursType };

class PureDocumentText extends React.Component<propsType> {
  shouldComponentUpdate(nextProps: propsType) {
    return (
      nextProps.neighbours.current.index !== this.props.neighbours.current.index ||
      nextProps.neighbours.current.text !== this.props.neighbours.current.text
    );
  }

  render() {
    return <DocumentText neighbours={this.props.neighbours} />;
  }
}

function DocumentText(props: propsType): ReactElement {
  const [textSelection, setTextSelection] = useState<textSelectionType>([]);
  const [tooltipMenuOriginPosition, setTooltipMenuOriginPosition] = useState<positionType | undefined>();
  const isCtrlPressed = useIsCtrlPressed();
  const { displayAlert } = useAlert();

  const styles = buildStyles();
  return (
    <span>
      <span onMouseUp={handleSelection} style={styles.text}>
        {props.neighbours.current.text}
      </span>
      {tooltipMenuOriginPosition && textSelection.length > 0 && !isCtrlPressed && (
        <AnnotationCreationTooltipMenu
          onClose={closeTooltipMenu}
          originPosition={tooltipMenuOriginPosition}
          textSelection={textSelection}
        />
      )}
    </span>
  );

  function handleSelection(event: MouseEvent<Element>) {
    const validSelection = getValidSelection(window.getSelection());
    if (!validSelection.length) {
      return;
    }

    if (isCtrlPressed) {
      setTextSelection((previousSelection) => mergeSelection(previousSelection, validSelection[0]));
      displayAlert({
        text: `${wordings.homePage.multipleSelectedTerms} : ${textSelection.map(term => term.text).join(', ')}`,
        variant: 'info',
        autoHide: true,
      });
    } else {
      setTextSelection(validSelection);
    }
    openTooltipMenu(event);
  }

  function mergeSelection(previousSelection: textSelectionType, newTerm: textSelectionType[number]): textSelectionType {
    const alreadySelected = previousSelection.some((term) => term.index === newTerm.index);
    if (alreadySelected) {
      return previousSelection.filter((term) => term.index !== newTerm.index);
    }
    return [...previousSelection, newTerm];
  }

  function getValidSelection(selection: Selection | null) {
    if (!selection) {
      return [];
    }
    const anchorNodeValue = selection.anchorNode?.nodeValue;
    const focusNodeValue = selection.focusNode?.nodeValue;
    const selectionText = selection.toString();

    if (
      !anchorNodeValue ||
      !focusNodeValue ||
      !selectionText ||
      !selectionText.trim() ||
      selection.anchorOffset === selection.focusOffset
    ) {
      return [];
    }
 
    if (anchorNodeValue === focusNodeValue && !selectionText.includes('\n')) {
      return [{ text: selectionText.trim(), index: computeSelectedTextIndex(selection) }];
    }
    return [];
  }

  function openTooltipMenu(event: MouseEvent<Element>) {
    setTooltipMenuOriginPosition({ x: event.clientX, y: event.clientY });
  }

  function closeTooltipMenu() {
    setTooltipMenuOriginPosition(undefined);
  }

  function computeSelectedTextIndex(selection: Selection) {
    return Math.min(selection.anchorOffset, selection.focusOffset) + props.neighbours.current.index;
  }
}

function buildStyles() {
  return {
    text: {
      whiteSpace: 'break-spaces',
    },
  } as const;
}
