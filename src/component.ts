import { Intrinsics } from "./intrinsics"

export class Component<T=undefined> extends HTMLElement {
    props:T = (undefined as any)
    Children:Intrinsics.Children<T>=[]
    render?():Intrinsics.Children<T>
    connectedCallback?(this:HTMLElement) : void
    disconnectedCallback?(this:HTMLElement) : void
    adoptedCallback?(this:HTMLElement):void
    attributeChangedCallback?(name?:string, oldValue?:string, newValue?:string) : void
}

export function createElement<Props>(tagName:string, elementClass:typeof Component<Props>){
    customElements.define(tagName, elementClass);

    return function (
        fields?:Intrinsics.Fields<HTMLElement, Props> | Intrinsics.Children<Props>,
        children?:Intrinsics.Children<Props>
    ){
        const element = document.createElement(tagName);
        const _fields:Intrinsics.Fields<HTMLElement,Props> = Intrinsics.isFields(fields) 
                                        ? fields
                                        : {} as any;
        const _children:Intrinsics.Children<Props> = Intrinsics.isChildren(children)
                                        ? children
                                        : Intrinsics.isChildren(fields)
                                            ? fields
                                            : [];
        let Children = _children;
        if ('render' in element && typeof element.render === "function"){
            Children = element.render.call({
                ...element,
                props:(_fields as any)?.props,
                Children,
            });
        }
        return Intrinsics.create(tagName as any, _fields, Children);

        // const element = Intrinsics.create<HTMLTemplateElement,T>('template', fields, children);
        // console.log(element)
        // if ('render' in element && typeof element.render === "function"){
        //     (element as any).Children = [...element.children];
        //     const rendered = element.render.call(element);
        //     console.log(rendered)
        // }
        // return element
    }
}

/* export abstract class Component<Props=any> {
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
                const children = renderFn.bind(this)();
                const element = Intrinsics.create(name as keyof HTMLElementTagNameMap, this.fields, children);
                return element;
            }
        }
    }

    render() : Intrinsics.Children<Props> {
        return []
    }

    connectedCallback(this:HTMLElement) {}
    disconnectedCallback(){}
    adoptedCallback() {}
    attributeChangedCallback(name?:string, oldValue?:string, newValue?:string) {}


    static create(){

    }
}
 */
export module Component {}
