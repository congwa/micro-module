class Core {
    constructor(microOptions = {}) {
        this.microOptions = microOptions;
        this.name = microOptions.name;
        this.options = microOptions.options;
        this.module = microOptions.module;
        this.custormElement = null;
    }

    init () {
        this.defineCustomElement();
    }

    defineCustomElement() { 
       this.custormElement = this.createCustromElement();
    }

    createCustromElement() {
        const {options, module} = this;
        return class CustromElement extends HTMLElement {
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
                this.webComponentsIns.appendChild(this.contentWrapper);
                // 挂载
                module.mount(this.contentWrapper, this.attributesObj, this);
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

    createWrapper = () => {
        const fragment = document.createDocumentFragment();
        const contentWrapper = renderHtmlTagObjectToHtmlElement(
          createHtmlTagObject('div', {
            id: 'magic-wrapper',
            style: 'height: 100%; width: 100%;',
          }),
        );
        fragment.appendChild(contentWrapper);
        return fragment
      };
}

export default Core;