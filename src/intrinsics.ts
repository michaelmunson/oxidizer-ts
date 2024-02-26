import { Component } from "./component";
import { OxidizerRenderMap, RenderFunction } from "./engine";
import { AnyObject, CSSProperties, Optional } from "./types";
import { OxidizerCSS } from "./utils/css";

export namespace Intrinsics {
    export function isHTML(x:any) : x is HTML {
        return typeof x === "string"
            || x instanceof HTMLElement
    }
    export function isFields(x:any) : x is Fields {
        return !!x && !isChildren(x);
    }
    export function isElement(x:any) : x is Intrinsic {
        return x instanceof HTMLElement
    }
    export function isChildren<T>(x:any) : x is Children<T> {
        if (Array.isArray(x)){
            for (const y of x){
                if (!isChildren(y)){
                    return false; 
                }
            }
            return true; 
        }

        return isHTML(x)
            || isElement(x)
            || typeof x === "function"
            || x instanceof Component
    }

    export type HTML = HTMLElement | string | Text
    
    export type FieldExtension<Props=undefined>
        = (Props extends undefined ? {} : {props:Props})

    export type Fields<T extends HTMLElement=HTMLElement, Props=undefined>
        = Omit<Optional<T>, "style"> 
        & {style?:CSSProperties} 
        & FieldExtension<Props>

    export type IntrinsicAssignment<T extends HTMLElement, Props>    
        = (Props extends undefined ? {} : {props:Props})
        & {rerender(children:Children<Props>):void}

    export type Intrinsic<T extends HTMLElement=HTMLElement, Props=undefined>
        = T & IntrinsicAssignment<T,Props> 
    
    export type Children<Props> 
        = HTML
        | Intrinsic
        | (Props extends AnyObject ? ((props:Props) => HTML|Intrinsic|Intrinsic[]|Component|Component[]) : HTML)
        | Children<Props>[]

    export namespace IntrinsicProps {
        export function create<T extends HTMLElement=HTMLElement, Props extends object=object>(
            element:T, 
            props:Props
        ) : Props {
            return new Proxy(props, {
                set(target, property, newValue, receiver) {
                    // console.log("State Change: ", {target, property, newValue, receiver});
                    (target as any)[property] = newValue;
                    OxidizerRenderMap.render(element);
                    return true; 
                },
            })
        }
    }

    export function renderChildren<T extends HTMLElement=HTMLElement, Props=undefined>(element:Intrinsic<T,Props>, children:Children<Props>){
        if (Array.isArray(children)){
            children.forEach(el => renderChildren(element, el));
        }
        else if (typeof children === "function"){
            let result = children.call(
                element, 
                (element as any).props ?? undefined
            );
            if (typeof result === "string"){
                result = document.createTextNode(result);
            }
            OxidizerRenderMap.append(element, result as Intrinsic, children as any);
            renderChildren(element, result);
        }
        else if (children instanceof Component) {
            if (children.render){
                const result = children.render();
                renderChildren(element, result as Children<Props>);
            }
        }
        else {
            element.append(children);
        }

        return [...element.children]; 
    }

