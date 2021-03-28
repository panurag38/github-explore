import Storage from './storage';

export async function setUserLoggedIn({ userName, password }) {
  await Storage.set('loginUser', { userName, password, loggedIn: true });
  return true;
}

export async function getUserData() {
  const value = await Storage.get('loginUser') || {};
  return value;
}

export async function isUserLoggedIn() {
  const value = await Storage.get('loginUser') || {};
  return value.loggedIn;
}

export async function logout() {
  await Storage.set('loginUser', {});
}
