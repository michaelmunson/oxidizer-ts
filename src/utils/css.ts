import { CSSProperties, Check } from "../types";
import { camelToDashed, dashedToCamel } from "./general";

export namespace CSSUtils {
    export function parseObject(styles:CSSProperties){
        let styleString = "";
        if (typeof styles === "string"){
            return styles;
        } else {
            for (const property in styles){
                const value = (styles as any)[property];
                const dashedProperty = camelToDashed(property);
                styleString+=`${dashedProperty}:${value};`;
            }
        }
        return styleString;
    }
    export function parseString(styles:string){
        const styleObject:{[key:string]:string} = {}; 
        const split = styles.split(";");
        for (const style of split){
            const [property,value] = style.split(":")
            const parsedProperty = dashedToCamel(property);
            styleObject[parsedProperty] = value; 
        }
        return styleObject; 
    }
}