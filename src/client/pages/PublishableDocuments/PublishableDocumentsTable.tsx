import React from 'react';
import { useHistory } from 'react-router';
import { Text } from 'pelta-design-system';
import { apiRouteOutType, timeOperator } from 'src/core';
import { orderDirectionType, PaginatedTable, tableRowFieldType } from 'pelta-design-system';
import { localStorage, publishableDocumentOrderByProperties } from '../../services/localStorage';
import { wordings } from '../../wordings';
import { routes } from '../routes';
import format from 'string-template';

export { PublishableDocumentsTable };

function PublishableDocumentsTable(props: {
  publishableDocuments: apiRouteOutType<'get', 'publishableDocuments'>;
  refetch: () => void;
}) {
  const history = useHistory();
  const fields = buildPublishableDocumentsFields();
  const styles = buildStyles();
  const numberConfirmationDecision = props.publishableDocuments.filter(
    (document) => document.route == 'confirmation',
  ).length;
  const orderByProperty = localStorage.publishableDocumentsStateHandler.getOrderByProperty();
  const orderDirection = localStorage.publishableDocumentsStateHandler.getOrderDirection();
  return (
    <div style={styles.container}>
      <div>
        {numberConfirmationDecision > 0 && (
          <Text color="textSecondary">
            {format(wordings.publishableDocumentsPage.confirmationDocumentAlert, { count: numberConfirmationDecision })}
          </Text>
        )}
      </div>
      <br />

      <PaginatedTable
        fields={fields}
        data={props.publishableDocuments}
        buildOptionItems={buildOptionItems}
        defaultOrderByProperty={orderByProperty}
        defaultOrderDirection={orderDirection}
        onOrderByPropertyChange={onOrderByPropertyChange}
        onOrderDirectionChange={onOrderDirectionChange}
      />
    </div>
  );

  function onOrderByPropertyChange(newOrderByProperty: (typeof publishableDocumentOrderByProperties)[number]) {
    localStorage.publishableDocumentsStateHandler.setOrderByProperty(newOrderByProperty);
  }

  function onOrderDirectionChange(newOrderDirection: orderDirectionType) {
    localStorage.publishableDocumentsStateHandler.setOrderDirection(newOrderDirection);
  }

  function buildOptionItems(publishableDocument: apiRouteOutType<'get', 'publishableDocuments'>[number]) {
    const openAnonymizedDocumentOptionItem = {
      kind: 'text' as const,
      text: wordings.publishableDocumentsPage.table.optionItems.openAnonymizedDocument,
      onClick: () => {
        history.push(routes.ANONYMIZED_DOCUMENT.getPath(publishableDocument._id));
        return;
      },
    };

    return [openAnonymizedDocumentOptionItem];
  }
}

function buildPublishableDocumentsFields() {
  const publishableDocumentsFields: Array<
    tableRowFieldType<
      apiRouteOutType<'get', 'publishableDocuments'>[number],
      (typeof publishableDocumentOrderByProperties)[number]
    >
  > = [
    {
      id: 'documentNumber',
      title: wordings.business.filters.columnTitles.documentNumber,
      canBeSorted: true,
      extractor: (publishableDocument) => JSON.stringify(publishableDocument.documentNumber),
      width: 3,
    },
    {
      id: 'jurisdiction',
      title: wordings.business.filters.columnTitles.jurisdiction.title,
      tooltipText: wordings.business.filters.columnTitles.jurisdiction.tooltipText,
      canBeSorted: true,
      extractor: (publishableDocument) => publishableDocument.jurisdiction,
      width: 4,
    },
    {
      id: 'chamberName',
      title: wordings.business.filters.columnTitles.chamberName,
      canBeSorted: true,
      extractor: (publishableDocument) => publishableDocument.chamberName,
      width: 4,
    },
    {
      id: 'appealNumber',
      title: wordings.business.filters.columnTitles.appealNumber,
      canBeSorted: true,
      extractor: (publishableDocument) => publishableDocument.appealNumber,
      width: 4,
    },
    {
      id: 'status',
      title: wordings.business.filters.columnTitles.status,
      canBeSorted: true,
      extractor: (publishableDocument) => wordings.business.documentStatus[publishableDocument.status],
      width: 4,
    },
    {
      id: 'creationDate',
      title: wordings.business.filters.columnTitles.creationDate.title,
      tooltipText: wordings.business.filters.columnTitles.creationDate.tooltipText,
      canBeSorted: true,
      extractor: (publishableDocument) =>
        publishableDocument.creationDate
          ? timeOperator.convertTimestampToReadableDate(publishableDocument.creationDate, true)
          : '-',
      getSortingValue: (publishableDocument) => publishableDocument.creationDate || 0,
      width: 3,
    },
  ];
  return publishableDocumentsFields;
}

function buildStyles() {
  return {
    container: {
      height: '100%',
    },
  };
}
