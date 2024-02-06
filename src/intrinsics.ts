import { Optional, CSSProperties, AnyObject } from "./types";
import { CSSUtils } from "./utils/css";

export namespace Intrinsics {
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
    function isSubTree(x:any) : x is SubTree {
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

    export type Element<T extends HTMLElement=HTMLElement, Props=undefined>
        = T & (Props extends undefined ? {} : {props:Props})

    export type SubTree<Props> 
        = HTML
        | Element
        | (Props extends AnyObject ? ((props:Props) => SubTree<Props>) : HTML)
        | SubTree<Props>[]

    function create<T extends HTMLElement=HTMLElement, Props=undefined>(
        tagName:keyof HTMLElementTagNameMap, 
        fields?:Fields<T,Props>|SubTree<Props>, 
        subtree?:SubTree<Props>)
    {
        return Object.assign(document.createElement(tagName), {props:{}}) as Element<T,Props>;
    }

    const Elements = {
        A<Props=undefined>(
            fields?:Fields<HTMLAnchorElement, Props>, 
            subtree?:SubTree<Props>
        ) : Element<HTMLAnchorElement, Props> {
            return create<HTMLAnchorElement,Props>('a', fields, subtree);
        }
    }

    const {A} = Elements; 

    const a1 = A<{a:number}>({props: {a:123}}, [
        ({a}) => ''
    ]);

    const a2 = A<{b:string}>({href:"asd", props: {b:'asd'}}, [
        ({b}) => 'asd'
    ]);
    /* const Elements = {
        A:<T=undefined>(fields?:Fields<HTMLAnchorElement,T>|SubTree<T>, subtree?: SubTree<T>) => create<HTMLAnchorElement,T>('a', fields, subtree),
        AREA:<T=undefined>(fields?:Fields<HTMLAreaElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLAreaElement,T>
        AUDIO:<T=undefined>(fields?:Fields<HTMLAudioElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLAudioElement,T>
        ABBR:<T=undefined>(fields?:Fields<HTMLElement, T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        ADDRESS:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        ARTICLE:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        ASIDE:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        BR:<T=undefined>(fields?:Fields<HTMLBRElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLBRElement,T>
        B:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        BDI:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        BDO:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        BASE:<T=undefined>(fields?:Fields<HTMLBaseElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLBaseElement,T>
        BODY:<T=undefined>(fields?:Fields<HTMLBodyElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLBodyElement,T>
        BUTTON:<T=undefined>(fields?:Fields<HTMLButtonElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLButtonElement,T>
        CANVAS:<T=undefined>(fields?:Fields<HTMLCanvasElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLCanvasElement,T>
        CITE:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        CODE:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        COLGROUP:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        DD:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        DL:<T=undefined>(fields?:Fields<HTMLDListElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLDListElement,T>
        DATA:<T=undefined>(fields?:Fields<HTMLDataElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLDataElement,T>
        DATALIST:<T=undefined>(fields?:Fields<HTMLDataListElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLDataListElement,T>
        DETAILS:<T=undefined>(fields?:Fields<HTMLDetailsElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLDetailsElement,T>
        DIALOG:<T=undefined>(fields?:Fields<HTMLDialogElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLDialogElement,T>
        DIV:<T=undefined>(fields?:Fields<HTMLDivElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLDivElement,T>
        EM:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        EMBED:<T=undefined>(fields?:Fields<HTMLEmbedElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLEmbedElement,T>
        FIELDSET:<T=undefined>(fields?:Fields<HTMLFieldSetElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLFieldSetElement,T>
        FIGURE:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        FOOTER:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        FORM:<T=undefined>(fields?:Fields<HTMLFormElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLFormElement,T>
        HGROUP:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        HR:<T=undefined>(fields?:Fields<HTMLHRElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLHRElement,T>
        HEAD:<T=undefined>(fields?:Fields<HTMLHeadElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLHeadElement,T>
        H1:<T=undefined>(fields?:Fields<HTMLHeadingElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLHeadingElement,T>
        H2:<T=undefined>(fields?:Fields<HTMLHeadingElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLHeadingElement,T>
        H3:<T=undefined>(fields?:Fields<HTMLHeadingElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLHeadingElement,T>
        H4:<T=undefined>(fields?:Fields<HTMLHeadingElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLHeadingElement,T>
        H5:<T=undefined>(fields?:Fields<HTMLHeadingElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLHeadingElement,T>
        H6:<T=undefined>(fields?:Fields<HTMLHeadingElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLHeadingElement,T>
        HTML:<T=undefined>(fields?:Fields<HTMLHtmlElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLHtmlElement,T>
        KBD:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        INS:<T=undefined>(fields?:Fields<HTMLModElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLModElement,T>
        I:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        IFRAME:<T=undefined>(fields?:Fields<HTMLIFrameElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLIFrameElement,T>
        IMAGE:<T=undefined>(fields?:Fields<HTMLImageElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLImageElement,T>
        INPUT:<T=undefined>(fields?:Fields<HTMLInputElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLInputElement,T>
        LI:<T=undefined>(fields?:Fields<HTMLLIElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLLIElement,T>
        LABEL:<T=undefined>(fields?:Fields<HTMLLabelElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLLabelElement,T>
        LEGEND:<T=undefined>(fields?:Fields<HTMLLegendElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLLegendElement,T>
        LINK:<T=undefined>(fields?:Fields<HTMLLinkElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLLinkElement,T>
        MAP:<T=undefined>(fields?:Fields<HTMLMapElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLMapElement,T>
        MENU:<T=undefined>(fields?:Fields<HTMLMenuElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLMenuElement,T>
        MARK:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        NAV:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        NOSCRIPT:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        META:<T=undefined>(fields?:Fields<HTMLMetaElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLMetaElement,T>
        METER:<T=undefined>(fields?:Fields<HTMLMeterElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLMeterElement,T>
        DEL:<T=undefined>(fields?:Fields<HTMLModElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLModElement,T>
        OL:<T=undefined>(fields?:Fields<HTMLOListElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLOListElement,T>
        OBJECT:<T=undefined>(fields?:Fields<HTMLObjectElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLObjectElement,T>
        OPTGROUP:<T=undefined>(fields?:Fields<HTMLOptGroupElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLOptGroupElement,T>
        OPTION:<T=undefined>(fields?:Fields<HTMLOptionElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLOptionElement,T>
        OUTPUT:<T=undefined>(fields?:Fields<HTMLOutputElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLOutputElement,T>
        P:<T=undefined>(fields?:Fields<HTMLParagraphElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLParagraphElement,T>
        PICTURE:<T=undefined>(fields?:Fields<HTMLPictureElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLPictureElement,T>
        PRE:<T=undefined>(fields?:Fields<HTMLPreElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLPreElement,T>
        PROGRESS:<T=undefined>(fields?:Fields<HTMLProgressElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLProgressElement,T>
        RT:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        RP:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        RUBY:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        SMALL:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        Q:<T=undefined>(fields?:Fields<HTMLQuoteElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLQuoteElement,T>
        BLOCKQUOTE:<T=undefined>(fields?:Fields<HTMLQuoteElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLQuoteElement,T>
        SCRIPT:<T=undefined>(fields?:Fields<HTMLScriptElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLScriptElement,T>
        SELECT:<T=undefined>(fields?:Fields<HTMLSelectElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLSelectElement,T>
        SLOT:<T=undefined>(fields?:Fields<HTMLSlotElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLSlotElement,T>
        SOURCE:<T=undefined>(fields?:Fields<HTMLSourceElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLSourceElement,T>
        SPAN:<T=undefined>(fields?:Fields<HTMLSpanElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLSpanElement,T>
        STYLE:<T=undefined>(fields?:Fields<HTMLStyleElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLStyleElement,T>
        SUB:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        SUMMARY:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        SEARCH:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        SECTION:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        CAPTION:<T=undefined>(fields?:Fields<HTMLTableCaptionElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLTableCaptionElement,T>
        TH:<T=undefined>(fields?:Fields<HTMLTableCellElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLTableCellElement,T>
        TD:<T=undefined>(fields?:Fields<HTMLTableCellElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLTableCellElement,T>
        COL:<T=undefined>(fields?:Fields<HTMLTableColElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLTableColElement,T>
        TABLE:<T=undefined>(fields?:Fields<HTMLTableElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLTableElement,T>
        TR:<T=undefined>(fields?:Fields<HTMLTableRowElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLTableRowElement,T>
        THEAD:<T=undefined>(fields?:Fields<HTMLTableSectionElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLTableSectionElement,T>
        TFOOT:<T=undefined>(fields?:Fields<HTMLTableSectionElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLTableSectionElement,T>
        TBODY:<T=undefined>(fields?:Fields<HTMLTableSectionElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLTableSectionElement,T>
        TEMPLATE:<T=undefined>(fields?:Fields<HTMLTemplateElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLTemplateElement,T>
        TEXTAREA:<T=undefined>(fields?:Fields<HTMLTextAreaElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLTextAreaElement,T>
        TIME:<T=undefined>(fields?:Fields<HTMLTimeElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLTimeElement,T>
        TITLE:<T=undefined>(fields?:Fields<HTMLTitleElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLTitleElement,T>
        TRACK:<T=undefined>(fields?:Fields<HTMLTrackElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLTrackElement,T>
        U:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        UL:<T=undefined>(fields?:Fields<HTMLUListElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLUListElement,T>
        VIDEO:<T=undefined>(fields?:Fields<HTMLVideoElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLVideoElement,T>
        VAR:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
        WBR:<T=undefined>(fields?:Fields<HTMLElement,T>|SubTree<T>, subtree?:SubTree<T>) => Element<HTMLElement,T>
    } */
    
    // export const Elements:IElements = {
    //     A: (fields, subtree) => create('a', fields, subtree),
    //     AREA: (fields, subtree) => create('area', fields, subtree),
    //     AUDIO: (fields, subtree) => create('audio', fields, subtree),
    //     BR: (fields, subtree) => create('br', fields, subtree),
    //     BASE: (fields, subtree) => create('base', fields, subtree),
    //     BODY: (fields, subtree) => create('body', fields, subtree),
    //     BLOCKQUOTE: (fields, subtree) => create('blockquote', fields, subtree),
    //     BUTTON: (fields, subtree) => create('button', fields, subtree),
    //     CANVAS: (fields, subtree) => create('canvas', fields, subtree),
    //     CAPTION: (fields, subtree) => create('caption', fields, subtree),
    //     COL: (fields, subtree) => create('col', fields, subtree),
    //     DATA: (fields, subtree) => create('data', fields, subtree),
    //     DATALIST: (fields, subtree) => create('datalist', fields, subtree),
    //     DEL: (fields, subtree) => create('del', fields, subtree),
    //     DETAILS: (fields, subtree) => create('details', fields, subtree),
    //     DIALOG: (fields, subtree) => create('dialog', fields, subtree),
    //     // DIRECTORY: (fields, subtree) => create('directory', fields, subtree),
    //     DIV: (fields, subtree) => create('div', fields, subtree),
    //     DL: (fields, subtree) => create('dl', fields, subtree),
    //     EM: (fields, subtree) => create('em', fields, subtree),
    //     EMBED: (fields, subtree) => create('embed', fields, subtree),
    //     FIELDSET: (fields, subtree) => create('fieldset', fields, subtree),
    //     FORM: (fields, subtree) => create('form', fields, subtree),
    //     H1: (fields, subtree) => create('h1', fields, subtree),
    //     H2: (fields, subtree) => create('h2', fields, subtree),
    //     H3: (fields, subtree) => create('h3', fields, subtree),
    //     H4: (fields, subtree) => create('h4', fields, subtree),
    //     H5: (fields, subtree) => create('h5', fields, subtree),
    //     H6: (fields, subtree) => create('h6', fields, subtree),
    //     HEAD: (fields, subtree) => create('head', fields, subtree),
    //     HR: (fields, subtree) => create('hr', fields, subtree),
    //     HTML: (fields, subtree) => create('html', fields, subtree),
    //     IFRAME: (fields, subtree) => create('iframe', fields, subtree),
    //     IMAGE: (fields, subtree) => create('img', fields, subtree),
    //     INPUT: (fields, subtree) => create('input', fields, subtree),
    //     LABEL: (fields, subtree) => create('label', fields, subtree),
    //     LEGEND: (fields, subtree) => create('legend', fields, subtree),
    //     LI: (fields, subtree) => create('li', fields, subtree),
    //     LINK: (fields, subtree) => create('link', fields, subtree),
    //     MAP: (fields, subtree) => create('map', fields, subtree),
    //     MENU: (fields, subtree) => create('menu', fields, subtree),
    //     META: (fields, subtree) => create('meta', fields, subtree),
    //     METER: (fields, subtree) => create('meter', fields, subtree),
    //     OBJECT: (fields, subtree) => create('object', fields, subtree),
    //     OL: (fields, subtree) => create('ol', fields, subtree),
    //     OPTGROUP: (fields, subtree) => create('optgroup', fields, subtree),
    //     OPTION: (fields, subtree) => create('option', fields, subtree),
    //     OUTPUT: (fields, subtree) => create('output', fields, subtree),
    //     P: (fields, subtree) => create('p', fields, subtree),
    //     PICTURE: (fields, subtree) => create('picture', fields, subtree),
    //     PRE: (fields, subtree) => create('pre', fields, subtree),
    //     PROGRESS: (fields, subtree) => create('progress', fields, subtree),
    //     Q: (fields, subtree) => create('q', fields, subtree),
    //     SCRIPT: (fields, subtree) => create('script', fields, subtree),
    //     SELECT: (fields, subtree) => create('select', fields, subtree),
    //     SLOT: (fields, subtree) => create('slot', fields, subtree),
    //     SEARCH: (fields, subtree) => create('search', fields, subtree),
    //     SOURCE: (fields, subtree) => create('source', fields, subtree),
    //     SPAN: (fields, subtree) => create('span', fields, subtree),
    //     STYLE: (fields, subtree) => create('style', fields, subtree),
    //     TABLE: (fields, subtree) => create('table', fields, subtree),
    //     TBODY: (fields, subtree) => create('tbody', fields, subtree),
    //     TD: (fields, subtree) => create('td', fields, subtree),
    //     TEMPLATE: (fields, subtree) => create('template', fields, subtree),
    //     TEXTAREA: (fields, subtree) => create('textarea', fields, subtree),
    //     TFOOT: (fields, subtree) => create('tfoot', fields, subtree),
    //     TH: (fields, subtree) => create('th', fields, subtree),
    //     THEAD: (fields, subtree) => create('thead', fields, subtree),
    //     TIME: (fields, subtree) => create('time', fields, subtree),
    //     TITLE: (fields, subtree) => create('title', fields, subtree),
    //     TR: (fields, subtree) => create('tr', fields, subtree),
    //     TRACK: (fields, subtree) => create('track', fields, subtree),
    //     UL: (fields, subtree) => create('ul', fields, subtree),
    //     VIDEO: (fields, subtree) => create('video', fields, subtree),
    //     WBR: (fields, subtree) => create('wbr', fields, subtree),
    //     ABBR: (fields, subtree) => create('abbr', fields, subtree),
    //     ADDRESS: (fields, subtree) => create('address', fields, subtree),
    //     ARTICLE: (fields, subtree) => create('article', fields, subtree),
    //     ASIDE: (fields, subtree) => create('aside', fields, subtree),
    //     B: (fields, subtree) => create('b', fields, subtree),
    //     BDI: (fields, subtree) => create('bdi', fields, subtree),
    //     BDO: (fields, subtree) => create('bdo', fields, subtree),
    //     CITE: (fields, subtree) => create('cite', fields, subtree),
    //     CODE: (fields, subtree) => create('code', fields, subtree),
    //     COLGROUP: (fields, subtree) => create('colgroup', fields, subtree),
    //     DD: (fields, subtree) => create('dd', fields, subtree),
    //     FIGURE: (fields, subtree) => create('figure', fields, subtree),
    //     FOOTER: (fields, subtree) => create('footer', fields, subtree),
    //     HGROUP: (fields, subtree) => create('hgroup', fields, subtree),
    //     I: (fields, subtree) => create('i', fields, subtree),
    //     INS: (fields, subtree) => create('ins', fields, subtree),
    //     KBD: (fields, subtree) => create('kbd', fields, subtree),
    //     MARK: (fields, subtree) => create('mark', fields, subtree),
    //     NAV: (fields, subtree) => create('nav', fields, subtree),
    //     NOSCRIPT: (fields, subtree) => create('noscript', fields, subtree),
    //     RP: (fields, subtree) => create('rp', fields, subtree),
    //     RT: (fields, subtree) => create('rt', fields, subtree),
    //     RUBY: (fields, subtree) => create('ruby', fields, subtree),
    //     SMALL: (fields, subtree) => create('small', fields, subtree),
    //     SUB: (fields, subtree) => create('sub', fields, subtree),
    //     SUMMARY: (fields, subtree) => create('summary', fields, subtree),
    //     U: (fields, subtree) => create('u', fields, subtree),
    //     VAR: (fields, subtree) => create('var', fields, subtree),
    //     SECTION: (fields, subtree) => create('section', fields, subtree),
    // }
    // const Intrinsics:TIntrinsics = {
    //     A: (fields, subtree) => document.createElement('a') as any
    // }

    // Intrinsics.A<{a:number}>({props: {a: 1}})
}
