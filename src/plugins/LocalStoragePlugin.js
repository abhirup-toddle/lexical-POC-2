import { useEffect, useCallback } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { debounce } from "../utils/debounce";

import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $getSelection,
  $getTextContent,
} from "lexical";

export function LocalStoragePlugin({ namespace }) {
  const [editor] = useLexicalComposerContext();

  const saveContent = useCallback(
    (content) => {
      localStorage.setItem(namespace, content);
    },
    [namespace]
  );

  const debouncedSaveContent = debounce(saveContent, 500);

  useEffect(() => {
    return editor.registerUpdateListener(
      ({ editorState, dirtyElements, dirtyLeaves }) => {
        if (dirtyElements.size === 0 && dirtyLeaves.size === 0) return;
        const serializedState = JSON.stringify(editorState);
        debouncedSaveContent(serializedState);
      }
    );
  }, [debouncedSaveContent, editor]);

  console.log('this ran')

  // useEffect(() => {
  //   return editor.registerTextContentListener((textContent) => {
  //     console.log('textContent: ', textContent);
  //   })
  // }, [debouncedSaveContent, editor])

  return null;
}
