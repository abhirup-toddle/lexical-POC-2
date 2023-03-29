import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {DRAG_DROP_PASTE} from '@lexical/rich-text';
import {isMimeType, mediaFileReader} from '@lexical/utils';
// import {isMimeType, mediaFileReader} from '../utils/generalUtils';
import {COMMAND_PRIORITY_LOW} from 'lexical';
import {useEffect} from 'react';

// import {INSERT_IMAGE_COMMAND} from '../ImagesPlugin';
import {INSERT_IMAGE_COMMAND} from './ImagePlugin';

const ACCEPTABLE_IMAGE_TYPES = [
  'image/',
  'image/heic',
  'image/heif',
  'image/gif',
  'image/webp',
];

export default function DragDropPaste(){
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerCommand(
      DRAG_DROP_PASTE,
      (files) => {
        console.log('pasting ...  ');
        (async () => {
          const filesResult = await mediaFileReader(
            files,
            [ACCEPTABLE_IMAGE_TYPES].flatMap((x) => x),
          );
          for (const {file, result} of filesResult) {
            console.log('file[DragDropPaste]: ', file);
            if (isMimeType(file, ACCEPTABLE_IMAGE_TYPES)) {
              editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                altText: file.name,
                src: result,
              });
            } else {
              console.log('[DragDropPaste]: not acceptable type')
            }
          }
        })();
        return true;
      },
      COMMAND_PRIORITY_LOW,
    );
  }, [editor]);
  return null;
}
