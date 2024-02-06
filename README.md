# Oxidizer 
Typescript version of the Oxidizer Framework

## Installation
```bash
npm install oxidizer-ts
```
## Getting Started
```typescript
import {DIV, H1, HR, P} from "oxidizer-ts"

const root = document.body;

function App(){
    return (
        DIV({id:'app', className:'container'}, [
            H1('Hello World!'),
            HR(),
            P('This is my Hello World App')
        ])
    )
}

root.append(
    App()
);
```

## Props & State
```typescript
import { DIV, H1, P } from "../../oxidizer-ts";

interface Person {
    first:string
    last:string
}

const Info = (props:Person) => {
    return DIV({id:'info-container', props}, [
        H1('Time at Page Load: '+Date.now().toString()), // won't be rerendered
        ({first}) => P(`First Name: ${first}`),
        ({last}) => P(`Last Name: ${last}`)
    ])
}

document.body.append(
    Info({first:"John", last: "Doe"})
);

const info = document.querySelector('#info-container');

console.log(info.querySelector('p').innerText) // Output: "First Name: John"

info.props.first = "Jane";

console.log(info.querySelector('p').innerText) // Output: "First Name: Jane"
```