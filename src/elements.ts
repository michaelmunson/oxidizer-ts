import { Optional, CSSProperties, AnyObject } from "./types";
import { CSSUtils } from "./utils/css";

export namespace Elements {
    function isHTML(x:any) : x is HTML {
        return typeof x === "string"
            || x instanceof HTMLElement
    }
    function isFields(x:any) : x is Fields {
        return true;
    }
    function isElement(x:any) : x is Element {
        return x instanceof HTMLElement
    }
    function isSubTree<T>(x:any) : x is SubTree<T> {
        if (Array.isArray(x)){
            for (const y of x){
                if (!isSubTree(y)){
                    return false; 
                }
            }
            return true; 
        }

        return isHTML(x)
            || isElement(x)
            || typeof x === "function"
    }

    export type HTML = HTMLElement | string
    
    export type FieldExtension<Props=undefined> 
        = (Props extends undefined ? {} : {props:Props})

    export type Fields<T extends HTMLElement=HTMLElement, Props=undefined>
        = Omit<Optional<T>, "style"> 
        & {style?:CSSProperties} 
        & FieldExtension<Props>

    export type ElementAssignment<Props>    
        = (Props extends undefined ? {} : {props:Props})
        & {render:() => void}

    export type Element<T extends HTMLElement=HTMLElement, Props=undefined>
        = T & ElementAssignment<Props> 

    export type SubTree<Props> 
        = HTML
        | Element
        | (Props extends AnyObject ? ((props:Props) => HTML|Element|Element[]) : HTML)
        | SubTree<Props>[]

    export namespace ElementProps {
        export function create<T extends HTMLElement=HTMLElement, Props extends object=object>(element:T, props:Props) : Props {
            return new Proxy(props, {
                set(target, property, newValue, receiver) {
                    console.log("State Change: ", {target, property, newValue, receiver}); 
                    (target as any)[property] = newValue;
                    return true; 
                },
            })
        }
    }

    export function create<T extends HTMLElement=HTMLElement, Props=undefined>(
        tagName:keyof HTMLElementTagNameMap, 
        fields?:Fields<T,Props>|SubTree<Props>, 
        subtree?:SubTree<Props>)
    {
        function createAssignment(rawElement:T, props:Props){
            const assignment:any = {
                render() {
                    
                },
            }
            if (props){
                assignment.props = ElementProps.create<T,typeof props>(rawElement, props); 
            }
            return assignment as ElementAssignment<Props>;
        }
        function createElement(fields:Fields<T,Props>) : Element<T,Props> {
            const rawElement:T = document.createElement(tagName) as T;
            const assignment = createAssignment(rawElement, (fields as any).props);
            const element:Element<T,Props> = Object.assign(rawElement, assignment) as Element<T,Props>;
            let field:keyof typeof fields;
            
            for (field in fields){
                let value:any = fields[field];
                if (field === "style"){
                    if (typeof value === "string"){
                        value = CSSUtils.parseString(value);
                    }
                    for (const property in value){
                        (element.style as any)[property] = value[property]; 
                    }
                } else if (field !== 'props'){
                    element[field] = value;
                }
            }

            return element;
        }
        function handleSubTree(element:Element<T,Props>, subtree:SubTree<Props>){
            if (Array.isArray(subtree)){
                subtree.forEach(el => handleSubTree(element, el));
            }
            else if (typeof subtree === "function"){
                const result = subtree.call(element,(element as any).props ?? {});
                handleSubTree(element, result);
            } 
            else {
                element.append(subtree);
            }
        }
        const _fields:Fields<T,Props> = isFields(fields) 
                                        ? fields
                                        : {} as any;
        const _subtree:SubTree<Props> = isSubTree(subtree)
                                        ? subtree
                                        : isSubTree(fields)
                                            ? fields
                                            : [];
        const _element = createElement(_fields);

        handleSubTree(_element, _subtree);

        return _element;
    }

