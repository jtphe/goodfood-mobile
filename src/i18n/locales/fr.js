export default {
  comments: {
    added: 'Commentaire ajouté !',
    deleted: 'Commentaire supprimé !'
  },
  restaurant: {
    details: 'Détails',
    detailsTitle: 'Détails du restaurant',
    findRestaurants: 'Trouver un restaurant',
    comments: 'Avis',
    emptyComments: "Pas encore d'avis",
    added: 'Le restaurant a été ajouté en favoris',
    removed: 'Le restaurant favoris a été supprimé',
    addComment: 'Ajouter un avis',
    addCommentPlaceholder: 'Écrivez un commentaire...',
    addRating: 'Noter le restaurant',
    list: 'Liste des restaurants',
    noRestaurant:
      "Vous n'avez pas de restaurant encore ! Choisissez un restaurant parmis les suivants",
    restaurantChoice: 'Choix du restaurant'
  },
  search: {
    title: 'NOTRE CARTE',
    subtitle:
      'Aucune excuse, faites vous plaisir : il y en a pour tous les goûts !',
    noAddress:
      'Veuillez ajouter un restaurant favoris dans les paramètres de votre compte'
  },
  home: {
    screenTitle: 'Accueil',
    btnDelivery: 'Livraison',
    btnTakeaway: 'À emporter',
    placeholderSearchFood: 'Rechercher votre nourriture...',
    peckishTitle: 'Une petite faim ? 🍔',
    favoriteRestaurant: 'Mon resto favoris',
    noProductFound: 'Aucun produit correspondant à votre recherche...',
    productDetails: "Détail d'un produit"
  },
  login: {
    screenTitle: 'Connexion',
    welcome: 'Bienvenue sur Good Food !',
    email: 'Adresse email',
    password: 'Mot de passe',
    connection: 'Connexion',
    noAccount: "Vous n'avez pas encore de compte ?",
    register: "S'inscrire !"
  },
  register: {
    screenTitle: 'Inscription',
    email: 'Adresse email',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    createAccount: 'Créer votre compte',
    success: 'Votre compte a bien été créé'
  },
  error: {
    emailIncorrect: "L'adresse e-mail est invalide",
    passwordTooShort:
      'Le mot de passer doit faire au minimum 8 caractères, dont 1 lettre majuscule, 1 lettre minuscule, 1 caractère spécial et un chiffre',
    emailAndPasswordIncorrect: 'Vérifiez vos identifiants',
    passwordNotTheSame: 'Les mots de passe ne correspondent pas',
    accountAlreadyExists: 'Ce compte existe déjà',
    default: 'Une erreur est apparue',
    postalCodeNotNumber: 'Le code postal doit être des chiffres'
  },
  connection: {
    disconnected: 'Recherche de connexion en cours...',
    connected: 'Connecté !'
  },
  searchPage: {
    screenTitle: 'Parcourir'
  },
  orderPage: {
    screenTitle: 'Commandes',
    mainTitle: 'VOS COMMANDES',
    oldOrdersTitle: 'Anciennes commandes',
    detailsTitle: 'Détails de la commande',
    orderNumber: 'Commande #{{number}}',
    orderAddress: 'Adresse de la livraison: ',
    menuTitle: 'MENUS',
    foodTitle: 'PLATS',
    snackTitle: 'SNACKS',
    drinkTitle: 'BOISSONS',
    see: 'Voir',
    total: 'Total',
    totalPrice: '{{totalPrice}}€',
    itemMenu: '1 x {{itemType}}',
    itemCustom: '{{quantity}} x {{productName}}',
    orderDate: 'Commande passé le {{date}}',
    orderProcessTitle: 'Process commande',
    orderStep: 'ÉTAPE {{step}}',
    finalStep: 'ÉTAPE FINALE',
    stepOne: 'Choisissez votre type de plat !',
    chooseFoodType: 'Choisissez {{foodType}}',
    chooseSnack: 'Choisissez un accompagnement',
    chooseDrink: 'Choisissez une boisson',
    recap: 'Récapitulatif de votre commande',
    orderBurger: 'un burger',
    orderTacos: 'un tacos',
    orderPizza: 'une pizza',
    orderSandwich: 'un sandwich',
    orderSnacks: 'un snack',
    orderDrink: 'une boisson',
    addToCart: 'Ajouter au panier',
    orderProcessProductTitle: 'Process commande produit',
    quantityPrice: 'Prix: {{totalPrice}}€',
    yourCart: 'Votre panier',
    displayCart: 'Afficher le panier',
    subTotal: 'Sous-total',
    validateOrder: 'Valider la commande',
    payOrder: 'Payer',
    summary: 'RÉCAPITULATIF',
    homeDelivery: 'Livraison à domicile',
    addDeliveryAddress: '+ Ajouter une adresse de livraison',
    paymentMethod: 'Moyen de paiement',
    addPaymentMethod: '+ Ajouter un moyen de paiement',
    deliveryAddress: 'Adresse de livraison',
    missingDeliveryAddress: 'Ajouter une adresse de domicile pour la livraison',
    creditCard: 'Carte de crédit',
    addCreditCard: 'Ajouter une carte bancaire',
    cardName: 'Nom de la carte',
    cardType: 'Type de la carte',
    cardNumber: 'Numéro de la carte',
    cardExpiration: 'Exp.date(MM/AA)',
    cardCVV: 'CVV',
    orderPlaced: 'VOTRE COMMANDE A BIEN ÉTÉ PASSÉE !',
    errorOrderPlaced: 'UNE ERREUR EST APPARUE... VEUILLEZ RÉESSAYEZ',
    noOrderLoaded: "Vous n'avez pas encore passé de commande...",
    status: {
      status: 'Statut: ',
      preparation: 'Préparation',
      delivering: 'En cours de livraison',
      delivered: 'Livrée'
    }
  },
  accountPage: {
    screenTitle: 'Compte',
    firstName: 'Prénom',
    lastName: 'Nom',
    address: 'Adresse du domicile',
    postalCode: 'Code postal',
    city: 'Ville',
    email: 'Adresse e-mail',
    password: 'Mot de passe',
    firstNamePlaceholder: 'Entrez votre prénom',
    lastNamePlaceholder: 'Entrez votre nom',
    addressPlaceholder: 'Entrez votre adresse postale',
    postalCodePlaceholder: 'Entrez votre code postale',
    cityPlaceholder: 'Entrez votre ville',
    personalInfoTitle: 'MES INFORMATIONS PERSONNELLES',
    connectionInfoTitle: 'MES INFORMATIONS DE CONNEXION',
    favoriteRestaurant: 'MON RESTAURANT FAVORIS',
    updateFavoriteRestaurant: 'Modifier mon restaurant favoris',
    edit: 'Éditer',
    logout: 'Déconnexion',
    dialogLogoutContent: 'Tu es sûr(e) de vouloir te déconnecter ?',
    passwordEditScreenTitle: 'Éditer votre mot de passe',
    currentPassword: 'Mot de passe actuel',
    newPassword: 'Nouveau mot de passe',
    confirmNewPassword: 'Confirmer le nouveau mot de passe',
    error1: 'Les champs de textes ne peuvent être vide',
    error2: 'Les nouveaux mots de passe ne correspondent pas',
    error3: 'Le nouveau mot de passe doit contenir au moins 8 caractères',
    error4: "L'ancien mot de passe est incorrect",
    userUpdated: 'Utilisateur mis à jour !'
  },
  categories: {
    burger: 'Burger',
    tacos: 'Tacos',
    pizza: 'Pizzas',
    sandwich: 'Sandwich',
    menu: 'Menu',
    snacks: 'Snacks',
    drink: 'Boissons'
  },
  button: {
    back: 'Retour',
    cancel: 'Annuler',
    save: 'Enregistrer',
    logout: 'Déconnexion',
    order: 'Commander',
    add: 'Ajouter',
    choose: 'Choisir'
  },
  camera: {
    needCameraPermissions:
      "Good Food n'a pas accès à votre appareil photo. Pour activer l'accès, accéder aux paramètres puis activez l'appareil photo dans les autorisations",
    needPhotosPermissionsAndroid:
      "Good Food n'a pas accès à vos photos et vidéos. Pour activer l'accès, appuyez sur Paramètres et activez les photos dans les permissions",
    needCameraPermissionsAndroid:
      "Good Food n'a pas accès à votre appareil photo. Pour activer l'accès, appuyez sur Accéder aux paramètres puis activez l'appareil photo dans les autorisations",
    goToSettings: 'Accéder aux paramètres'
  }
};
