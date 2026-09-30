// ESLint 9 (Flat Config). eslint-config-next 15 liefert seine Regeln noch im
// alten Format, daher FlatCompat.
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

const config = [
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts', 'docs/**', 'public/**'] },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['next.config.js', 'postcss.config.js'],
    rules: { '@typescript-eslint/no-require-imports': 'off' }
  }
];

export default config;