    export function create<T extends HTMLElement=HTMLElement, Props=undefined>(
        tagName:keyof HTMLElementTagNameMap, 
        fields:Fields<T,Props>|Children<Props>|undefined, 
        children:Children<Props>|undefined
    ){
        const _fields:Fields<T,Props> = isFields(fields) 
                                        ? fields
                                        : {} as any;
        const _children:Children<Props> = isChildren(children)
                                        ? children
                                        : isChildren(fields)
                                            ? fields
                                            : [];

        const _element = createElement(_fields);

        function createAssignment(rawElement:T, props:Props){
            const assignment:any = {
                rerender(children:Children<Props>){
                    this.innerHTML = '';
                    handleChildren(_element, children)
                }
            }
            if (props){
                assignment.props = IntrinsicProps.create<T,typeof props>(rawElement, props); 
            }
            return assignment as IntrinsicAssignment<T,Props>;
        }
        function createElement(fields:Fields<T,Props>) : Intrinsic<T,Props> {
            const rawElement:T = document.createElement(tagName) as T;
            const assignment = createAssignment(rawElement, (fields as any)?.props);
            const element:Intrinsic<T,Props> = Object.assign(rawElement, assignment) as Intrinsic<T,Props>;
            let field:keyof typeof fields;
            
            for (field in fields){
                let value:any = fields[field];
                if (field === "style"){
                    if (typeof value === "string"){
                        value = OxidizerCSS.parseString(value);
                    }
                    for (const property in value){
                        (element.style as any)[property] = value[property]; 
                    }
                } else if (field !== 'props'){
                    try {
                        element[field] = value;
                    } catch (e){
                        console.warn(e);
                    }
                }
            }

            return element;
        }
        function handleChildren(element:Intrinsic<T,Props>, children:Children<Props>){
            if (Array.isArray(children)){
                children.forEach(el => handleChildren(element, el));
            }
            else if (typeof children === "function"){
                let result = children.call(
                    element, 
                    (element as any).props ?? undefined
                );
                if (typeof result === "string"){
                    result = document.createTextNode(result);
                }
                OxidizerRenderMap.append(element, result as Intrinsic, children as any);
                handleChildren(element, result);
            }
            else if (children instanceof Component) {
                if (children.render){
                    const result = children.render();
                    handleChildren(element, result as Children<Props>);
                }
            }
            else {
                element.append(children);
            }
        }
    
        handleChildren(_element, _children);

        return _element;
    }

