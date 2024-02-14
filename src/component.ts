import { DIV } from "..";
import { Intrinsics } from "./elements"
import { Optional } from "./types";
import { camelToDashed, getMethods } from "./utils/general";


export abstract class Component<Props=any> {
    fields:Intrinsics.Fields<HTMLElement,Props>
    props:Props
    constructor(fields:Intrinsics.Fields<HTMLElement,Props>){
        this.fields = fields;
        this.props = 'props' in fields ? (fields.props as Props) : ({} as Props)
        const name = camelToDashed(this.constructor.name);
        if (!customElements.get(name)){
            const {
                connectedCallback,
                disconnectedCallback,
                adoptedCallback,
                attributeChangedCallback
            } = this;
            const methods:any = {};
            const methodsNames = getMethods(this);
            methodsNames.forEach(method => {
                methods[method] = (this as any)[method];
            })
            customElements.define(name, class extends HTMLElement {
                constructor(){
                    super();
                    for (const method in methods){
                        (this as any)[method] = methods[method]
                    }
                }
                connectedCallback() {
                    connectedCallback.bind(this)();
                }
                
                disconnectedCallback() {
                    disconnectedCallback.bind(this)();
                }
            
                adoptedCallback() {
                    adoptedCallback.bind(this)();
                }
            
                attributeChangedCallback(name:string, oldValue:string, newValue:string) {
                    attributeChangedCallback.bind(this)(name, oldValue, newValue)
                }
            });
            
            const renderFn = this.render;
            
            this.render = () => {
                const subtree = renderFn.bind(this)();
                const element = Intrinsics.create(name as keyof HTMLElementTagNameMap, this.fields, subtree);
                return element;
            }
        }
    }

    render() : Intrinsics.SubTree<Props> {
        return []
    }

    connectedCallback(this:HTMLElement) {}
    disconnectedCallback(){}
    adoptedCallback() {}
    attributeChangedCallback(name?:string, oldValue?:string, newValue?:string) {}


    static create(){

    }
}

export module Component {}
