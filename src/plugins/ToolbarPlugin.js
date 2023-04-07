import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import * as React from "react";

// import "../image-styles.css";

import { INSERT_IMAGE_COMMAND } from "./ImagePlugin";
import { INSERT_SHAPE_TOGGLE_COMMAND } from "./ShapeTogglePlugin";


export function FillURL() {
  const srcfile = prompt("Enter the URL of the image:", "");
  return srcfile;
}

export default function ToolbarPlugin(){
  const [editor] = useLexicalComposerContext();
  const displayImage = (payload) => {
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, payload); 
  };

  return (
    <div className="toolbar">
      <button
        onClick={() =>
          displayImage({
            altText: "URL image",
            src: FillURL()
          })
        }
        className={"toolbar-item spaced "}
      >
        <span className="text">Enter Image URL</span>
      </button>
      <button
        onClick={() =>{
          editor.dispatchCommand(INSERT_SHAPE_TOGGLE_COMMAND, '')
          }
        }
        className={"toolbar-item spaced "}
      >
        <span className="text">Insert ShapeToggle</span>
      </button>
    </div>
  );
}
