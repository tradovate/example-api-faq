export const getUserData = () => sessionStorage.getItem('tradovate-user-data') || {}
export const setUserData = value => sessionStorage.getItem('tradovate-user-data', value)