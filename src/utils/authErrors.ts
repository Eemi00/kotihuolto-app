// Custom error messaget käyttäjä ystävällisempää sovvelusta varten.
// Esimerkiksi kun tulee auth/invalid-email error se näyttää custom messagen eikä "Error: auth/invalid-email"
export const getAuthErrorMessage = (code: string): string => {
    switch (code) {
        case "auth/invalid-email":
            return "Sähköpostiosoite ei ole kelvollinen."
        case "auth/invalid-credential":
            return "Salasana oli virheellinen. Yritä uudelleen."
        case "auth/user-not-found":
            return "Käyttäjää ei löytynyt. Tarkista sähköpostiosoite."
        case "auth/wrong-password":
            return "Väärä salasana. Yritä uudelleen."
        case "auth/missing-password":
            return "Täytä salasana."
        case "auth/email-already-in-use":
            return "Sähköpostiosoite on jo käytössä."
        case "auth/weak-password":
            return "Salasanan tulee olla vähintään 6 merkkiä pitkä."
        case "auth/missing-email":
            return "Sähköpostiosoite puuttuu."
        case "auth/requires-recent-login":
            return "Kirjaudu sisään uudelleen ennen kuin vaihdat sähköpostin."
        case "auth/operation-not-allowed":
            return "Muista vahvistaa sähköpostisi ennen sen vaihtoa."
        default:
            return "Tuntematon virhe. Yritä uudelleen."
    }
}