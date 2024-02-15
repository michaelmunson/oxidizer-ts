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
import { DIV, H1, P } from "oxidizer-ts";

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

*simple counter app*
```typescript
import Oxidizer, { BUTTON, DIV, P } from "oxidizer-ts";

const ButtonGroup = (children:Oxidizer.HTML[]) => {
  return (
    DIV({style:{ display:"flex" }}, [
      children
    ])
  )
}

const counterApp = () => {
  return (
    DIV({props:{count:0}}, props => [
      P(`Count: ${props.count}`),
      ButtonGroup([
        BUTTON(
          {onclick(){props.count++}},
          "Increment"
        ),
        BUTTON(
          {onclick(){props.count--}},
          "Decrement"
        ),
      ])
    ])
  )
}

document.body.prepend(
  counterApp()
);
```

## Components 
*CounterApp.ts*
```typescript
import Oxidizer, { BUTTON, DIV, P } from "../../oxidizer-ts";

interface CounterProps {
	count: number
}

export class CounterApp extends Oxidizer.Component<CounterProps> {
	render() {
		return ((props) => [
				P(`Count: ${props.count}`),
				DIV({ style: { display: "flex" } }, [
					BUTTON(
						{ onclick() { props.count++ } },
						"Increment"
					),
					BUTTON(
						{ onclick() { props.count-- } },
						"Decrement"
					),
				])
		])
	}

	connectedCallback(this: HTMLElement): void {
		console.log(`${this.tagName} Connected`)
	}
}
```
*index.ts*
```typescript
import {CounterApp} from "./Counter"
/* 
cannot render app directly,
it needs to be nested within an intrinsic
*/
document.body.prepend(
  DIV({id:'app'}, [
    new CounterApp({props: {count: 0}})
  ])
)
```
Components can be rendered directly by first creating a "Root"
```typescript
import Oxidizer from "oxidizer-ts"
import {CounterApp} from "./Counter"

const root = Oxidizer.root(document.body); 

root.render(
  new CounterApp({props: {count: 0}})
);

```

## CSS
```typescript
import Oxidizer from "oxidizer-ts";

const stylesheet = new Oxidizer.StyleSheet({
  'body' : {
    background: 'black',
    '#app' : {
      background: 'green',
      'p' : {
        color:'red',
      }
    }
  }
});

stylesheet.adopt();
```

