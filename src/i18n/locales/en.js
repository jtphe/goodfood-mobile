export default {
  home: {
    screenTitle: 'Home',
    btnDelivery: 'Delivery',
    btnTakeaway: 'Takeaway',
    placeholderSearchFood: 'Search for your food...',
    peckishTitle: 'Peckish ? 🍔'
  },
  login: {
    screenTitle: 'Login',
    welcome: 'Welcome to Good Food !',
    email: 'Email',
    password: 'Password',
    connection: 'Connection',
    noAccount: "Don't have an account ?",
    register: 'Register !'
  },
  register: {
    screenTitle: 'Register',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm your password',
    createAccount: 'Create your account'
  },
  error: {
    emailIncorrect: 'The email address is invalid',
    passwordTooShort: 'The password must be at least 8 characters long',
    emailAndPasswordIncorrect: 'Check your login details',
    passwordNotTheSame: 'Passwords do not match'
  },
  connection: {
    disconnected: 'Searching for a connection...',
    connected: 'Connected !'
  },
  searchPage: {
    screenTitle: 'Search'
  },
  orderPage: {
    screenTitle: 'Orders',
    mainTitle: 'YOUR ORDERS',
    oldOrdersTitle: 'Old orders',
    detailsTitle: 'Order details',
    orderNumber: 'Order number #{{number}}',
    orderAddress: 'Delivery address :',
    menuTitle: 'MENUS',
    foodTitle: 'FOODS',
    snackTitle: 'SNACKS',
    drinkTitle: 'DRINKS',
    see: 'See',
    total: 'Total',
    totalPrice: '{{totalPrice}}€',
    itemMenu: '1 x {{itemType}}',
    itemCustom: '{{quantity}} x {{productName}}',
    orderDate: 'Ordered on {{date}}'
  },
  accountPage: {
    screenTitle: 'Account',
    firstName: 'First Name',
    lastName: 'Name',
    address: 'Home address',
    email: 'E-mail address',
    password: 'Password',
    firstNamePlaceholder: 'Enter your first name',
    lastNamePlaceholder: 'Enter your last name',
    addressPlaceholder: 'Enter your postal address',
    personalInfoTitle: 'MY PERSONAL INFORMATION',
    connectionInfoTitle: 'MY CONNECTION INFORMATION',
    edit: 'Edit',
    logout: 'Logout',
    dialogLogoutContent: 'Are you sure you want to log out?',
    passwordEditScreenTitle: 'Edit your password',
    currentPassword: 'Current password',
    newPassword: 'New password',
    confirmNewPassword: 'Confirm new password',
    error1: 'Fields cannot be empty',
    error2: 'Passwords do not match',
    error3: 'New password requires at least 8 characters',
    error4: 'Old password incorrect'
  },
  categories: {
    burger: 'Burger',
    tacos: 'Tacos',
    pizza: 'Pizzas',
    sandwich: 'Sandwich'
  },
  button: {
    back: 'Back',
    cancel: 'Cancel',
    save: 'Save',
    logout: 'Log out'
  },
  camera: {
    needCameraPermissions:
      'Good Food does not have access to your camera. To enable access, access settings and then enable camera in permissions.',
    needPhotosPermissionsAndroid:
      'Good Food does not have access to your photos and videos. To enable access, tap Settings and enable photos in permissions.',
    needCameraPermissionsAndroid:
      'Good Food does not have access to your camera. To enable access, tap Access Settings and then enable camera in permissions.',
    goToSettings: 'Go to settings'
  }
};
