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
För att få "lintningen" att fungera i VS Code behöver jag lägga till några npm-moduler och en konfigurationsfil. 

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

## Steg 3 - Använd komponenter fråm Material-UI
Till knapplisten och select-komponenten för att välja antal celler används Material-UI.

`npm i material-ui@next material-ui-icons@next`

BILD: knapplist, form

## Steg 4 - Bygg Game-of-life-komponenten
Grundkomponenten är `controller.jsx` och innehåller komponenter för knappar, inställningar och en grid som ritas direkt på en HTML5-canvas.

```javascript
render() {
  return (
      <GolButtons />
      <GolGrid {...this.state} />
      <GolSettings />
  );
```

I `grid.jsx` används HTML5-canvas för att rita upp cellerna. Funktionen `drawGrid` ritar upp en grid och `drawPopulation` fyller respektive tömmer celler beroende på deras status.

Av prestandaskäl ser vi till att endast uppdatera celler som har ändrats, se `componentDidUpdate`.

```javascript
// Set all unchanged cells to -1. drawPopulation only draws cells with a value of 0 or 1.
const gridDiff = grid.map((val, i) => ((val === prevProps.grid[i]) ? -1 : val));
```

Eftersom Canvas inte är "responsive" sätter vi bredden på canvas i `componentWillMount`.

```javascript
componentWillMount() {
  const width =
    window.innerWidth > 610 ? 601 : window.innerWidth - ((window.innerWidth - 10) % 50) - 9;
  this.setState({ height: width, width });
}
```
## Steg 5 - Bygg och hosta programmer på GitHub Pages
Med hjälp av modulen `gh-pages` kan vi enkelt ladda upp det byggda programmet till GitHUb Pages.

`npm i gh-pages`

Lägg till följande i `package.json`.

```bash
"homepage": "https://ropaolle.github.io/game-of-life",
"main": "index.js",
"scripts": {
  "deploy": "npm run build && gh-pages -d build"
}
```

`npm run deploy`
