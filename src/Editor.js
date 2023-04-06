import ExampleTheme from "./themes/ExampleTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import ImageToolbar from './plugins/ImageToolbarPlugin';
import { ImageNode } from "./nodes/ImageNode";
import ImagesPlugin from "./plugins/ImagePlugin";
import Placeholder from './utils/Placeholder';
import DragDropPaste from "./plugins/DragDropPastePlugin";
import { ShapeToggleNode } from "./nodes/ShapeToggleNode";
import ShapeTogglePlugin from "./plugins/ShapeTogglePlugin";


const editorConfig = {
  namespace: 'bardhan',
  theme: ExampleTheme,
  onError(error) {
    throw error;
  },
  nodes: [
    ImageNode,
    ShapeToggleNode
  ]
};

export default function Editor() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ImageToolbar />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <TreeViewPlugin />
          <ImagesPlugin />
          <ShapeTogglePlugin />
          <DragDropPaste/>
        </div>
      </div>
    </LexicalComposer>
  );
}
