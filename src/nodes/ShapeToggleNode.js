/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  DecoratorNode,
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from 'lexical';
import * as React from 'react';
import {Suspense} from 'react';

const ShapeToggle = React.lazy(
  () => import('./ShapeToggleComponent'),
);

export class ShapeToggleNode extends DecoratorNode {
  __shape;

  static getType() {
    return 'print-shape';
  }

  static clone(node) {
    return new ShapeToggleNode(node.__shape, node.__key);
  }

  constructor(shape, key) {
    super(key);
    this.__shape = shape;
  }

  //TO DO: implement
  // exportJSON(): SerializedLexicalNode {}

  //TO DO: implement
  // exportDOM(editor: LexicalEditor): DOMExportOutput {}

  createDOM() {
    const elem = document.createElement('span');
    elem.style.display = 'inline-block';
    return elem;
  }

  updateDOM() {
    return false;
  }

  decorate() {
    return (
      <Suspense fallback={null}>
        <ShapeToggle />
      </Suspense>
    );
  }
}

export function $createShapeToggleNode(shape) {
  return new ShapeToggleNode(shape);
}

export function $isShapeToggleNode(node){
  return node instanceof ShapeToggleNode;
}
