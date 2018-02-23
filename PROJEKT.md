### Taggar
Typer: Kod, Demo, Deployed, 'GitHub Pages'
Etiketter: JavaScript, CSS, React, 'HTML5 Canvas', Material-UI, 'Eslint AirBnb/React', JSX

# Game of Life
Detta är ett projekt med målet att testa användningen av HTML5-canvas tillsammans med React. Jag tittar närmare på hur man ritar direkt på canvasen, responsive layout och hur detta implementeras tillsammans med React. Det är en typisk "single page app" skapad med Create-react-app. Knappar och formelement använder Material-UI, kanske lite overkill men varför inte. En demosida av programmet ligger på GitHub Pages, en passande gratistjänst för hosting av statiska webbappar. Projektet har byggts med favoriteditorn VS Code med Eslint AirBnb/React som stilmall.

Bild: .PPT struktur

## Steg 1 - Boilerplate med Create-react-app
Till att börja med behöver vi generera en ren appstruktur med Create-react-app. 

`create-react-app game-of-life`

## Steg 2 - Konfigurera Eslint
För att få "lintningen" att fungera i VS Code behöver jag lägga till några npm-moduler. 

`npm i --save-dev eslint-config-airbnb eslint-plugin-jsx-a11y eslint-plugin-react`

Lägg till följande i `.eslintrc`

```
{
  "extends": ["airbnb", "plugin:react/recommended"],
  "env": {
    "es6": true,
    "browser": true
  },
  "plugins": ["react"],
  "rules": {
    "react/forbid-prop-types": 0
  }
}
```