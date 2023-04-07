// import "./styles.css";
import "./main-styles.css";
import Editor from "./Editor";
import ExampleTheme from "./themes/ExampleTheme";
import { ImageNode } from "./nodes/ImageNode";
import { ShapeToggleNode } from "./nodes/ShapeToggleNode";


export const EDITOR_NAMESPACE = 'bardhan_1'

export const editorConfig = {
  namespace: EDITOR_NAMESPACE,
  theme: ExampleTheme,
  onError(error) {
    throw error;
  },
  nodes: [
    ImageNode,
    ShapeToggleNode
  ]
};

export default function App() {
  const content = localStorage.getItem(EDITOR_NAMESPACE);

  return (
    <div className="App">
      <h1>Lexical POC</h1>
      <Editor editorConfig={{...editorConfig, editorState: content}}/>
    </div>
  );
}
