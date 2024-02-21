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

## Web Components
We can leverage the `Oxidizer.createElement` method and `Oxidizer.Component` class to create easily accessible web components.

*counterApp.ts*
```typescript
import Oxidizer, {H1, P, BUTTON} from "oxidizer-ts";

interface CounterAppProps {
  count: number
}

export const CounterApp = Oxidizer.createElement(
  'counter-app',
  class extends Oxidizer.Component<CounterAppProps> {
    connectedCallback(){
      console.log(this.innerHTML)
    }

    render(){
      const {props} = this;
      return [
        H1('Counter App'),
        () => P(`Count: ${props.count}`),
        BUTTON({
          onclick: () => props.count++
        },"Increment")
      ]
    }
  }
)
```
*app.ts*
```typescript
import {CounterApp} from 'counterApp';

const app = CounterApp({
    props: {count:0}
});

document.body.append(app);
```
### Passing Children
We can pass children to a component using the `Children` field.
*simpleArticle.ts*
```typescript
import Oxidizer, {H1} from "oxidizer-ts";

export const SimpleArticle = Oxidizer.createElement(
  'simple-article',
  class extends Oxidizer.Component {
    render(){
      return [
        H1('Simple Article'),
        this.Children
      ]
    }
  }  
)
```
*app.ts*
```typescript
import {P} from "oxidizer-ts";
import {SimpleArticle} from "simpleArticle"; 

const simpleArticle = SimpleArticle([
    P('This is an article!')
])

document.body.append(simpleArticle);

console.log(
    document.querySelector('simple-article')
) // [HTMLElement]
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

## Examples
```typescript
import {DIV, P, B} from 'oxidizer-ts'

const app = (
  DIV({props:{loading:true}}, (props) => {
    const {loading} = props;

    if (loading) {
      setTimeout(() => props.loading = false, 2000);
      return P(`Loading...`)
    }

    else return B(`Data!`)
  })
);

document.body.append(app);
```