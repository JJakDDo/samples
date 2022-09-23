import "./tess-quote.css";

export default class TessQuote {
  static get toolbox() {
    return {
      title: "Tess Quote",
      icon: '<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 6.25a.75.75 0 01.75-.75h13.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.25zM3.75 11a.75.75 0 01.75.75v7a.75.75 0 01-1.5 0v-7a.75.75 0 01.75-.75zM8 12.313a.75.75 0 01.75-.75h11.5a.75.75 0 010 1.5H8.75a.75.75 0 01-.75-.75zm0 5.937a.75.75 0 01.75-.75h11.5a.75.75 0 010 1.5H8.75a.75.75 0 01-.75-.75z"/></svg>',
    };
  }
  constructor({ data }) {
    this.data = data;
    this.wrapper = undefined;
  }

  render() {
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("tess-quote");

    const input = document.createElement("div");
    input.contentEditable = true;
    input.innerHTML = this.data.text || "";

    this.wrapper.appendChild(input);

    return this.wrapper;
  }

  validate(savedData) {
    if (!savedData.text.trim()) {
      return false;
    }

    return true;
  }

  save(blockContent) {
    const input = blockContent.querySelector("[contenteditable]");
    console.log(input.innerHTML);
    return {
      text: input.innerHTML || "",
    };
  }
}
