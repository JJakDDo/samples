import React from "react";

function RenderBlocks({ blocks }) {
  return blocks?.map((block, index) => {
    switch (block.type) {
      case "header": {
        const { text, level } = block.data;
        if (level === 1) {
          return <h1 key={block.id || index}>{text}</h1>;
        }
      }
      case "paragraph": {
        const { text } = block.data;
        return <p key={block.id || index}>{text}</p>;
      }
      default: {
        return <React.Fragment key={index}></React.Fragment>;
      }
    }
  });
}

export default RenderBlocks;
