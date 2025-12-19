Feature: Authentification
    En tant qu'administrateur, je veux me connecter de manière sécurisée.

    Background:
        Given je suis sur la page de connexion

    Scenario Outline: Tentatives de connexion échouées (<titre>)
        When je me connecte avec l'email "<email>" et le mot de passe "<password>"
        Then je vois le message d'erreur "<message>"

        Examples:
            | titre                       | email                  | password                | message                                             |
            | Format Email Incorrect      | wjnrhihwrp             | superadmin@krihani@2024 | Désolé, il semble qu'il y ait des erreurs détectées |
            | Email Non Valide (Logique)  | nabil@gmail.com        | superadmin@krihani@2024 | Le email sélectionné n'est pas valide               |
            | Email Vide                  |                        | superadmin@krihani@2024 | Désolé, il semble qu'il y ait des erreurs détectées |
            | Mauvais Mot de Passe        | superadmin@krihani.com | FauxMotDePasse          | auth.failed                                         |
            | Mot de Passe Vide           | superadmin@krihani.com |                         | Le champ password est obligatoire                   |
    @ignore
    Scenario: Reproduction du Bug CSRF (Double Soumission)
        When je me connecte avec l'email "superadmin@krihani.com" et le mot de passe "superadmin@krihani@2024"
        Then je vois le message de succès "Vous vous êtes connecté avec succès !"
        When je clique sur l'icone de succès pour interagir
        And je force un nouveau clic sur le bouton S'identifier
        Then je vois le message d'erreur "CSRF token mismatch"