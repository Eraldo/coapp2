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
    // const link = MarkedRenderer.prototype.link.call(this, href, title, text);
    // return link.replace("<a","<a target='_blank' ");
    // return `<a target="_blank" href="${ href }" title="${ title }">${ text }</a>`;
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

/**
 * Parse url of video to return Video ID only
 * if video exists and matches to media's host
 * else undefined
 *
 * @example mediaParseIdFromUrl('youtube', 'https://www.youtube.com/watch?v=fgQRaRqOTr0')
 * //=> fgQRaRqOTr0
 *
 * @param  {string} provider    name of media/video site
 * @param  {string} url         url of video
 * @return {string|undefined}   the parsed id of video, if not match - undefined
 */
function mediaParseIdFromUrl(provider, url) {
  if (provider === 'youtube') {
    var youtubeRegex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch && youtubeMatch[7].length == 11) {
      return youtubeMatch[7];
    } else {
      return undefined;
    }
  } else if (provider === 'vimeo') {
    var vimeoRegex = /^.*vimeo.com\/(\d+)/;
    var vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch && vimeoMatch[1].length == 8) {
      return vimeoMatch[1];
    } else {
      return undefined;
    }
  } else if (provider === 'viddler') {
    var viddlerRegex = /^.*((viddler.com\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var viddlerMatch = url.match(viddlerRegex);
    if (viddlerMatch && viddlerMatch[7].length == 8) {
      return viddlerMatch[7];
    } else {
      return undefined;
    }
  } else if (provider === 'dailymotion') {
    var dailymotionRegex = /^.+dailymotion.com\/((video|hub)\/([^_]+))?[^#]*(#video=([^_&]+))?/;
    var dailymotionMatch = url.match(dailymotionRegex);
    if (dailymotionMatch && (dailymotionMatch[5] || dailymotionMatch[3])) {
      if (dailymotionMatch[5]) {
        return dailymotionMatch[5];
      }
      if (dailymotionMatch[3]) {
        return dailymotionMatch[3];
      }
      return undefined;
    } else {
      return undefined;
    }
  }/* not works yet
   else if (provider === 'html5') {
    var html5Regex = /.(?:wav|mp3|ogg|mp4|wma|webm|mp3)$/i;
    var html5Match = url.match(html5Regex);

    var data = {
        extension: html5Match,
        link: url
    };
    return data;
  }*/ else {
    return;
  }
}
