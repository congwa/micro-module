

const voidTags = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'keygen',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
];
class Core {
    constructor(microOptions = {}) {
        this.microOptions = microOptions;
        this.name = microOptions.name;
        this.options = microOptions.options;
        this.module = microOptions.module;
        this.customElement = null;
    }

    init () {
        this.defineCustomElement();
    }

    defineCustomElement() { 
      this.customElement = this.createCustomElement();
      customElements.define(this.name, this.customElement);
    }

    createCustomElement() {
        const {options, module } = this;

        const createWrapper = this.createWrapper.bind(this)
        return class CustomElement extends HTMLElement {
            constructor() {
                super();
                this.webComponentsIns = options.shadow ? this.attachShadow({ mode: 'open' }) : this;
                module.bootstrap && module.bootstrap(this);
            }

            // 监听属性变化
            static get observedAttributes() {
                return Object.keys(options.propTypes || {});
            }

            // 首次被插入element调用
            connectedCallback() {
                const contentWrapper = createWrapper();
                this.contentWrapper = contentWrapper;
                
                // 挂载
                module.mount(this.contentWrapper, this.attributesObj, this);
                this.webComponentsIns.appendChild(this.contentWrapper);
              
            }
        
              // 当 custom element被移动到新的文档时，被调用
            disconnectedCallback() {
                // 销毁
                module.unmount && module.unmount(this);
            }
        
              // 当 custom element增加、删除、修改自身属性时，被调用。
            attributeChangedCallback(attributeName, _oldValue, newValue) {
                module.updated(
                  attributeName,
                  newValue,
                  this.contentWrapper,
                  this,
                  _oldValue,
                );
            }
        }
    }

    createWrapper() {
        const fragment = document.createDocumentFragment();
        const contentWrapper = this.renderHtmlTagObjectToHtmlElement(
          this.createHtmlTagObject('div', {
            id: 'micro-wrapper',
            style: 'height: 100%; width: 100%;',
          }),
        );
        fragment.appendChild(contentWrapper);
        return fragment
    }

    renderHtmlTagObjectToHtmlElement(tagDefinition) {
      const tagElement = document.createElement(tagDefinition.tagName);
      Object.keys(tagDefinition.attributes || {}).forEach((attributeName) => {
        tagElement.setAttribute(attributeName, tagDefinition.attributes?.[attributeName] || '');
      });
      return tagElement;
    }

    
    createHtmlTagObject(tagName, attributes) {
      return {
        tagName,
        voidTag: voidTags.indexOf(tagName) !== -1,
        attributes: attributes,
      };
    }
}

export default Core;