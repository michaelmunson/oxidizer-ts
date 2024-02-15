import { Intrinsics } from "./intrinsics";

type DOMElement = Intrinsics.Intrinsic | Node;

export type RenderFunction<T extends DOMElement=DOMElement, Props={[key:string]:any}>
    = (props:Props) => T|T[];

class ChildRenderMap extends Map<DOMElement|DOMElement[],RenderFunction> {
    constructor(){
        super();
    }

}

class RenderMap extends Map<DOMElement, ChildRenderMap> {
    constructor(){
        super();
    }
    initialize(element:DOMElement){
        let childMap = this.get(element);
        if (!childMap){
            childMap = new ChildRenderMap(); 
            this.set(element, childMap);
        }
        return childMap;
    }
    append(element:DOMElement, childElement:DOMElement, renderFunction:RenderFunction){
        const childMap = this.initialize(element)
        childMap.set(childElement, renderFunction);
    }
    render(element:DOMElement){
        const map = this.get(element);
        const toSet = new ChildRenderMap(); 
        if (map){
            for (const [child,fn] of map){
                if (Array.isArray(child)){
                    const rendered = fn.call(element, (element as any).props) as DOMElement[];
                    for (const index in child){
                        const subChild = child[index];
                        const renderedChild = rendered[index];
                        (subChild as any).replaceWith(renderedChild);
                    }
                    map.delete(child)
                    toSet.set(rendered, fn);
                } else {
                    const rendered = fn.call(element, (element as any).props) as DOMElement;
                    (child as any).replaceWith(rendered);
                    map.delete(child);
                    toSet.set(rendered, fn);
                }
            }
            this.set(element, toSet);
        }
    }
}

export const OxidizerRenderMap = new RenderMap();

