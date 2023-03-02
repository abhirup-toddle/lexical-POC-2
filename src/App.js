import "./styles.css";
import Editor from "./Editor";

// Define the custom plugin
// const helloPlugin = createPlugin({
//   name: 'hello',
//   button: {
//     label: 'Hello',
//     icon: <MdPrint />,
//     action: ({ editor }) => {
//       console.log('Hello');
//     },
//   },
// });

// Register the plugin with the editor
// const plugins = [helloPlugin];

export default function App() {
  return (
    <div className="App">
      <h1>Lexical POC</h1>
      <Editor />
    </div>
  );
}
