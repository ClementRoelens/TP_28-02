# IMPORTANT

Créer un fichier canvasjs.react.d.ts dans le module @canvasjs/react-charts
Il faut tester mais ça supprime au moins l'erreur pour le moment

```js
import * as React from 'react';

declare module '@canvasjs/react-charts' {
  export interface Options {
    // Définissez ici la structure des options du graphique, en fonction de vos besoins
    // Consultez la documentation de CanvasJS pour voir toutes les options possibles
  }

  export interface ContainerProps {
    width?: string;
    position?: string;
    height?: string;
    // Autres propriétés nécessaires
  }

  export class CanvasJSChart extends React.Component<{
    id?: string;
    options?: Options;
    containerProps?: ContainerProps;
    onRef?: (chart: any) => void;
  }> {}

  export const CanvasJS: any;
}
```



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
