import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        adminClient()
    ]
})

type ErrorTypes = Partial<
    Record<
        keyof typeof authClient.$ERROR_CODES,
        {
            en: {
                title: string
                description: string
            }
            fr: {
                title: string
                description: string
            }
        }
    >
>;

const errorCodes = {
    USER_ALREADY_EXISTS: {
        en: {
            title: "Account Already Exists",
            description: "An account with this email address already exists. Please sign in instead."
        },
        fr: {
            title: "Compte Déjà Existant",
            description: "Un compte avec cette adresse email existe déjà. Veuillez vous connecter."
        },
    },
    USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: {
        en: {
            title: "Email Already Registered",
            description: "This email is already in use. Please use a different email address or sign in to your existing account."
        },
        fr: {
            title: "Email Déjà Enregistré",
            description: "Cet email est déjà utilisé. Veuillez utiliser une autre adresse email ou vous connecter à votre compte existant."
        },
    },
    INVALID_EMAIL_OR_PASSWORD: {
        en: {
            title: "Incorrect Credentials",
            description: "The email or password you entered is incorrect. Please try again."
        },
        fr: {
            title: "Identifiants Incorrects",
            description: "L'email ou le mot de passe saisi est incorrect. Veuillez réessayer."
        },
    },
    USER_NOT_FOUND: {
        en: {
            title: "Account Not Found",
            description: "We couldn't find an account with this email. Please check your email or sign up."
        },
        fr: {
            title: "Compte Introuvable",
            description: "Nous n'avons pas trouvé de compte avec cet email. Veuillez vérifier votre email ou vous inscrire."
        },
    },
    EMAIL_NOT_VERIFIED: {
        en: {
            title: "Email Verification Required",
            description: "Please verify your email address before signing in. Check your inbox for the verification link."
        },
        fr: {
            title: "Vérification Email Requise",
            description: "Veuillez vérifier votre adresse email avant de vous connecter. Consultez votre boîte de réception."
        },
    },
    INVALID_EMAIL: {
        en: {
            title: "Invalid Email Address",
            description: "Please enter a valid email address (e.g., name@example.com)."
        },
        fr: {
            title: "Adresse Email Invalide",
            description: "Veuillez saisir une adresse email valide (ex: nom@exemple.com)."
        },
    },
    INVALID_PASSWORD: {
        en: {
            title: "Invalid Password",
            description: "Your password doesn't meet the requirements. Please choose a stronger password."
        },
        fr: {
            title: "Mot de Passe Invalide",
            description: "Votre mot de passe ne respecte pas les exigences. Veuillez choisir un mot de passe plus fort."
        },
    },
    PASSWORD_TOO_SHORT: {
        en: {
            title: "Password Too Short",
            description: "Your password must be at least 8 characters long. Please choose a longer password."
        },
        fr: {
            title: "Mot de Passe Trop Court",
            description: "Votre mot de passe doit contenir au moins 8 caractères. Veuillez choisir un mot de passe plus long."
        },
    },
    PASSWORD_TOO_LONG: {
        en: {
            title: "Password Too Long",
            description: "Your password is too long. Please choose a password with fewer characters."
        },
        fr: {
            title: "Mot de Passe Trop Long",
            description: "Votre mot de passe est trop long. Veuillez choisir un mot de passe plus court."
        },
    },
    SESSION_EXPIRED: {
        en: {
            title: "Session Expired",
            description: "For your security, your session has expired. Please sign in again to continue."
        },
        fr: {
            title: "Session Expirée",
            description: "Pour votre sécurité, votre session a expiré. Veuillez vous reconnecter pour continuer."
        },
    },
    FAILED_TO_CREATE_USER: {
        en: {
            title: "Registration Failed",
            description: "We couldn't create your account at this time. Please try again or contact support if the problem persists."
        },
        fr: {
            title: "Échec de l'Inscription",
            description: "Nous n'avons pas pu créer votre compte. Veuillez réessayer ou contacter le support si le problème persiste."
        },
    },
    FAILED_TO_CREATE_SESSION: {
        en: {
            title: "Connection Failed",
            description: "We couldn't establish your session. Please try signing in again."
        },
        fr: {
            title: "Échec de Connexion",
            description: "Nous n'avons pas pu établir votre session. Veuillez réessayer de vous connecter."
        },
    },
    FAILED_TO_UPDATE_USER: {
        en: {
            title: "Update Failed",
            description: "We couldn't save your changes. Please try again later."
        },
        fr: {
            title: "Échec de Mise à Jour",
            description: "Nous n'avons pas pu enregistrer vos modifications. Veuillez réessayer plus tard."
        },
    },
    FAILED_TO_GET_SESSION: {
        en: {
            title: "Session Error",
            description: "We couldn't retrieve your session information. Please sign in again."
        },
        fr: {
            title: "Erreur de Session",
            description: "Nous n'avons pas pu récupérer vos informations de session. Veuillez vous reconnecter."
        },
    },
    INVALID_TOKEN: {
        en: {
            title: "Invalid or Expired Link",
            description: "This verification link is invalid or has expired. Please request a new one."
        },
        fr: {
            title: "Lien Invalide ou Expiré",
            description: "Ce lien de vérification est invalide ou a expiré. Veuillez en demander un nouveau."
        },
    },
    SOCIAL_ACCOUNT_ALREADY_LINKED: {
        en: {
            title: "Account Already Connected",
            description: "This social account is already linked to another user. Please use a different account."
        },
        fr: {
            title: "Compte Déjà Connecté",
            description: "Ce compte social est déjà lié à un autre utilisateur. Veuillez utiliser un autre compte."
        },
    },
    PROVIDER_NOT_FOUND: {
        en: {
            title: "Authentication Provider Unavailable",
            description: "The selected sign-in method is currently unavailable. Please try another option."
        },
        fr: {
            title: "Fournisseur d'Authentification Indisponible",
            description: "La méthode de connexion sélectionnée est actuellement indisponible. Veuillez essayer une autre option."
        },
    },
    ID_TOKEN_NOT_SUPPORTED: {
        en: {
            title: "Authentication Method Not Supported",
            description: "This authentication method is not supported. Please use email and password or another provider."
        },
        fr: {
            title: "Méthode d'Authentification Non Supportée",
            description: "Cette méthode d'authentification n'est pas supportée. Veuillez utiliser l'email et le mot de passe ou un autre fournisseur."
        },
    },
    FAILED_TO_GET_USER_INFO: {
        en: {
            title: "Profile Retrieval Failed",
            description: "We couldn't retrieve your profile information from the provider. Please try again."
        },
        fr: {
            title: "Échec de Récupération du Profil",
            description: "Nous n'avons pas pu récupérer vos informations de profil du fournisseur. Veuillez réessayer."
        },
    },
    USER_EMAIL_NOT_FOUND: {
        en: {
            title: "Email Not Found",
            description: "We couldn't find an email address associated with this account. Please contact support."
        },
        fr: {
            title: "Email Introuvable",
            description: "Nous n'avons pas trouvé d'adresse email associée à ce compte. Veuillez contacter le support."
        },
    },
    EMAIL_CAN_NOT_BE_UPDATED: {
        en: {
            title: "Email Update Not Allowed",
            description: "Your email address cannot be changed at this time. Please contact support for assistance."
        },
        fr: {
            title: "Modification d'Email Non Autorisée",
            description: "Votre adresse email ne peut pas être modifiée pour le moment. Veuillez contacter le support."
        },
    },
    CREDENTIAL_ACCOUNT_NOT_FOUND: {
        en: {
            title: "No Password Set",
            description: "No password is associated with this account. You may have signed up using a social provider."
        },
        fr: {
            title: "Aucun Mot de Passe Défini",
            description: "Aucun mot de passe n'est associé à ce compte. Vous vous êtes peut-être inscrit via un réseau social."
        },
    },
    FAILED_TO_UNLINK_LAST_ACCOUNT: {
        en: {
            title: "Cannot Remove Last Sign-In Method",
            description: "You must have at least one way to access your account. Add another sign-in method before removing this one."
        },
        fr: {
            title: "Impossible de Retirer la Dernière Méthode",
            description: "Vous devez avoir au moins une façon d'accéder à votre compte. Ajoutez une autre méthode avant de retirer celle-ci."
        },
    },
    ACCOUNT_NOT_FOUND: {
        en: {
            title: "Account Not Found",
            description: "We couldn't find the account you're looking for. It may have been removed or doesn't exist."
        },
        fr: {
            title: "Compte Introuvable",
            description: "Nous n'avons pas trouvé le compte que vous recherchez. Il a peut-être été supprimé ou n'existe pas."
        },
    },
    USER_ALREADY_HAS_PASSWORD: {
        en: {
            title: "Password Already Set",
            description: "This account already has a password. Please provide your current password to proceed."
        },
        fr: {
            title: "Mot de Passe Déjà Défini",
            description: "Ce compte a déjà un mot de passe. Veuillez fournir votre mot de passe actuel pour continuer."
        },
    },
} satisfies ErrorTypes;

export const getErrorMessage = (code: string, lang: "en" | "fr") => {
    if (code in errorCodes) {
        return errorCodes[code as keyof typeof errorCodes][lang];
    }
};

export const { signIn, signOut, signUp, useSession, getSession } = authClient
