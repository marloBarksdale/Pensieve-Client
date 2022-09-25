export const login = () => ({
  query: (loginData) => ({
    url: '/user/login',
    body: loginData,
    method: 'POST',
  }),
});

export const logout = () => ({
  query: () => ({
    url: '/user/logout',

    method: 'POST',
  }),
});

export const signup = () => ({
  query: (signupData) => ({
    url: '/user/signup',
    method: 'POST',
    body: signupData,
  }),
});