    export const Elements = {
        A<Props=undefined>(
            fields?:Fields<HTMLAnchorElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLAnchorElement, Props> {
            return create<HTMLAnchorElement,Props>('a', fields, children);
        },
        AREA<Props=undefined>(
            fields?:Fields<HTMLAreaElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLAreaElement, Props> {
            return create<HTMLAreaElement,Props>('area', fields, children);
        },
        AUDIO<Props=undefined>(
            fields?:Fields<HTMLAudioElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLAudioElement, Props> {
            return create<HTMLAudioElement,Props>('audio', fields, children);
        },
        ABBR<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('abbr', fields, children);
        },
        ADDRESS<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('address', fields, children);
        },
        ARTICLE<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('article', fields, children);
        },
        ASIDE<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('aside', fields, children);
        },
        BR<Props=undefined>(
            fields?:Fields<HTMLBRElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLBRElement, Props> {
            return create<HTMLBRElement,Props>('br', fields, children);
        },
        B<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('b', fields, children);
        },
        BDI<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('bdi', fields, children);
        },
        BDO<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('bdo', fields, children);
        },
        BASE<Props=undefined>(
            fields?:Fields<HTMLBaseElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLBaseElement, Props> {
            return create<HTMLBaseElement,Props>('base', fields, children);
        },
        BODY<Props=undefined>(
            fields?:Fields<HTMLBodyElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLBodyElement, Props> {
            return create<HTMLBodyElement,Props>('body', fields, children);
        },
        BUTTON<Props=undefined>(
            fields?:Fields<HTMLButtonElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLButtonElement, Props> {
            return create<HTMLButtonElement,Props>('button', fields, children);
        },
        CANVAS<Props=undefined>(
            fields?:Fields<HTMLCanvasElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLCanvasElement, Props> {
            return create<HTMLCanvasElement,Props>('canvas', fields, children);
        },
        CITE<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('cite', fields, children);
        },
        CODE<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('code', fields, children);
        },
        COLGROUP<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('colgroup', fields, children);
        },
        DD<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('dd', fields, children);
        },
        DL<Props=undefined>(
            fields?:Fields<HTMLDListElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLDListElement, Props> {
            return create<HTMLDListElement,Props>('dl', fields, children);
        },
        DATA<Props=undefined>(
            fields?:Fields<HTMLDataElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLDataElement, Props> {
            return create<HTMLDataElement,Props>('data', fields, children);
        },
        DATALIST<Props=undefined>(
            fields?:Fields<HTMLDataListElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLDataListElement, Props> {
            return create<HTMLDataListElement,Props>('datalist', fields, children);
        },
        DETAILS<Props=undefined>(
            fields?:Fields<HTMLDetailsElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLDetailsElement, Props> {
            return create<HTMLDetailsElement,Props>('details', fields, children);
        },
        DIALOG<Props=undefined>(
            fields?:Fields<HTMLDialogElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLDialogElement, Props> {
            return create<HTMLDialogElement,Props>('dialog', fields, children);
        },
        DIV<Props=undefined>(
            fields?:Fields<HTMLDivElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLDivElement, Props> {
            return create<HTMLDivElement,Props>('div', fields, children);
        },
        EM<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('em', fields, children);
        },
        EMBED<Props=undefined>(
            fields?:Fields<HTMLEmbedElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLEmbedElement, Props> {
            return create<HTMLEmbedElement,Props>('embed', fields, children);
        },
        FIELDSET<Props=undefined>(
            fields?:Fields<HTMLFieldSetElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLFieldSetElement, Props> {
            return create<HTMLFieldSetElement,Props>('fieldset', fields, children);
        },
        FIGURE<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('figure', fields, children);
        },
        FOOTER<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('footer', fields, children);
        },
        FORM<Props=undefined>(
            fields?:Fields<HTMLFormElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLFormElement, Props> {
            return create<HTMLFormElement,Props>('form', fields, children);
        },
        HGROUP<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('hgroup', fields, children);
        },
        HR<Props=undefined>(
            fields?:Fields<HTMLHRElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLHRElement, Props> {
            return create<HTMLHRElement,Props>('hr', fields, children);
        },
        HEAD<Props=undefined>(
            fields?:Fields<HTMLHeadElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLHeadElement, Props> {
            return create<HTMLHeadElement,Props>('head', fields, children);
        },
        H1<Props=undefined>(
            fields?:Fields<HTMLHeadingElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLHeadingElement, Props> {
            return create<HTMLHeadingElement,Props>('h1', fields, children);
        },
        H2<Props=undefined>(
            fields?:Fields<HTMLHeadingElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLHeadingElement, Props> {
            return create<HTMLHeadingElement,Props>('h2', fields, children);
        },
        H3<Props=undefined>(
            fields?:Fields<HTMLHeadingElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLHeadingElement, Props> {
            return create<HTMLHeadingElement,Props>('h3', fields, children);
        },
        H4<Props=undefined>(
            fields?:Fields<HTMLHeadingElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLHeadingElement, Props> {
            return create<HTMLHeadingElement,Props>('h4', fields, children);
        },
        H5<Props=undefined>(
            fields?:Fields<HTMLHeadingElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLHeadingElement, Props> {
            return create<HTMLHeadingElement,Props>('h5', fields, children);
        },
        H6<Props=undefined>(
            fields?:Fields<HTMLHeadingElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLHeadingElement, Props> {
            return create<HTMLHeadingElement,Props>('h6', fields, children);
        },
        HTML<Props=undefined>(
            fields?:Fields<HTMLHtmlElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLHtmlElement, Props> {
            return create<HTMLHtmlElement,Props>('html', fields, children);
        },
        KBD<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('kbd', fields, children);
        },
        INS<Props=undefined>(
            fields?:Fields<HTMLModElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLModElement, Props> {
            return create<HTMLModElement,Props>('ins', fields, children);
        },
        I<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('i', fields, children);
        },
        IFRAME<Props=undefined>(
            fields?:Fields<HTMLIFrameElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLIFrameElement, Props> {
            return create<HTMLIFrameElement,Props>('iframe', fields, children);
        },
        IMG<Props=undefined>(
            fields?:Fields<HTMLImageElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLImageElement, Props> {
            return create<HTMLImageElement,Props>('img', fields, children);
        },
        INPUT<Props=undefined>(
            fields?:Fields<HTMLInputElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLInputElement, Props> {
            return create<HTMLInputElement,Props>('input', fields, children);
        },
        LI<Props=undefined>(
            fields?:Fields<HTMLLIElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLLIElement, Props> {
            return create<HTMLLIElement,Props>('li', fields, children);
        },
        LABEL<Props=undefined>(
            fields?:Fields<HTMLLabelElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLLabelElement, Props> {
            return create<HTMLLabelElement,Props>('label', fields, children);
        },
        LEGEND<Props=undefined>(
            fields?:Fields<HTMLLegendElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLLegendElement, Props> {
            return create<HTMLLegendElement,Props>('legend', fields, children);
        },
        LINK<Props=undefined>(
            fields?:Fields<HTMLLinkElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLLinkElement, Props> {
            return create<HTMLLinkElement,Props>('link', fields, children);
        },
        MAP<Props=undefined>(
            fields?:Fields<HTMLMapElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLMapElement, Props> {
            return create<HTMLMapElement,Props>('map', fields, children);
        },
        MENU<Props=undefined>(
            fields?:Fields<HTMLMenuElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLMenuElement, Props> {
            return create<HTMLMenuElement,Props>('menu', fields, children);
        },
        MARK<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('mark', fields, children);
        },
        NAV<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('nav', fields, children);
        },
        NOSCRIPT<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('noscript', fields, children);
        },
        META<Props=undefined>(
            fields?:Fields<HTMLMetaElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLMetaElement, Props> {
            return create<HTMLMetaElement,Props>('meta', fields, children);
        },
        METER<Props=undefined>(
            fields?:Fields<HTMLMeterElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLMeterElement, Props> {
            return create<HTMLMeterElement,Props>('meter', fields, children);
        },
        DEL<Props=undefined>(
            fields?:Fields<HTMLModElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLModElement, Props> {
            return create<HTMLModElement,Props>('del', fields, children);
        },
        OL<Props=undefined>(
            fields?:Fields<HTMLOListElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLOListElement, Props> {
            return create<HTMLOListElement,Props>('ol', fields, children);
        },
        OBJECT<Props=undefined>(
            fields?:Fields<HTMLObjectElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLObjectElement, Props> {
            return create<HTMLObjectElement,Props>('object', fields, children);
        },
        OPTGROUP<Props=undefined>(
            fields?:Fields<HTMLOptGroupElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLOptGroupElement, Props> {
            return create<HTMLOptGroupElement,Props>('optgroup', fields, children);
        },
        OPTION<Props=undefined>(
            fields?:Fields<HTMLOptionElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLOptionElement, Props> {
            return create<HTMLOptionElement,Props>('option', fields, children);
        },
        OUTPUT<Props=undefined>(
            fields?:Fields<HTMLOutputElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLOutputElement, Props> {
            return create<HTMLOutputElement,Props>('output', fields, children);
        },
        P<Props=undefined>(
            fields?:Fields<HTMLParagraphElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLParagraphElement, Props> {
            return create<HTMLParagraphElement,Props>('p', fields, children);
        },
        PICTURE<Props=undefined>(
            fields?:Fields<HTMLPictureElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLPictureElement, Props> {
            return create<HTMLPictureElement,Props>('picture', fields, children);
        },
        PRE<Props=undefined>(
            fields?:Fields<HTMLPreElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLPreElement, Props> {
            return create<HTMLPreElement,Props>('pre', fields, children);
        },
        PROGRESS<Props=undefined>(
            fields?:Fields<HTMLProgressElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLProgressElement, Props> {
            return create<HTMLProgressElement,Props>('progress', fields, children);
        },
        RT<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('rt', fields, children);
        },
        RP<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('rp', fields, children);
        },
        RUBY<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('ruby', fields, children);
        },
        SMALL<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('small', fields, children);
        },
        Q<Props=undefined>(
            fields?:Fields<HTMLQuoteElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLQuoteElement, Props> {
            return create<HTMLQuoteElement,Props>('q', fields, children);
        },
        BLOCKQUOTE<Props=undefined>(
            fields?:Fields<HTMLQuoteElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLQuoteElement, Props> {
            return create<HTMLQuoteElement,Props>('blockquote', fields, children);
        },
        SCRIPT<Props=undefined>(
            fields?:Fields<HTMLScriptElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLScriptElement, Props> {
            return create<HTMLScriptElement,Props>('script', fields, children);
        },
        SELECT<Props=undefined>(
            fields?:Fields<HTMLSelectElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLSelectElement, Props> {
            return create<HTMLSelectElement,Props>('select', fields, children);
        },
        SLOT<Props=undefined>(
            fields?:Fields<HTMLSlotElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLSlotElement, Props> {
            return create<HTMLSlotElement,Props>('slot', fields, children);
        },
        SOURCE<Props=undefined>(
            fields?:Fields<HTMLSourceElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLSourceElement, Props> {
            return create<HTMLSourceElement,Props>('source', fields, children);
        },
        SPAN<Props=undefined>(
            fields?:Fields<HTMLSpanElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLSpanElement, Props> {
            return create<HTMLSpanElement,Props>('span', fields, children);
        },
        STYLE<Props=undefined>(
            styles?:OxidizerCSS.StyleSheetObject|string
        ) : Intrinsic<HTMLStyleElement, Props> {
            let children:string;
            if (typeof styles === "string"){
                children = styles;
            } else {
                children = OxidizerCSS.stringify(styles ?? {}); 
            }
            return create<HTMLStyleElement,Props>('style', {} as any, children);
        },
        SUB<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('sub', fields, children);
        },
        SUMMARY<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('summary', fields, children);
        },
        SEARCH<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('search' as any, fields, children);
        },
        SECTION<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('section', fields, children);
        },
        CAPTION<Props=undefined>(
            fields?:Fields<HTMLTableCaptionElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLTableCaptionElement, Props> {
            return create<HTMLTableCaptionElement,Props>('caption', fields, children);
        },
        TH<Props=undefined>(
            fields?:Fields<HTMLTableCellElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLTableCellElement, Props> {
            return create<HTMLTableCellElement,Props>('th', fields, children);
        },
        TD<Props=undefined>(
            fields?:Fields<HTMLTableCellElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLTableCellElement, Props> {
            return create<HTMLTableCellElement,Props>('td', fields, children);
        },
        COL<Props=undefined>(
            fields?:Fields<HTMLTableColElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLTableColElement, Props> {
            return create<HTMLTableColElement,Props>('col', fields, children);
        },
        TABLE<Props=undefined>(
            fields?:Fields<HTMLTableElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLTableElement, Props> {
            return create<HTMLTableElement,Props>('table', fields, children);
        },
        TR<Props=undefined>(
            fields?:Fields<HTMLTableRowElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLTableRowElement, Props> {
            return create<HTMLTableRowElement,Props>('tr', fields, children);
        },
        THEAD<Props=undefined>(
            fields?:Fields<HTMLTableSectionElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLTableSectionElement, Props> {
            return create<HTMLTableSectionElement,Props>('thead', fields, children);
        },
        TFOOT<Props=undefined>(
            fields?:Fields<HTMLTableSectionElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLTableSectionElement, Props> {
            return create<HTMLTableSectionElement,Props>('tfoot', fields, children);
        },
        TBODY<Props=undefined>(
            fields?:Fields<HTMLTableSectionElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLTableSectionElement, Props> {
            return create<HTMLTableSectionElement,Props>('tbody', fields, children);
        },
        TEMPLATE<Props=undefined>(
            fields?:Fields<HTMLTemplateElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLTemplateElement, Props> {
            return create<HTMLTemplateElement,Props>('template', fields, children);
        },
        TEXTAREA<Props=undefined>(
            fields?:Fields<HTMLTextAreaElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLTextAreaElement, Props> {
            return create<HTMLTextAreaElement,Props>('textarea', fields, children);
        },
        TIME<Props=undefined>(
            fields?:Fields<HTMLTimeElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLTimeElement, Props> {
            return create<HTMLTimeElement,Props>('time', fields, children);
        },
        TITLE<Props=undefined>(
            fields?:Fields<HTMLTitleElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLTitleElement, Props> {
            return create<HTMLTitleElement,Props>('title', fields, children);
        },
        TRACK<Props=undefined>(
            fields?:Fields<HTMLTrackElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLTrackElement, Props> {
            return create<HTMLTrackElement,Props>('track', fields, children);
        },
        U<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('u', fields, children);
        },
        UL<Props=undefined>(
            fields?:Fields<HTMLUListElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLUListElement, Props> {
            return create<HTMLUListElement,Props>('ul', fields, children);
        },
        VIDEO<Props=undefined>(
            fields?:Fields<HTMLVideoElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLVideoElement, Props> {
            return create<HTMLVideoElement,Props>('video', fields, children);
        },
        VAR<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('var', fields, children);
        },
        WBR<Props=undefined>(
            fields?:Fields<HTMLElement, Props>|Children<Props>, 
            children?:Children<Props>
        ) : Intrinsic<HTMLElement, Props> {
            return create<HTMLElement,Props>('wbr', fields, children);
        },
    } as const;
}
