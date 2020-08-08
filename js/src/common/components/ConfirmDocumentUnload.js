import Component from '../Component';

/**
 * The `ConfirmDocumentUnload` component can be used to register a global
 * event handler that prevents closing the browser window/tab based on the
 * return value of a given callback prop.
 *
 * ### Props
 *
 * - `when` - a callback returning true when the browser should prompt for
 *            confirmation before closing the window/tab
 *
 * ### Children
 *
 * NOTE: Only the first child will be rendered. (Use this component to wrap
 * another component / DOM element.)
 *
 */
export default class ConfirmDocumentUnload extends Component {
  handler() {
    return this.attrs.when() || undefined;
  }

  oncreate(vnode) {
    super.oncreate(vnode);

    $(window).on('beforeunload', this.handler);
  }

  onremove(vnode) {
    $(window).off('beforeunload', this.handler);
  }

  view(vnode) {
    // To avoid having to render another wrapping <div> here, we assume that
    // this component is only wrapped around a single element / component.
    return vnode.children[0];
  }
}