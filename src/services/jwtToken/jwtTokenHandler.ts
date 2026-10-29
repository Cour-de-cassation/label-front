export { jwtTokenHandler };

const JWT_TOKEN_KEY = 'jwt_token';

const jwtTokenHandler = {
  set(token: string): void {
    localStorage.setItem(JWT_TOKEN_KEY, token);
  },

  get(): string | null {
    return localStorage.getItem(JWT_TOKEN_KEY);
  },

  remove(): void {
    localStorage.removeItem(JWT_TOKEN_KEY);
  },

  isTokenPresent(): boolean {
    return !!this.get();
  },
};
