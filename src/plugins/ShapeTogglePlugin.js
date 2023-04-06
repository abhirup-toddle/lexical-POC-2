/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {$wrapNodeInElement} from '@lexical/utils';
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  LexicalCommand,
  LexicalEditor,
} from 'lexical';
import {useEffect, useState} from 'react';
import * as React from 'react';

import {
  $createShapeToggleNode,
  ShapeToggleNode,
} from '../nodes/ShapeToggleNode';

export const INSERT_SHAPE_TOGGLE_COMMAND =
  createCommand('INSERT_SHAPE_TOGGLE_COMMAND');

export default function ShapeTogglePlugin() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (!editor.hasNodes([ShapeToggleNode])) {
      throw new Error('ShapeTogglePlugin: ShapeToggleNode not registered on editor');
    }

    return editor.registerCommand(
      INSERT_SHAPE_TOGGLE_COMMAND,
      (payload) => {
        const shapeToggleNode = $createShapeToggleNode(payload);
        $insertNodes([shapeToggleNode]);
        if ($isRootOrShadowRoot(shapeToggleNode.getParentOrThrow())) {
          $wrapNodeInElement(shapeToggleNode, $createParagraphNode).selectEnd();
        }
        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);
  return null;
}
