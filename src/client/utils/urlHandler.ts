export { urlHandler };

const urlHandler = {
  getApiUrl() {
    const clientPort = parseInt(window.location.port);
    const clientProtocol = window.location.protocol;
    const clientHostname = window.location.hostname;

    const serverPort = clientPort - 2;

    return serverPort ? `${clientProtocol}//${clientHostname}:${serverPort}` : `${clientProtocol}//${clientHostname}`;
  },

  getSsoLoginUrl() {
    const redirectUrl = encodeURIComponent(`${window.location.origin}/login`);
    return `${this.getApiUrl()}/label/api/sso/login?redirectUrl=${redirectUrl}`;
  },

  getSsoLogoutUrl() {
    return `${this.getApiUrl()}/label/api/sso/logout`;
  },
};
