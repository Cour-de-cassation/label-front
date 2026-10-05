export { heights };

const heights = buildHeights();

function buildHeights() {
  const HEADER_HEIGHT = "72px";
  const ADMIN_PANEL_HEIGHT = `calc(100vh - ${HEADER_HEIGHT})`;

  return {
    header: HEADER_HEIGHT,
    adminPanel: ADMIN_PANEL_HEIGHT,
  };
}
