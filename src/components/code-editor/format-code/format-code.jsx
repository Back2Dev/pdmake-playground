import React from 'react'
// import prettier from 'prettier'
import { ParserBabel } from 'prettier'

import prettier from "https://unpkg.com/prettier@2.7.1/esm/standalone.mjs";
import parserBabel from "https://unpkg.com/prettier@2.7.1/esm/parser-babel.mjs";


const FormatCode = () => {
  const options = {
    "arrowParens": "always",
    "parser": 'babel',
    "plugins": [parserBabel],
    "bracketSameLine": false,
    "bracketSpacing": true,
    "embeddedLanguageFormatting": "auto",
    "htmlWhitespaceSensitivity": "css",
    "insertPragma": false,
    "jsxSingleQuote": false,
    "printWidth": 80,
    "proseWrap": "preserve",
    "quoteProps": "as-needed",
    "requirePragma": false,
    "semi": true,
    "singleQuote": false,
    "tabWidth": 2,
    "trailingComma": "es5",
    "useTabs": false,
    "vueIndentScriptAndStyle": false
  }
  const handleClick = () => {
    try {
      console.log(prettier.formatWithCursor("var dd = {content: ['hello','world'] }", options));

    }
    catch (err) {
      console.error(err);
    }
  }
  return (
    <>
      <button onClick={handleClick}> Format Code</button>
    </>
  )
}

export default FormatCode