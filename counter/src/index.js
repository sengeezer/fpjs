import h from 'hyperscript';
import hh from 'hyperscript-helpers';

const { div, button } = hh(h);
const initModel = 0;

const update = (msg, model) => {
  switch(msg) {
    case 'plus':
      return model++;
    case 'minues':
      return model--;
    default:
      return model;
  }
};

const view = (dispatch, model) => {
  return div([
    div({ className: 'mv2' }, `Count: ${model}`),
    button({
      className: 'pv1 ph2 mr2',
      onclick: () => dispatch('plus'),
    }, '+'),
    button({
      className: 'pv1 ph2',
      onclick: () => dispatch('minus'),
    }, '-'),
  ]);
}

// Impure composition
const app = (initModel, update, view, node) => {
  let model = initModel;
  let currentView = view(dispatch, model);

  node.appendChild(currentView);

  function dispatch(msg) {
    model = update(msg, model);
    const updatedView = view(dispatch, model);
    node.replaceChild(updatedView, currentView);
    currentView = updatedView;
  }
}

const rootNode = document.getElementById('app');

app(initModel, update, view, rootNode);
// rootNode.appendChild(view(initModel));