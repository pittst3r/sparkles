import { StepDefGroup } from 'gazpacho';
import { UpdatableReference, } from 'glimmer-object-reference';
import { TestEnvironment, TestDynamicScope, } from 'glimmer-test-helpers';

let env;
let renderedMarkup;
let template;

export default new StepDefGroup((stepDef) => {
  stepDef('I have defined a template', () => {
    env = new TestEnvironment();
    env.registerBasicComponent('cool-component', undefined, '<p>{{yield}}</p>');
    renderedMarkup = env.getDOM().createElement('div');
  });

  stepDef('I visit the page', () => {
    template = compile('<cool-component>{{message}}</cool-component>');
    render(template, { message: 'Hello world', });
  });

  stepDef('I should see the rendered template', (assert) => {
    assert.expect(1);
    assert.equal(renderedMarkup.innerHTML, "<p>Hello world</p>");
  });
});

function compile(templateString) {
  return env.compile(templateString);
}

function render(template, context) {
  let reference = new UpdatableReference(context);

  env.begin();
  template.render(reference, renderedMarkup, new TestDynamicScope());
  env.commit();
}
