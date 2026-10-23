import React, { FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { urlHandler } from '../../utils';

export { Login };

const isDev = import.meta.env.MODE !== 'production';

const DEV_USERS = [
  { label: 'Admin', email: 'test.admin@label.fr' },
  { label: 'Annotateur', email: 'test.annotator@label.fr' },
  { label: 'Publicateur', email: 'test.publicator@label.fr' },
  { label: 'Scrutateur', email: 'test.scrutator@label.fr' },
];

const Login: FunctionComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    if (token) {
      navigate('/');
    } else if (!isDev) {
      window.location.href = urlHandler.getSsoLoginUrl();
    }
  }, [navigate]);

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
