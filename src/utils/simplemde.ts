import {MarkdownService} from "ngx-markdown";

export function simplemdeFactory(markdownService: MarkdownService) {
  return {
    previewRender: function (plainText) {
      return markdownService.compile(plainText); // Returns HTML from a custom parser
    },
    toolbar: [
      'bold',
      'italic',
      'heading',
      'quote',
      'unordered-list',
      'ordered-list',
      'link',
      'image',
      {
        name: "video",
        action: drawVideo,
        className: "fa fa-video-camera",
        title: "Video",
      },
      "side-by-side",
      'fullscreen',
      'guide',
    ],
    // status: false
  }
}

// simpleMDE custom editor functions
function getState(cm, pos=undefined) {
  pos = pos || cm.getCursor("start");
  var stat = cm.getTokenAt(pos);
  if(!stat.type) return {};

  var types = stat.type.split(" ");

  var ret: any = {},
    data, text;
  for(var i = 0; i < types.length; i++) {
    data = types[i];
    if(data === "strong") {
      ret.bold = true;
    } else if(data === "variable-2") {
      text = cm.getLine(pos.line);
      if(/^\s*\d+\.\s/.test(text)) {
        ret["ordered-list"] = true;
      } else {
        ret["unordered-list"] = true;
      }
    } else if(data === "atom") {
      ret.quote = true;
    } else if(data === "em") {
      ret.italic = true;
    } else if(data === "quote") {
      ret.quote = true;
    } else if(data === "strikethrough") {
      ret.strikethrough = true;
    } else if(data === "comment") {
      ret.code = true;
    } else if(data === "link") {
      ret.link = true;
    } else if(data === "tag") {
      ret.image = true;
    } else if(data.match(/^header(\-[1-6])?$/)) {
      ret[data.replace("header", "heading")] = true;
    }
  }
  return ret;
}
function _toggleBlock(editor, type, start_chars, end_chars) {
  if(/editor-preview-active/.test(editor.codemirror.getWrapperElement().lastChild.className))
    return;

  end_chars = (typeof end_chars === "undefined") ? start_chars : end_chars;
  var cm = editor.codemirror;
  var stat = getState(cm);

  var text;
  var start = start_chars;
  var end = end_chars;

  var startPoint = cm.getCursor("start");
  var endPoint = cm.getCursor("end");

  if(stat[type]) {
    text = cm.getLine(startPoint.line);
    start = text.slice(0, startPoint.ch);
    end = text.slice(startPoint.ch);
    if(type == "bold") {
      start = start.replace(/(\*\*|__)(?![\s\S]*(\*\*|__))/, "");
      end = end.replace(/(\*\*|__)/, "");
    } else if(type == "italic") {
      start = start.replace(/(\*|_)(?![\s\S]*(\*|_))/, "");
      end = end.replace(/(\*|_)/, "");
    } else if(type == "strikethrough") {
      start = start.replace(/(\*\*|~~)(?![\s\S]*(\*\*|~~))/, "");
      end = end.replace(/(\*\*|~~)/, "");
    }
    cm.replaceRange(start + end, {
      line: startPoint.line,
      ch: 0
    }, {
      line: startPoint.line,
      ch: 99999999999999
    });

    if(type == "bold" || type == "strikethrough") {
      startPoint.ch -= 2;
      if(startPoint !== endPoint) {
        endPoint.ch -= 2;
      }
    } else if(type == "italic") {
      startPoint.ch -= 1;
      if(startPoint !== endPoint) {
        endPoint.ch -= 1;
      }
    }
  } else {
    text = cm.getSelection();
    if(type == "bold") {
      text = text.split("**").join("");
      text = text.split("__").join("");
    } else if(type == "italic") {
      text = text.split("*").join("");
      text = text.split("_").join("");
    } else if(type == "strikethrough") {
      text = text.split("~~").join("");
    }
    cm.replaceSelection(start + text + end);

    startPoint.ch += start_chars.length;
    endPoint.ch = startPoint.ch + text.length;
  }

  cm.setSelection(startPoint, endPoint);
  cm.focus();
}
function _replaceSelection(cm, active, startEnd, url) {
  if(/editor-preview-active/.test(cm.getWrapperElement().lastChild.className))
    return;

  var text;
  var start = startEnd[0];
  var end = startEnd[1];
  var startPoint = cm.getCursor("start");
  var endPoint = cm.getCursor("end");
  if(url) {
    end = end.replace("#url#", url);
  }
  if(active) {
    text = cm.getLine(startPoint.line);
    start = text.slice(0, startPoint.ch);
    end = text.slice(startPoint.ch);
    cm.replaceRange(start + end, {
      line: startPoint.line,
      ch: 0
    });
  } else {
    text = cm.getSelection();
    cm.replaceSelection(start + text + end);

    startPoint.ch += start.length;
    if(startPoint !== endPoint) {
      endPoint.ch += start.length;
    }
  }
  cm.setSelection(startPoint, endPoint);
  cm.focus();
}
/**
 * Action for drawing a video markdown tag.
 */
export function drawVideo(editor) {
  var cm = editor.codemirror;
  var stat = getState(cm);
  var options = editor.options;
  var url = "http://";
  if(options.promptURLs) {
    url = prompt("URL of the video:");
    if(!url) {
      return false;
    }
  }
  _replaceSelection(cm, stat.image, ["[video:", "](#url#)"], url);
}