    export const Intrinsics = {
        A<Props=undefined>(
            fields?:Fields<HTMLAnchorElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLAnchorElement, Props> {
            return create<HTMLAnchorElement,Props>('a', fields, subtree);
        },
        AREA<Props=undefined>(
            fields?:Fields<HTMLAreaElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLAreaElement, Props> {
            return create<HTMLAreaElement,Props>('area', fields, subtree);
        },
        AUDIO<Props=undefined>(
            fields?:Fields<HTMLAudioElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLAudioElement, Props> {
            return create<HTMLAudioElement,Props>('audio', fields, subtree);
        },
        ABBR<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('abbr', fields, subtree);
        },
        ADDRESS<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('address', fields, subtree);
        },
        ARTICLE<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('article', fields, subtree);
        },
        ASIDE<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('aside', fields, subtree);
        },
        BR<Props=undefined>(
            fields?:Fields<HTMLBRElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLBRElement, Props> {
            return create<HTMLBRElement,Props>('br', fields, subtree);
        },
        B<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('b', fields, subtree);
        },
        BDI<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('bdi', fields, subtree);
        },
        BDO<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('bdo', fields, subtree);
        },
        BASE<Props=undefined>(
            fields?:Fields<HTMLBaseElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLBaseElement, Props> {
            return create<HTMLBaseElement,Props>('base', fields, subtree);
        },
        BODY<Props=undefined>(
            fields?:Fields<HTMLBodyElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLBodyElement, Props> {
            return create<HTMLBodyElement,Props>('body', fields, subtree);
        },
        BUTTON<Props=undefined>(
            fields?:Fields<HTMLButtonElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLButtonElement, Props> {
            return create<HTMLButtonElement,Props>('button', fields, subtree);
        },
        CANVAS<Props=undefined>(
            fields?:Fields<HTMLCanvasElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLCanvasElement, Props> {
            return create<HTMLCanvasElement,Props>('canvas', fields, subtree);
        },
        CITE<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('cite', fields, subtree);
        },
        CODE<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('code', fields, subtree);
        },
        COLGROUP<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('colgroup', fields, subtree);
        },
        DD<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('dd', fields, subtree);
        },
        DL<Props=undefined>(
            fields?:Fields<HTMLDListElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLDListElement, Props> {
            return create<HTMLDListElement,Props>('dl', fields, subtree);
        },
        DATA<Props=undefined>(
            fields?:Fields<HTMLDataElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLDataElement, Props> {
            return create<HTMLDataElement,Props>('data', fields, subtree);
        },
        DATALIST<Props=undefined>(
            fields?:Fields<HTMLDataListElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLDataListElement, Props> {
            return create<HTMLDataListElement,Props>('datalist', fields, subtree);
        },
        DETAILS<Props=undefined>(
            fields?:Fields<HTMLDetailsElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLDetailsElement, Props> {
            return create<HTMLDetailsElement,Props>('details', fields, subtree);
        },
        DIALOG<Props=undefined>(
            fields?:Fields<HTMLDialogElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLDialogElement, Props> {
            return create<HTMLDialogElement,Props>('dialog', fields, subtree);
        },
        DIV<Props=undefined>(
            fields?:Fields<HTMLDivElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLDivElement, Props> {
            return create<HTMLDivElement,Props>('div', fields, subtree);
        },
        EM<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('em', fields, subtree);
        },
        EMBED<Props=undefined>(
            fields?:Fields<HTMLEmbedElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLEmbedElement, Props> {
            return create<HTMLEmbedElement,Props>('embed', fields, subtree);
        },
        FIELDSET<Props=undefined>(
            fields?:Fields<HTMLFieldSetElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLFieldSetElement, Props> {
            return create<HTMLFieldSetElement,Props>('fieldset', fields, subtree);
        },
        FIGURE<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('figure', fields, subtree);
        },
        FOOTER<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('footer', fields, subtree);
        },
        FORM<Props=undefined>(
            fields?:Fields<HTMLFormElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLFormElement, Props> {
            return create<HTMLFormElement,Props>('form', fields, subtree);
        },
        HGROUP<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('hgroup', fields, subtree);
        },
        HR<Props=undefined>(
            fields?:Fields<HTMLHRElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLHRElement, Props> {
            return create<HTMLHRElement,Props>('hr', fields, subtree);
        },
        HEAD<Props=undefined>(
            fields?:Fields<HTMLHeadElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLHeadElement, Props> {
            return create<HTMLHeadElement,Props>('head', fields, subtree);
        },
        H1<Props=undefined>(
            fields?:Fields<HTMLHeadingElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLHeadingElement, Props> {
            return create<HTMLHeadingElement,Props>('h1', fields, subtree);
        },
        H2<Props=undefined>(
            fields?:Fields<HTMLHeadingElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLHeadingElement, Props> {
            return create<HTMLHeadingElement,Props>('h2', fields, subtree);
        },
        H3<Props=undefined>(
            fields?:Fields<HTMLHeadingElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLHeadingElement, Props> {
            return create<HTMLHeadingElement,Props>('h3', fields, subtree);
        },
        H4<Props=undefined>(
            fields?:Fields<HTMLHeadingElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLHeadingElement, Props> {
            return create<HTMLHeadingElement,Props>('h4', fields, subtree);
        },
        H5<Props=undefined>(
            fields?:Fields<HTMLHeadingElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLHeadingElement, Props> {
            return create<HTMLHeadingElement,Props>('h5', fields, subtree);
        },
        H6<Props=undefined>(
            fields?:Fields<HTMLHeadingElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLHeadingElement, Props> {
            return create<HTMLHeadingElement,Props>('h6', fields, subtree);
        },
        HTML<Props=undefined>(
            fields?:Fields<HTMLHtmlElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLHtmlElement, Props> {
            return create<HTMLHtmlElement,Props>('html', fields, subtree);
        },
        KBD<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('kbd', fields, subtree);
        },
        INS<Props=undefined>(
            fields?:Fields<HTMLModElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLModElement, Props> {
            return create<HTMLModElement,Props>('ins', fields, subtree);
        },
        I<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('i', fields, subtree);
        },
        IFRAME<Props=undefined>(
            fields?:Fields<HTMLIFrameElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLIFrameElement, Props> {
            return create<HTMLIFrameElement,Props>('iframe', fields, subtree);
        },
        IMG<Props=undefined>(
            fields?:Fields<HTMLImageElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLImageElement, Props> {
            return create<HTMLImageElement,Props>('img', fields, subtree);
        },
        INPUT<Props=undefined>(
            fields?:Fields<HTMLInputElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLInputElement, Props> {
            return create<HTMLInputElement,Props>('input', fields, subtree);
        },
        LI<Props=undefined>(
            fields?:Fields<HTMLLIElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLLIElement, Props> {
            return create<HTMLLIElement,Props>('li', fields, subtree);
        },
        LABEL<Props=undefined>(
            fields?:Fields<HTMLLabelElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLLabelElement, Props> {
            return create<HTMLLabelElement,Props>('label', fields, subtree);
        },
        LEGEND<Props=undefined>(
            fields?:Fields<HTMLLegendElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLLegendElement, Props> {
            return create<HTMLLegendElement,Props>('legend', fields, subtree);
        },
        LINK<Props=undefined>(
            fields?:Fields<HTMLLinkElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLLinkElement, Props> {
            return create<HTMLLinkElement,Props>('link', fields, subtree);
        },
        MAP<Props=undefined>(
            fields?:Fields<HTMLMapElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLMapElement, Props> {
            return create<HTMLMapElement,Props>('map', fields, subtree);
        },
        MENU<Props=undefined>(
            fields?:Fields<HTMLMenuElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLMenuElement, Props> {
            return create<HTMLMenuElement,Props>('menu', fields, subtree);
        },
        MARK<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('mark', fields, subtree);
        },
        NAV<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('nav', fields, subtree);
        },
        NOSCRIPT<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('noscript', fields, subtree);
        },
        META<Props=undefined>(
            fields?:Fields<HTMLMetaElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLMetaElement, Props> {
            return create<HTMLMetaElement,Props>('meta', fields, subtree);
        },
        METER<Props=undefined>(
            fields?:Fields<HTMLMeterElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLMeterElement, Props> {
            return create<HTMLMeterElement,Props>('meter', fields, subtree);
        },
        DEL<Props=undefined>(
            fields?:Fields<HTMLModElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLModElement, Props> {
            return create<HTMLModElement,Props>('del', fields, subtree);
        },
        OL<Props=undefined>(
            fields?:Fields<HTMLOListElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLOListElement, Props> {
            return create<HTMLOListElement,Props>('ol', fields, subtree);
        },
        OBJECT<Props=undefined>(
            fields?:Fields<HTMLObjectElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLObjectElement, Props> {
            return create<HTMLObjectElement,Props>('object', fields, subtree);
        },
        OPTGROUP<Props=undefined>(
            fields?:Fields<HTMLOptGroupElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLOptGroupElement, Props> {
            return create<HTMLOptGroupElement,Props>('optgroup', fields, subtree);
        },
        OPTION<Props=undefined>(
            fields?:Fields<HTMLOptionElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLOptionElement, Props> {
            return create<HTMLOptionElement,Props>('option', fields, subtree);
        },
        OUTPUT<Props=undefined>(
            fields?:Fields<HTMLOutputElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLOutputElement, Props> {
            return create<HTMLOutputElement,Props>('output', fields, subtree);
        },
        P<Props=undefined>(
            fields?:Fields<HTMLParagraphElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLParagraphElement, Props> {
            return create<HTMLParagraphElement,Props>('p', fields, subtree);
        },
        PICTURE<Props=undefined>(
            fields?:Fields<HTMLPictureElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLPictureElement, Props> {
            return create<HTMLPictureElement,Props>('picture', fields, subtree);
        },
        PRE<Props=undefined>(
            fields?:Fields<HTMLPreElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLPreElement, Props> {
            return create<HTMLPreElement,Props>('pre', fields, subtree);
        },
        PROGRESS<Props=undefined>(
            fields?:Fields<HTMLProgressElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLProgressElement, Props> {
            return create<HTMLProgressElement,Props>('progress', fields, subtree);
        },
        RT<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('rt', fields, subtree);
        },
        RP<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('rp', fields, subtree);
        },
        RUBY<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('ruby', fields, subtree);
        },
        SMALL<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('small', fields, subtree);
        },
        Q<Props=undefined>(
            fields?:Fields<HTMLQuoteElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLQuoteElement, Props> {
            return create<HTMLQuoteElement,Props>('q', fields, subtree);
        },
        BLOCKQUOTE<Props=undefined>(
            fields?:Fields<HTMLQuoteElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLQuoteElement, Props> {
            return create<HTMLQuoteElement,Props>('blockquote', fields, subtree);
        },
        SCRIPT<Props=undefined>(
            fields?:Fields<HTMLScriptElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLScriptElement, Props> {
            return create<HTMLScriptElement,Props>('script', fields, subtree);
        },
        SELECT<Props=undefined>(
            fields?:Fields<HTMLSelectElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLSelectElement, Props> {
            return create<HTMLSelectElement,Props>('select', fields, subtree);
        },
        SLOT<Props=undefined>(
            fields?:Fields<HTMLSlotElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLSlotElement, Props> {
            return create<HTMLSlotElement,Props>('slot', fields, subtree);
        },
        SOURCE<Props=undefined>(
            fields?:Fields<HTMLSourceElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLSourceElement, Props> {
            return create<HTMLSourceElement,Props>('source', fields, subtree);
        },
        SPAN<Props=undefined>(
            fields?:Fields<HTMLSpanElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLSpanElement, Props> {
            return create<HTMLSpanElement,Props>('span', fields, subtree);
        },
        STYLE<Props=undefined>(
            fields?:Fields<HTMLStyleElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLStyleElement, Props> {
            return create<HTMLStyleElement,Props>('style', fields, subtree);
        },
        SUB<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('sub', fields, subtree);
        },
        SUMMARY<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('summary', fields, subtree);
        },
        SEARCH<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('search', fields, subtree);
        },
        SECTION<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('section', fields, subtree);
        },
        CAPTION<Props=undefined>(
            fields?:Fields<HTMLTableCaptionElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLTableCaptionElement, Props> {
            return create<HTMLTableCaptionElement,Props>('caption', fields, subtree);
        },
        TH<Props=undefined>(
            fields?:Fields<HTMLTableCellElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLTableCellElement, Props> {
            return create<HTMLTableCellElement,Props>('th', fields, subtree);
        },
        TD<Props=undefined>(
            fields?:Fields<HTMLTableCellElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLTableCellElement, Props> {
            return create<HTMLTableCellElement,Props>('td', fields, subtree);
        },
        COL<Props=undefined>(
            fields?:Fields<HTMLTableColElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLTableColElement, Props> {
            return create<HTMLTableColElement,Props>('col', fields, subtree);
        },
        TABLE<Props=undefined>(
            fields?:Fields<HTMLTableElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLTableElement, Props> {
            return create<HTMLTableElement,Props>('table', fields, subtree);
        },
        TR<Props=undefined>(
            fields?:Fields<HTMLTableRowElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLTableRowElement, Props> {
            return create<HTMLTableRowElement,Props>('tr', fields, subtree);
        },
        THEAD<Props=undefined>(
            fields?:Fields<HTMLTableSectionElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLTableSectionElement, Props> {
            return create<HTMLTableSectionElement,Props>('thead', fields, subtree);
        },
        TFOOT<Props=undefined>(
            fields?:Fields<HTMLTableSectionElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLTableSectionElement, Props> {
            return create<HTMLTableSectionElement,Props>('tfoot', fields, subtree);
        },
        TBODY<Props=undefined>(
            fields?:Fields<HTMLTableSectionElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLTableSectionElement, Props> {
            return create<HTMLTableSectionElement,Props>('tbody', fields, subtree);
        },
        TEMPLATE<Props=undefined>(
            fields?:Fields<HTMLTemplateElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLTemplateElement, Props> {
            return create<HTMLTemplateElement,Props>('template', fields, subtree);
        },
        TEXTAREA<Props=undefined>(
            fields?:Fields<HTMLTextAreaElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLTextAreaElement, Props> {
            return create<HTMLTextAreaElement,Props>('textarea', fields, subtree);
        },
        TIME<Props=undefined>(
            fields?:Fields<HTMLTimeElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLTimeElement, Props> {
            return create<HTMLTimeElement,Props>('time', fields, subtree);
        },
        TITLE<Props=undefined>(
            fields?:Fields<HTMLTitleElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLTitleElement, Props> {
            return create<HTMLTitleElement,Props>('title', fields, subtree);
        },
        TRACK<Props=undefined>(
            fields?:Fields<HTMLTrackElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLTrackElement, Props> {
            return create<HTMLTrackElement,Props>('track', fields, subtree);
        },
        U<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('u', fields, subtree);
        },
        UL<Props=undefined>(
            fields?:Fields<HTMLUListElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLUListElement, Props> {
            return create<HTMLUListElement,Props>('ul', fields, subtree);
        },
        VIDEO<Props=undefined>(
            fields?:Fields<HTMLVideoElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLVideoElement, Props> {
            return create<HTMLVideoElement,Props>('video', fields, subtree);
        },
        VAR<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('var', fields, subtree);
        },
        WBR<Props=undefined>(
            fields?:Fields<HTMLElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLElement, Props> {
            return create<HTMLElement,Props>('wbr', fields, subtree);
        },
    } as const;
}
