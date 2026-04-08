import React, { FunctionComponent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { urlHandler } from '../../utils';

export { Login };

const isDev = window.location.hostname === 'localhost';

const DEV_USERS = [
  { label: 'Admin', email: 'test.admin@label.fr' },
  { label: 'Annotateur', email: 'test.annotator@label.fr' },
  { label: 'Publicateur', email: 'test.publicator@label.fr' },
  { label: 'Scrutateur', email: 'test.scrutator@label.fr' },
];

const Login: FunctionComponent = () => {
  const history = useHistory();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    if (token) {
      history.push('/');
    } else if (!isDev) {
      window.location.href = urlHandler.getSsoLoginUrl();
    }
  }, [history]);

  if (!isDev) return <p>Redirection vers SSO...</p>;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: 8,
      }}
    >
      <p>Connexion locale</p>
      {DEV_USERS.map(({ label, email }) => (
        <button
          key={email}
          onClick={() =>
            (window.location.href = `${urlHandler.getApiUrl()}/label/api/sso/dev-login?email=${encodeURIComponent(
              email,
            )}`)
          }
        >
          {label}
        </button>
      ))}
    </div>
  );
};
