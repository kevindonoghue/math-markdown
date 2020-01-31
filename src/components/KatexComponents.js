import React from 'react';
import TeX from '@matejmazur/react-katex';

// LaTeX macros go here
const LATEX_MACROS = {
  "\\bpm": "\\begin{pmatrix}",
  "\\epm": "\\end{pmatrix}",
  "\\bbR": "\\mathbb{R}",
  "\\baug": "\\begin{pmatrix}\\begin{array}",
  "\\eaug": "\\end{array}\\end{pmatrix}",
  "\\to": "\\rightarrow",
}
function $(props) {
  // return <TeX settings={{ macros: LATEX_MACROS }} { ...props } >{String.raw({raw: props.children})}</TeX>
  return <TeX settings={{ macros: LATEX_MACROS }} { ...props } />
}

function $$(props) {
  // return <TeX settings={{ macros: LATEX_MACROS }} { ...props } block >{String.raw({raw: props.children})}</TeX>
  return <TeX settings={{ macros: LATEX_MACROS }} { ...props } block />
}

export { $, $$ };