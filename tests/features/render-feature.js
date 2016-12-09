import {
  feature,
  scenario,
  given,
  when,
  then,
} from 'gazpacho';
import RenderSteps from './step-defs/render-steps';

feature('Basic rendering', '');

scenario('Success', RenderSteps);
given`I have defined a template`;
when`I visit the page`;
then`I should see the rendered template`;
