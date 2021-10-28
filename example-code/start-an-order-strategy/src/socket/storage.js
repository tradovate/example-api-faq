export const getUserData = () => JSON.parse(sessionStorage.getItem('tradovate-user-data') || {})
export const setUserData = value => sessionStorage.setItem('tradovate-user-data', JSON.stringify(value))