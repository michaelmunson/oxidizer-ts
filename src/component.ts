import { DIV } from "..";
import { Intrinsics } from "./elements"
import { camelToDashed } from "./utils/general";

export class Component<T=Object> {
    constructor(){
        const name = camelToDashed(this.constructor.name);
        if (!customElements.get(name)){
            const {
                connectedCallback,
                disconnectedCallback,
                adoptedCallback,
                attributeChangedCallback
            } = this;
            customElements.define(name, class extends HTMLElement {
                constructor(){
                    super();
                }
                connectedCallback() {
                    connectedCallback.bind(this)();
                }
                
                disconnectedCallback() {
                    disconnectedCallback();
                }
            
                adoptedCallback() {
                    adoptedCallback();
                }
            
                attributeChangedCallback(name:string, oldValue:string, newValue:string) {
                    attributeChangedCallback(name, oldValue, newValue)
                }
            });
            
            const renderFn = this.render;
            
            this.render = () => {
                const subtree = renderFn(); 
                const element = Intrinsics.create(name as keyof HTMLElementTagNameMap, {} as any, subtree);
                return element;
            }
        }
    }

    render() : Intrinsics.SubTree<T> {
        return []
    }

    connectedCallback(this:HTMLElement) {}
    disconnectedCallback(){}
    adoptedCallback() {}
    attributeChangedCallback(name?:string, oldValue?:string, newValue?:string) {}
}

export module Component {}
