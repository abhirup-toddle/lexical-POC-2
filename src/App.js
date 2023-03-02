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
      <h1>Rich Text Example</h1>
      <p>Note: this is an experimental build of Lexical</p>
      <Editor />
      <div className="other">
        <h2>Other Examples</h2>
        <ul>
          <li>
            <a
              href="https://codesandbox.io/s/lexical-plain-text-example-g932e"
              target="_blank"
              rel="noreferrer"
            >
              Plain text example
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
