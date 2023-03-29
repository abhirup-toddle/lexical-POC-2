import { createEditor, DecoratorNode } from "lexical";
import * as React from "react";
import { Suspense } from "react";

// const ImageComponent = React.lazy(
//   () => import("./ImageComponent-new")
// );
const ImageComponent = React.lazy(
  () => import("./ImageComponent")
);

//for serialization
function convertImageElement(domNode){
  if (domNode instanceof HTMLImageElement) {
    const { alt, src } = domNode;
    const node = $createImageNode({ altText: alt, src });
    return { node };
  } 
  return null;
}

export class ImageNode extends DecoratorNode {
  __src;
  __altText;
  __width;
  __height;
  __maxWidth;
  __showCaption;
  __caption;
  // Captions cannot yet be used within editor cells
  __captionsEnabled;

  constructor(
    src,
    altText,
    maxWidth,
    width,
    height,
    showCaption,
    caption,
    captionsEnabled,
    key
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__maxWidth = maxWidth;
    this.__width = width || "inherit";
    this.__height = height || "inherit";
    this.__showCaption = showCaption || false;
    this.__caption = caption || createEditor();
    this.__captionsEnabled = captionsEnabled || captionsEnabled === undefined;
  }

  static getType(){
    return "image";
  }


  //for serialization
  static clone(node) {
    return new ImageNode(
      node.__src,
      node.__altText,
      node.__maxWidth,
      node.__width,
      node.__height,
      node.__showCaption,
      node.__caption,
      node.__captionsEnabled,
      node.__key
    );
  }

  //for serialization
  static importJSON(serializedNode) {
    const {
      altText,
      height,
      width,
      maxWidth,
      caption,
      src,
      showCaption
    } = serializedNode;
    const node = $createImageNode({
      altText,
      height,
      maxWidth,
      showCaption,
      src,
      width
    });
    const nestedEditor = node.__caption;
    const editorState = nestedEditor.parseEditorState(caption.editorState);
    if (!editorState.isEmpty()) {
      nestedEditor.setEditorState(editorState);
    }
    return node;
  }

//for serialization
  exportDOM(){
    const element = document.createElement("img");
    element.setAttribute("src", this.__src);
    element.setAttribute("alt", this.__altText);
    return { element };
  }

//for serialization
  static importDOM(){
    return {
      img: (node) => ({
        conversion: convertImageElement,
        priority: 0
      })
    };
  }


  //for serialization
  exportJSON() {
    return {
      altText: this.getAltText(),
      caption: this.__caption.toJSON(),
      height: this.__height === "inherit" ? 0 : this.__height,
      maxWidth: this.__maxWidth,
      showCaption: this.__showCaption,
      src: this.getSrc(),
      type: "image",
      version: 1,
      width: this.__width === "inherit" ? 0 : this.__width
    };
  }

  setWidthAndHeight(
    width,
    height
  ){
    console.log('setWidthAndHeight ran');
    const writable = this.getWritable();
    writable.__width = width;
    writable.__height = height;
  }

  //unused for now
  setShowCaption(showCaption) {
    const writable = this.getWritable();
    writable.__showCaption = showCaption;
  }

  // View

  createDOM(config) {
    // Define the DOM element here
    const div = document.createElement("div");
    const theme = config.theme;
    const className = theme.image;
    if (className !== undefined) {
      div.className = className;
    }
    console.log('createDOM')
    return div;
  }

  updateDOM(){
    // Returning false tells Lexical that this node does not need its 
    // DOM element replacing with a new copy from createDOM.
    console.log('updateDOM')
    return false;
  }

  getSrc(){
    return this.__src;
  }

  getAltText(){
    return this.__altText;
  }

  decorate(){
    console.log('decorate')
    return (
      <Suspense fallback={null}>
        <ImageComponent
          src={this.__src}
          altText={this.__altText}
          width={this.__width}
          height={this.__height}
          maxWidth={this.__maxWidth}
          nodeKey={this.getKey()}
          showCaption={this.__showCaption}
          caption={this.__caption}
          captionsEnabled={this.__captionsEnabled}
          resizable={true}
        />
      </Suspense>
    );
  }
}

export function $createImageNode({
  altText,
  height,
  // maxWidth = 500,
  maxWidth,
  captionsEnabled,
  src,
  width,
  showCaption,
  caption,
  key
}) {
  console.log('$createImageNode');
  return new ImageNode(
    src,
    altText,
    maxWidth,
    width,
    height,
    showCaption,
    caption,
    captionsEnabled,
    key
  );
}

export function $isImageNode(node){
  return node instanceof ImageNode;
}
