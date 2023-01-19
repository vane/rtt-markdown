import { EditorState } from 'prosemirror-state';
import { TextEditorSchema } from './text-editor.schema';
import { history as baseHistory } from 'prosemirror-history';
import { baseKeymap } from 'prosemirror-commands';
import { buildInputRules } from './text-editor-input.rules';
import { buildKeymap } from './text-editor.keymap';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import { keymap } from 'prosemirror-keymap';

export class TextEditorFactory {
  static createState(data: string): EditorState {
    const schema = TextEditorSchema.createSchema();
    const doc = schema.topNodeType.createAndFill();
    if (!doc) throw new Error('Unable to create editor state');
    return EditorState.create({
      doc,
      plugins: [
        gapCursor(),
        dropCursor(),
        keymap(buildKeymap(schema)), // custom keys
        keymap(baseKeymap),
        buildInputRules(schema), // custom rules
        baseHistory()
      ]
    });
  }
}
