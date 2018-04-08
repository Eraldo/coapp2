import {MarkedOptions, MarkedRenderer} from "ngx-markdown";

// function that returns `MarkedOptions` with renderer override
export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.text = (text: string) => {
    const step = /^STEP: /g;
    if (step.test(text)) {
      text = text.replace(step, '<strong>STEP:</strong> ');
    }
    return text;
  };

  return {
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
  };
}
