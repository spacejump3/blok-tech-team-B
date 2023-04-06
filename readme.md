# PawfectMatch 🐾
## Inhoudsopgave
* 💡Concept
* 👾Installatie
* 📝Licentie
* 🕸️Bronnen

## 💡Concept
Onze webapplicatie zorgt ervoor dat jij de perfecte dierenvriend kan vinden/uploaden!
Registreer, log in, beantwoordt vragen, comment, like, upload en vind een perfecte match voor jou! 

Wil je meer weten over onze applicatie en ons proces, lees dan onze [Wiki!](https://github.com/spacejump3/blok-tech-team-B/wiki)

## 👾Installatie 
Om onze applicatie lokaal te draaien kan je de volgende stappen volgen:

### Install Git
* Zorg dat **[Git](https://github.com/git-guides/install-git)** op jouw computer werkt.
* Je kan checken of git is geïnstalleerd door `git version` te typen in je terminal.

### Clone deze repository
* Gebruik `git clone https://github.com/spacejump3/blok-tech-team-B.git` in de terminal om onze code te clonen.

### Installeer NodeJS modules
* Installeer de benodigde NodeJS modules met **[npm](https://npmjs.com/)** door `npm install` in je terminal uit te voeren in de folder die je net gecloned hebt.

### Maak een .env bestand
* Maak in de root van de applicatie een .env bestand aan en vul daarin je database url in en een session token. Hieronder staat een template. De mongoDB url kan je vinden op door in mongo atlas op 'connect' te klikken en naar 'connect your application' te gaan. De session token is een soort wachtwoord, die kan je zelf bepalen.

```
MONGODB_URI= #voeg hier jouw mongoDB url in.
SESCODE= #voeg hier jouw session token in
```

### Start de app
* Start de applicatie door `npm start` uit te voeren in de terminal.

## 📝Licentie
Dit project is gelicenseerd onder een **[MIT](https://github.com/lucaoudejans/projecttech/blob/main/LICENSE)** License. Copyright © 2023 Luca Oudejans

## 🕸️Bronnen
* [School repository](https://github.com/cmda-bt)
* [My github](https://github.com/lucaoudejans/projecttech)
* [Download Git](https://github.com/git-guides/install-git)
* [Npm](https://npmjs.com/)
* [MIT license](https://github.com/lucaoudejans/projecttech/blob/main/LICENSE)
* [How to license a repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository)
