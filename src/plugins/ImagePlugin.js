import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $wrapNodeInElement, mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  $getSelection,
  $isRangeSelection
} from "lexical";
import { useEffect } from "react";

import { $createImageNode, ImageNode} from "../nodes/ImageNode";

export const INSERT_IMAGE_COMMAND = createCommand(
  "INSERT_IMAGE_COMMAND"
);

export const DRAG_DROP_PASTE = createCommand(
  'DRAG_DROP_PASTE_FILE',
);


import { PASTE_COMMAND } from "lexical";
import {$generateNodesFromSerializedNodes} from "@lexical/clipboard"
import {registerRichText} from "@lexical/rich-text"

// export function eventFiles(event){
//   let dataTransfer = null;
//   if (event instanceof DragEvent) {
//     dataTransfer = event.dataTransfer;
//   } else if (event instanceof ClipboardEvent) {
//     dataTransfer = event.clipboardData;
//   }

//   if (dataTransfer === null) {
//     return [false, [], false];
//   }

//   const types = dataTransfer.types;
//   const hasFiles = types.includes('Files');
//   const hasContent =
//     types.includes('text/html') || types.includes('text/plain');
//   return [hasFiles, Array.from(dataTransfer.files), hasContent];
// }

// function onPasteForRichText(event,editor){
//   event.preventDefault();
//   editor.update(
//     () => {
//       const selection = $getSelection();
//       const clipboardData =
//         event instanceof InputEvent || event instanceof KeyboardEvent
//           ? null
//           : event.clipboardData;
//       if (
//         clipboardData != null &&
//         ($isRangeSelection(selection) || DEPRECATED_$isGridSelection(selection))
//       ) {
//         $insertDataTransferForRichText(clipboardData, selection, editor);
//       }
//     },
//     {
//       tag: 'paste',
//     },
//   );
// }

// export function $generateNodesFromSerializedNodes(
//   serializedNodes
// ) {
//   const nodes = [];
//   for (let i = 0; i < serializedNodes.length; i++) {
//     const serializedNode = serializedNodes[i];
//     const node = $parseSerializedNode(serializedNode);
//     if ($isTextNode(node)) {
//       $addNodeStyle(node);
//     }
//     nodes.push(node);
//   }
//   return nodes;
// }


// export function $insertDataTransferForRichText(
//   dataTransfer,
//   selection,
//   editor
// ){
//   const lexicalString = dataTransfer.getData('application/x-lexical-editor');
//   if (lexicalString) {
//     try {
//       const payload = JSON.parse(lexicalString);
//       if (
//         payload.namespace === editor._config.namespace &&
//         Array.isArray(payload.nodes)
//       ) {
//         const nodes = $generateNodesFromSerializedNodes(payload.nodes);
//         return $insertGeneratedNodes(editor, nodes, selection);
//       }
//     } catch {
//       // Fail silently.
//     }
//   }

//   const htmlString = dataTransfer.getData('text/html');
//   if (htmlString) {
//     try {
//       const parser = new DOMParser();
//       const dom = parser.parseFromString(htmlString, 'text/html');
//       const nodes = $generateNodesFromDOM(editor, dom);
//       return $insertGeneratedNodes(editor, nodes, selection);
//     } catch {
//       // Fail silently.
//     }
//   }

//   // Multi-line plain text in rich text mode pasted as separate paragraphs
//   // instead of single paragraph with linebreaks.
//   const text = dataTransfer.getData('text/plain');
//   if (text != null) {
//     if ($isRangeSelection(selection)) {
//       const lines = text.split(/\r?\n/);
//       const linesLength = lines.length;

//       for (let i = 0; i < linesLength; i++) {
//         selection.insertText(lines[i]);
//         if (i < linesLength - 1) {
//           selection.insertParagraph();
//         }
//       }
//     } else {
//       selection.insertRawText(text);
//     }
//   }
// }


export default function ImagesPlugin({
  captionsEnabled
}){
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error("ImagesPlugin: ImageNode not registered on editor");
    }

    return mergeRegister(
      editor.registerCommand(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          console.log('INSERT_IMAGE_COMMAND')
          const imageNode = $createImageNode(payload);
          $insertNodes([imageNode]);
          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
          }
          return true;
        },
        COMMAND_PRIORITY_EDITOR
      ),
      editor.registerCommand(
        PASTE_COMMAND,
        (event) => {
          console.log('[image plugin] dummy paste command');
  
          return false;
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    );
  }, [captionsEnabled, editor]);

  return null;
}
