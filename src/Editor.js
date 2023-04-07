import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import ImageToolbar from './plugins/ToolbarPlugin';
import ImagesPlugin from "./plugins/ImagePlugin";
import Placeholder from './utils/Placeholder';
import DragDropPaste from "./plugins/DragDropPastePlugin";
import ShapeTogglePlugin from "./plugins/ShapeTogglePlugin";
import { LocalStoragePlugin } from "./plugins/LocalStoragePlugin";
import { EDITOR_NAMESPACE } from "./App";

export default function Editor({editorConfig}) {
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
          <LocalStoragePlugin namespace={EDITOR_NAMESPACE}/>
        </div>
      </div>
    </LexicalComposer>
  );
}