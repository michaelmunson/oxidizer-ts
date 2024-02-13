import { AnyObject, CSSObject, CSSProperties } from "../types";
import { camelToDashed, dashedToCamel } from "./general";


export namespace OxidizerCSS {
    export type StyleSheetObject = {
        [key: string]: CSSObject | StyleSheetObject
    }
    export type CompiledStyleSheet = {
        [key: string]: CSSObject
    }
    export function parseObject(styles: CSSProperties) {
        let styleString = "";
        if (typeof styles === "string") {
            return styles;
        } else {
            for (const property in styles) {
                const value = (styles as any)[property];
                const dashedProperty = camelToDashed(property);
                styleString += `${dashedProperty}:${value};`;
            }
        }
        return styleString;
    }
    export function parseString(styles: string) {
        const styleObject: { [key: string]: string } = {};
        const split = styles.split(";");
        for (const style of split) {
            const [property, value] = style.split(":")
            const parsedProperty = dashedToCamel(property);
            styleObject[parsedProperty] = value;
        }
        return styleObject;
    }
    const formatSelector = (selector:string) => {
        selector = selector.trim();
        if (selector.startsWith("&")){
            return selector.slice(1);
        } else {
            return " " + selector;
        }
    }
    export function compile(styles: StyleSheetObject): CompiledStyleSheet {
        const flattened: AnyObject = {};
        Object.entries(styles).forEach(([key, value]) => {
            if (typeof value === "object") {
                flattened[key] = {};
                Object.entries(value).forEach(([subKey, subValue]) => {
                    if (typeof subValue === "object") {
                        Object.assign(flattened, compile({
                            [key + formatSelector(subKey)]: subValue 
                        }))
                    } else {
                        flattened[key][subKey] = subValue;
                    }
                })
            }
        })
        return flattened
    }
    
    export class StyleSheet extends Map<string, CSSObject> {
        private cssStyleSheet:CSSStyleSheet

        constructor(styles: StyleSheetObject, options?:CSSStyleSheetInit) {
            super();
            this.init(styles)
            this.cssStyleSheet = this.toStyleSheet(options);
        }

        private init(styles: StyleSheetObject) {
            const compiled = OxidizerCSS.compile(styles);
            for (const key in compiled) {
                this.set(key, compiled[key]);
            }
        }
    
        private toStyleSheet(options?:CSSStyleSheetInit){
            const stylesheet = new CSSStyleSheet(options);
            stylesheet.replaceSync(this.toString());
            return stylesheet;
        }
    
        toString(){
            const rules = []; 
            for (const [selector, styles] of this){
                rules.push(`${selector} {\n  ${Object.entries(styles).map(([key,val]) => `${camelToDashed(key)}:${val};`).join("\n  ")}\n}`)
            }
            return rules.join("\n");
        }
    
        render(){
    
        }
    }
}



export module OxidizerStyleSheet {}