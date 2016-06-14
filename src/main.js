// @flow

/*
  tinycopy - A small library for clipboard copy
  @version 2.0.0
 */
export default class TinyCopy {

  listeners: {};

  constructor(trigger: HTMLElement, target: HTMLInputElement|string) {

    this.listeners = {};

    if (!TinyCopy.isElement(trigger)) {
      throw new Error('Illegal arguments error: trigger');
    }

    const value: string = ((target: any): string => {
      if (TinyCopy.isElement(target)) {
        return target.value
      } else if(TinyCopy.isText(target)) {
        return target
      } else {
        throw new Error('Illegal arguments error: target');
      }
    })(target);

    trigger.addEventListener('click', () => {
      TinyCopy.exec(value).then((data) => {
        this.emit('success', data);
      }).catch((err) => {
        this.emit('error', err);
      });
    });

  }

  on(event: string, action: Function): TinyCopy {
    this.listeners[event] = action;
    return this;
  }

  emit(event: string): void {
    this.listeners[event] && this.listeners[event].apply(null, [].slice.call(arguments, 1));
  }

  static createTempElement(value: string): HTMLInputElement {
    const element: HTMLInputElement = document.createElement('input');
    element.style.opacity = '0';
    element.setAttribute('readonly', '');
    element.value = value;
    return element;
  }

  static exec(value: string): Promise {
    return new Promise((resolve, reject) => {
      const temp = TinyCopy.createTempElement(value);
      document.body.appendChild(temp);
      temp.select();
      try {
        if (document.execCommand('copy')) {
          resolve(value);
        } else {
          reject(new Error('Not supported the execCommand.'));
        }
      } catch (e) {
        reject(new Error('Not supported the execCommand.'));
      } finally {
        document.body.removeChild(temp);
      }
    });
  }

  static isElement(node: any): boolean {
    return !!(node && (node.nodeName || (node.prop && node.attr && node.find)));
  }

  static isText(obj: any): boolean {
    return TinyCopy.is('String', obj) || TinyCopy.is('Number', obj)
  }

  static is(type: string, obj: any): boolean {
    const clazz = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clazz === type;
  }

}
