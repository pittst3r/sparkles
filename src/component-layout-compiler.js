import {
  templateFactory,
} from '@glimmer/runtime';
import {
  precompile,
} from '@glimmer/compiler';

export default class ComponentLayoutCompiler {
  constructor(layoutString) {
    this._layoutString = layoutString;
  }

  compileLayout(env) {
    return rawCompileLayout(this._layoutString, env);
  }

  compile(builder) {
    builder.fromLayout(this.compileLayout(builder.env));
  }
}

function rawCompileLayout(templateString, env) {
  let js = precompile(templateString);
  let factory = templateFactory(JSON.parse(js));

  return factory.create(env).asLayout();
}
