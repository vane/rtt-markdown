import { Schema } from 'prosemirror-model';

export class TextEditorSchema {
  static createSchema(): Schema {
    return new Schema({
      nodes: {
        doc: {
          content: 'block+'
        },
        paragraph: {
          content: 'inline*',
          group: 'block',
          parseDOM: [{ tag: 'p' }],
          toDOM() {
            return ['p', 0];
          }
        },
        hard_break: {
          inline: true,
          group: 'inline',
          selectable: false,
          parseDOM: [{ tag: 'br' }],
          toDOM() {
            return ['br'];
          }
        },
        text: {
          group: 'inline'
        }
      }
    });
  }
}
