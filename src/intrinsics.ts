import { DivElementProps, ElementEvent, InputElementProps } from "./types/intrinsicTypes";

export function Input(props?:InputElementProps, subtree?:HTMLElement) {
    
}

const el = document.createElement('a'); 

const div = Input({onclick: (e:ElementEvent<HTMLInputElement>) => {
    const {target} = e; 
    if (target) console.log(target.value);
}})

