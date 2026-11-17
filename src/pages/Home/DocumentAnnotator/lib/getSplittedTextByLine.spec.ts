import { getSplittedTextByLine } from './getSplittedTextByLine';
import { annotationGenerator } from 'src/core/modules/annotation/generator/annotationGenerator';
import { buildTextChunk, buildAnnotationChunk } from 'src/utils/textSplitter';

describe('getSplittedTextByLine', () => {
  const annotations = [
    { category: 'firstName', text: 'Benoit', start: 0 },
    { category: 'firstName', text: 'Nicolas', start: 29 },
    { category: 'firstName', text: 'Romain', start: 66 },
  ].map(annotationGenerator.generate);

  it('should split a text according to the given annotations', () => {
    const text = 'Benoit is software engineer. Nicolas is a software engineer.\r\rAnd Romain is a designer.';

    const splittedTextByLine = getSplittedTextByLine(text, annotations);

    expect(splittedTextByLine).toEqual([
      {
        line: 1,
        content: [
          buildAnnotationChunk(annotations[0]),
          buildTextChunk(' is software engineer. ', 6),
          buildAnnotationChunk(annotations[1]),
          buildTextChunk(
            ' is a software engineer.',
            36,
            [],
            [
              { text: '', index: 61 },
              { text: 'And ', index: 62 },
            ],
          ),
        ],
      },
      {
        line: 2,
        content: [],
      },
      {
        line: 3,
        content: [
          buildTextChunk('And ', 62, [
            { text: ' is a software engineer.', index: 36 },
            { text: '', index: 61 },
          ]),
          buildAnnotationChunk(annotations[2]),
          buildTextChunk(' is a designer.', 72),
        ],
      },
    ]);
  });
});
