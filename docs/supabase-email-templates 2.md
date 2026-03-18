# Templates Email Supabase pour Nuxy

Ces templates sont à copier dans le dashboard Supabase :
https://supabase.com/dashboard/project/qsayrwlksinxvuugwhtv/auth/templates

## Style commun (CSS)

Tous les templates utilisent le même style inline pour une compatibilité maximale avec les clients email.

---

## 1. Confirm Signup (Confirmation d'inscription)

**Subject** : Confirme ton inscription sur Nuxy

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; background-color: #f8fafc; margin: 0; padding: 20px;">
  <div style="max-width: 500px; margin: 0 auto; background-color: white; border-radius: 12px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <div style="text-align: center; margin-bottom: 24px;">
      <img src="https://nuxy.ch/images/nuxy-logo.png" alt="Nuxy" width="80" height="80" style="width: 80px; height: 80px;">
    </div>
    <h1 style="color: #60B155; font-size: 24px; font-weight: bold; text-align: center; margin: 0 0 8px;">Nuxy</h1>
    <h2 style="color: #0f172a; font-size: 18px; text-align: center; margin: 0 0 24px; font-weight: 600;">Confirme ton inscription</h2>
    <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
      Hey ! Bienvenue sur Nuxy, la plateforme pour apprendre JavaScript en codant.
    </p>
    <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
      Clique sur le bouton ci-dessous pour activer ton compte :
    </p>
    <a href="{{ .ConfirmationURL }}" style="display: block; width: 100%; padding: 14px 24px; background-color: #60B155; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; text-align: center; box-sizing: border-box;">Activer mon compte</a>
    <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 14px; text-align: center;">
      <p style="margin: 0 0 8px;">Si tu n'as pas créé de compte sur Nuxy, ignore cet email.</p>
      <p style="margin: 0;">© Nuxy - Plateforme d'apprentissage JavaScript</p>
    </div>
  </div>
</body>
</html>
```

---

## 2. Magic Link (Lien magique)

**Subject** : Ton lien de connexion Nuxy

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; background-color: #f8fafc; margin: 0; padding: 20px;">
  <div style="max-width: 500px; margin: 0 auto; background-color: white; border-radius: 12px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <div style="text-align: center; margin-bottom: 24px;">
      <img src="https://nuxy.ch/images/nuxy-logo.png" alt="Nuxy" width="80" height="80" style="width: 80px; height: 80px;">
    </div>
    <h1 style="color: #60B155; font-size: 24px; font-weight: bold; text-align: center; margin: 0 0 8px;">Nuxy</h1>
    <h2 style="color: #0f172a; font-size: 18px; text-align: center; margin: 0 0 24px; font-weight: 600;">Connecte-toi à Nuxy</h2>
    <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
      Hey ! Tu as demandé un lien magique pour te connecter.
    </p>
    <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
      Clique sur le bouton ci-dessous pour accéder à ton compte :
    </p>
    <a href="{{ .ConfirmationURL }}" style="display: block; width: 100%; padding: 14px 24px; background-color: #60B155; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; text-align: center; box-sizing: border-box;">Me connecter</a>
    <p style="color: #94a3b8; font-size: 14px; text-align: center; margin-top: 16px;">
      Ce lien expire dans 1 heure.
    </p>
    <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 14px; text-align: center;">
      <p style="margin: 0 0 8px;">Si tu n'as pas demandé ce lien, ignore cet email.</p>
      <p style="margin: 0;">© Nuxy - Plateforme d'apprentissage JavaScript</p>
    </div>
  </div>
</body>
</html>
```

---

## 3. Reset Password (Réinitialisation du mot de passe)

**Subject** : Réinitialise ton mot de passe Nuxy

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; background-color: #f8fafc; margin: 0; padding: 20px;">
  <div style="max-width: 500px; margin: 0 auto; background-color: white; border-radius: 12px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <div style="text-align: center; margin-bottom: 24px;">
      <img src="https://nuxy.ch/images/nuxy-logo.png" alt="Nuxy" width="80" height="80" style="width: 80px; height: 80px;">
    </div>
    <h1 style="color: #60B155; font-size: 24px; font-weight: bold; text-align: center; margin: 0 0 8px;">Nuxy</h1>
    <h2 style="color: #0f172a; font-size: 18px; text-align: center; margin: 0 0 24px; font-weight: 600;">Réinitialise ton mot de passe</h2>
    <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
      Tu as demandé à réinitialiser ton mot de passe.
    </p>
    <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
      Clique sur le bouton ci-dessous pour choisir un nouveau mot de passe :
    </p>
    <a href="{{ .ConfirmationURL }}" style="display: block; width: 100%; padding: 14px 24px; background-color: #60B155; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; text-align: center; box-sizing: border-box;">Réinitialiser mon mot de passe</a>
    <p style="color: #94a3b8; font-size: 14px; text-align: center; margin-top: 16px;">
      Ce lien expire dans 1 heure.
    </p>
    <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 14px; text-align: center;">
      <p style="margin: 0 0 8px;">Si tu n'as pas fait cette demande, ignore cet email. Ton mot de passe restera inchangé.</p>
      <p style="margin: 0;">© Nuxy - Plateforme d'apprentissage JavaScript</p>
    </div>
  </div>
