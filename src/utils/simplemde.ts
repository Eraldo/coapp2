import {MarkdownService} from "ngx-markdown";
import {ModalController} from "ionic-angular";

export function simplemdeFactory(markdownService: MarkdownService, modalCtrl: ModalController) {
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
        name: "drawVideo",
        action: drawVideo,
        className: "fa fa-video-camera",
        title: "Video",
      },
      {
        name: "emoji",
        action: (editor) => {insertEmoji(editor, modalCtrl)},
        className: "fa fa-smile-o",
        title: "Emoji",
      },
      "side-by-side",
      'fullscreen',
      {
        name: "guide",
        action: showGuide,
        className: "fa fa-question-circle",
        title: "Markdown Guide",
        default: true
      }
    ],
    // status: false
    // shortcuts: {
    //   'drawVideo': "Cmd-Alt-K"
    // }
  }
}

export function showGuide(editor) {
  // TODO: Add navCtrl link.
  // => Injecting App? and then getting navCtrl dynamically.
  // Or: #/tutorial/markdown <= using segment :id
  window.open('#/tutorial/markdown', '_blank')
}

export function insertEmoji(editor, modalCtrl) {
  let modal = modalCtrl.create('EmojiModalPage', {}, {enableBackdropDismiss: true});
  modal.onDidDismiss(data => {
    console.log(data);
    if (data) {
      const cm = editor.codemirror;
      const selection = cm.getSelection('\n');
      cm.replaceSelection(`${data}`);
    }
  });
  modal.present();
}

export function drawVideo(editor) {
  const cm = editor.codemirror;
  const selection = cm.getSelection('\n');
  cm.replaceSelection(`[${selection}](https://www.youtube.com/watch?v=#id#)`, "around");
}
