export { splitTextAccordingToNewLine };

function splitTextAccordingToNewLine(text: string): string[] {
  return text.split('\r\n').flatMap((_) => _.split(/\r|\n/));
}