</body>
</html>
```

---

## 4. Change Email Address (Changement d'adresse email)

**Subject** : Confirme ta nouvelle adresse email

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; background-color: #f8fafc; margin: 0; padding: 20px;">
  <div style="max-width: 500px; margin: 0 auto; background-color: white; border-radius: 12px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <div style="text-align: center; margin-bottom: 24px;">
      <img src="https://nuxy.ch/images/nuxy-logo.png" alt="Nuxy" width="80" height="80" style="width: 80px; height: 80px;">
    </div>
    <h1 style="color: #60B155; font-size: 24px; font-weight: bold; text-align: center; margin: 0 0 8px;">Nuxy</h1>
    <h2 style="color: #0f172a; font-size: 18px; text-align: center; margin: 0 0 24px; font-weight: 600;">Confirme ta nouvelle adresse</h2>
    <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
      Tu as demandé à changer l'adresse email de ton compte Nuxy.
    </p>
    <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
      Clique sur le bouton ci-dessous pour confirmer cette nouvelle adresse :
    </p>
    <a href="{{ .ConfirmationURL }}" style="display: block; width: 100%; padding: 14px 24px; background-color: #60B155; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; text-align: center; box-sizing: border-box;">Confirmer mon email</a>
    <p style="color: #94a3b8; font-size: 14px; text-align: center; margin-top: 16px;">
      Ce lien expire dans 1 heure.
    </p>
    <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 14px; text-align: center;">
      <p style="margin: 0 0 8px;">Si tu n'as pas fait cette demande, ignore cet email.</p>
      <p style="margin: 0;">© Nuxy - Plateforme d'apprentissage JavaScript</p>
    </div>
  </div>
</body>
</html>
```

---

## 5. Invite User (Invitation par un enseignant)

**Subject** : Tu es invité à rejoindre Nuxy !

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; background-color: #f8fafc; margin: 0; padding: 20px;">
  <div style="max-width: 500px; margin: 0 auto; background-color: white; border-radius: 12px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <div style="text-align: center; margin-bottom: 24px;">
      <img src="https://nuxy.ch/images/nuxy-logo.png" alt="Nuxy" width="80" height="80" style="width: 80px; height: 80px;">
    </div>
    <h1 style="color: #60B155; font-size: 24px; font-weight: bold; text-align: center; margin: 0 0 8px;">Nuxy</h1>
    <h2 style="color: #0f172a; font-size: 18px; text-align: center; margin: 0 0 24px; font-weight: 600;">Tu es invité !</h2>
    <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
      Hey ! Tu as été invité à rejoindre Nuxy, la plateforme pour apprendre JavaScript en codant.
    </p>
    <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
      Clique sur le bouton ci-dessous pour créer ton compte et commencer à coder :
    </p>
    <a href="{{ .ConfirmationURL }}" style="display: block; width: 100%; padding: 14px 24px; background-color: #60B155; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; text-align: center; box-sizing: border-box;">Accepter l'invitation</a>
    <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 14px; text-align: center;">
      <p style="margin: 0 0 8px;">Si tu ne connais pas l'expéditeur, ignore cet email.</p>
      <p style="margin: 0;">© Nuxy - Plateforme d'apprentissage JavaScript</p>
    </div>
  </div>
</body>
</html>
```

---

## Configuration URL Supabase

Dans **Authentication > URL Configuration** :

| Paramètre | Valeur |
|-----------|--------|
| Site URL | `https://nuxy.ch` |
| Redirect URLs | `https://nuxy.ch/**` |

---

## Notes

- Les templates utilisent des styles inline pour une compatibilité maximale
- Le logo est en PNG (200x200) : `https://nuxy.ch/images/nuxy-logo.png`
- Tous les textes utilisent le tutoiement (ton Duolingo)
- Les couleurs utilisent la palette Nuxy (#60B155 vert, #0f172a texte, #f8fafc fond)
