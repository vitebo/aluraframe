import { ProxyFactory } from '../services/ProxyFactory.js';

export class Bind {
  constructor(model, view, props) {
    const action = () => view.update(model);
    const proxy = ProxyFactory.create(model, props, action);
    view.update(model);
    return proxy;
  }
}
