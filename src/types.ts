import type {Properties as _CSSObject} from "csstype";

// Generic 
export type Optional<T> = {
    [P in keyof T]?: T[P]
}

export type AnyObject = {[key:string]:any}

export type CSSObject = _CSSObject;

export type CSSProperties = CSSObject|string

export type HTMLAppendable = HTMLElement | HTMLElement[] | string
/* export type Fields<T extends HTMLElement = HTMLElement, Props extends AnyObject=AnyObject> = Omit<Optional<T>, "style"> & {
    style?:CSSProperties
    props?:Props
}

export type BaseSubTree = HTMLElement|string

export type Subtree<T=any> = BaseSubTree
                            | BaseSubTree[]
                            | ((props:T) => Subtree<T>) */

export namespace Check {
    export function isObject(something:any) : boolean {
        return typeof something === "object" && something.toString() === "[object Object]";
    }
    export function isString(something:any) {
        return typeof something === "string"
    }
    export function isHTMLElement(something:any) : something is HTMLElement {
        return something instanceof HTMLElement
    }
    export function isFunction(something:any){
        return typeof something === "function"
    }
    // export function isProps(something:any) : something is AnyObject{
    //     return isObject(something)
    // }
    // export function isFields<T extends HTMLElement>(something:any) : something is Fields<T> {
    //     return isObject(something) && !isSubtree(something); 
    // }  
    // export function isSubtree(something:any) : something is Subtree {
    //     if (Array.isArray(something)){
    //         for (const element of something){
    //             if (!isSubtree(element)){
    //                 return false;
    //             }
    //         }
    //         return true;
    //     } else {
    //         return isHTMLElement(something) || isString(something) || isFunction(something)
    //     }
    // }
}




/* TESTING */


// const X = {
//     func: <T>(x:T) => document.createElement('a')
// }

// function ELEM<T=Props>(){

// }