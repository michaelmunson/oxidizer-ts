import { AnyObject } from "./types";

export namespace Props {
    export function create<T extends HTMLElement, P extends AnyObject>(element:T, props:P) : P {
        return new Proxy(props, {
            set(target, property, newValue, receiver) {
                (target as any)[property] = newValue;
                return true; 
            },
        })
    }
} 

