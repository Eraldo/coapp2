import {MarkedOptions, MarkedRenderer} from "ngx-markdown";
import {EmbedVideoService} from "ngx-embed-video";
import {DomSanitizer} from "@angular/platform-browser";
import {SecurityContext} from "@angular/core";

// function that returns `MarkedOptions` with renderer override
export function markedOptionsFactory(embedService: EmbedVideoService, sanitizer: DomSanitizer): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.link = (href, title, text) => {
    const embed = embedService.embed(href);
    if (embed) {
      return sanitizer.sanitize(SecurityContext.HTML, embed);
    }
    return `<a target="_blank" href="" onclick="event.preventDefault(); window.open('${ href }', '_blank')" title="${ title }">${ text }</a>`;
  };

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
