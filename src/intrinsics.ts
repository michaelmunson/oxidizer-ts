import { Fields, Subtree, Check, AnyObject } from "./types";
import { CSSUtils } from "./utils/css";

interface IIntrinsics {
    A:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLAnchorElement,T>|Subtree<T>, subtree?: Subtree<T>) => HTMLAnchorElement
    AREA:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLAreaElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLAreaElement
    AUDIO:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLAudioElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLAudioElement
    ABBR:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement, T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    ADDRESS:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    ARTICLE:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    ASIDE:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    BR:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLBRElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLBRElement
    B:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    BDI:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    BDO:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    BASE:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLBaseElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLBaseElement
    BODY:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLBodyElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLBodyElement
    BUTTON:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLButtonElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLButtonElement
    CANVAS:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLCanvasElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLCanvasElement
    CITE:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    CODE:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    COLGROUP:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    DD:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    DL:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLDListElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLDListElement
    DATA:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLDataElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLDataElement
    DATALIST:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLDataListElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLDataListElement
    DETAILS:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLDetailsElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLDetailsElement
    DIALOG:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLDialogElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLDialogElement
    DIV:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLDivElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLDivElement
    EM:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    EMBED:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLEmbedElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLEmbedElement
    FIELDSET:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLFieldSetElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLFieldSetElement
    FIGURE:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    FOOTER:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    FORM:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLFormElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLFormElement
    HGROUP:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    HR:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLHRElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLHRElement
    HEAD:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLHeadElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLHeadElement
    H1:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLHeadingElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLHeadingElement
    H2:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLHeadingElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLHeadingElement
    H3:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLHeadingElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLHeadingElement
    H4:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLHeadingElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLHeadingElement
    H5:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLHeadingElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLHeadingElement
    H6:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLHeadingElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLHeadingElement
    HTML:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLHtmlElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLHtmlElement
    KBD:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    INS:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLModElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLModElement
    I:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    IFRAME:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLIFrameElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLIFrameElement
    IMAGE:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLImageElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLImageElement
    INPUT:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLInputElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLInputElement
    LI:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLLIElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLLIElement
    LABEL:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLLabelElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLLabelElement
    LEGEND:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLLegendElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLLegendElement
    LINK:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLLinkElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLLinkElement
    MAP:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLMapElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLMapElement
    MENU:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLMenuElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLMenuElement
    MARK:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    NAV:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    NOSCRIPT:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    META:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLMetaElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLMetaElement
    METER:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLMeterElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLMeterElement
    DEL:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLModElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLModElement
    OL:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLOListElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLOListElement
    OBJECT:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLObjectElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLObjectElement
    OPTGROUP:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLOptGroupElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLOptGroupElement
    OPTION:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLOptionElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLOptionElement
    OUTPUT:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLOutputElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLOutputElement
    P:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLParagraphElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLParagraphElement
    PICTURE:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLPictureElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLPictureElement
    PRE:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLPreElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLPreElement
    PROGRESS:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLProgressElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLProgressElement
    RT:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    RP:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    RUBY:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    SMALL:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    Q:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLQuoteElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLQuoteElement
    BLOCKQUOTE:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLQuoteElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLQuoteElement
    SCRIPT:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLScriptElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLScriptElement
    SELECT:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLSelectElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLSelectElement
    SLOT:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLSlotElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLSlotElement
    SOURCE:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLSourceElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLSourceElement
    SPAN:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLSpanElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLSpanElement
    STYLE:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLStyleElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLStyleElement
    SUB:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    SUMMARY:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    SEARCH:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    SECTION:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    CAPTION:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLTableCaptionElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLTableCaptionElement
    TH:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLTableCellElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLTableCellElement
    TD:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLTableCellElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLTableCellElement
    COL:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLTableColElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLTableColElement
    TABLE:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLTableElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLTableElement
    TR:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLTableRowElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLTableRowElement
    THEAD:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLTableSectionElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLTableSectionElement
    TFOOT:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLTableSectionElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLTableSectionElement
    TBODY:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLTableSectionElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLTableSectionElement
    TEMPLATE:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLTemplateElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLTemplateElement
    TEXTAREA:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLTextAreaElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLTextAreaElement
    TIME:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLTimeElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLTimeElement
    TITLE:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLTitleElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLTitleElement
    TRACK:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLTrackElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLTrackElement
    U:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    UL:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLUListElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLUListElement
    VIDEO:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLVideoElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLVideoElement
    VAR:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
    WBR:<T extends AnyObject=AnyObject>(fields?:Fields<HTMLElement,T>|Subtree<T>, subtree?:Subtree<T>) => HTMLElement
}

function handleFields(element:HTMLElement, fields:Fields<HTMLElement>){
    for (const property in fields){
        let value = (fields as any)[property];
        if (property === "style"){
            if (typeof value === "string"){
                value = CSSUtils.parseString(value);
            }
            for (const property in value){
                (element.style as any)[property] = value[property]; 
            }
        } else {
            (element as any)[property] = value;
        }
    }
}

function handleSubtree<T extends AnyObject=AnyObject>(element:HTMLElement, props:T, subtree:Subtree<T>){
    if (Array.isArray(subtree)){
        for (const subSubtree of subtree){
            handleSubtree(element, props, subSubtree)
        }
    }

    else if (typeof subtree === "function"){
        const subSubtree = subtree.call(element, props);
        console.log(subSubtree)
        if (Array.isArray(subSubtree)){
            for (const subSubSubtree of subSubtree){
                handleSubtree(element, props, subSubSubtree)
            }
        } 
        else {
            element.append(subSubtree);
        }
    }
    else {
        element.append(subtree);
    }
}

function create<T extends HTMLElement>(tagName:keyof HTMLElementTagNameMap, fields?:Fields|Subtree, subtree?:Subtree){
    const element = document.createElement(tagName);

    const _subtree = Check.isSubtree(fields) 
                    ? fields
                    : subtree;
    const _fields = Check.isFields(fields)
                    ? fields
                    : {};
    const _props = _fields.props ?? {};

    console.log("Create => ", {element, _fields, _subtree, _props}); 

    handleFields(element, _fields)
    
    if (Check.isSubtree(_subtree)){
        handleSubtree<typeof _props>(element, _props, _subtree);
    }
    
    return element as T;
}

export const Intrinsics:IIntrinsics = {
    A: (fields, subtree) => create('a', fields, subtree),
    AREA: (fields, subtree) => create('area', fields, subtree),
    AUDIO: (fields, subtree) => create('audio', fields, subtree),
    BR: (fields, subtree) => create('br', fields, subtree),
    BASE: (fields, subtree) => create('base', fields, subtree),
    BODY: (fields, subtree) => create('body', fields, subtree),
    BLOCKQUOTE: (fields, subtree) => create('blockquote', fields, subtree),
    BUTTON: (fields, subtree) => create('button', fields, subtree),
    CANVAS: (fields, subtree) => create('canvas', fields, subtree),
    CAPTION: (fields, subtree) => create('caption', fields, subtree),
    COL: (fields, subtree) => create('col', fields, subtree),
    DATA: (fields, subtree) => create('data', fields, subtree),
    DATALIST: (fields, subtree) => create('datalist', fields, subtree),
    DEL: (fields, subtree) => create('del', fields, subtree),
    DETAILS: (fields, subtree) => create('details', fields, subtree),
    DIALOG: (fields, subtree) => create('dialog', fields, subtree),
    // DIRECTORY: (fields, subtree) => create('directory', fields, subtree),
    DIV: (fields, subtree) => create('div', fields, subtree),
    DL: (fields, subtree) => create('dl', fields, subtree),
    EM: (fields, subtree) => create('em', fields, subtree),
    EMBED: (fields, subtree) => create('embed', fields, subtree),
    FIELDSET: (fields, subtree) => create('fieldset', fields, subtree),
    FORM: (fields, subtree) => create('form', fields, subtree),
    H1: (fields, subtree) => create('h1', fields, subtree),
    H2: (fields, subtree) => create('h2', fields, subtree),
    H3: (fields, subtree) => create('h3', fields, subtree),
    H4: (fields, subtree) => create('h4', fields, subtree),
    H5: (fields, subtree) => create('h5', fields, subtree),
    H6: (fields, subtree) => create('h6', fields, subtree),
    HEAD: (fields, subtree) => create('head', fields, subtree),
    HR: (fields, subtree) => create('hr', fields, subtree),
    HTML: (fields, subtree) => create('html', fields, subtree),
    IFRAME: (fields, subtree) => create('iframe', fields, subtree),
    IMAGE: (fields, subtree) => create('img', fields, subtree),
    INPUT: (fields, subtree) => create('input', fields, subtree),
    LABEL: (fields, subtree) => create('label', fields, subtree),
    LEGEND: (fields, subtree) => create('legend', fields, subtree),
    LI: (fields, subtree) => create('li', fields, subtree),
    LINK: (fields, subtree) => create('link', fields, subtree),
    MAP: (fields, subtree) => create('map', fields, subtree),
    MENU: (fields, subtree) => create('menu', fields, subtree),
    META: (fields, subtree) => create('meta', fields, subtree),
    METER: (fields, subtree) => create('meter', fields, subtree),
    OBJECT: (fields, subtree) => create('object', fields, subtree),
    OL: (fields, subtree) => create('ol', fields, subtree),
    OPTGROUP: (fields, subtree) => create('optgroup', fields, subtree),
    OPTION: (fields, subtree) => create('option', fields, subtree),
    OUTPUT: (fields, subtree) => create('output', fields, subtree),
    P: (fields, subtree) => create('p', fields, subtree),
    PICTURE: (fields, subtree) => create('picture', fields, subtree),
    PRE: (fields, subtree) => create('pre', fields, subtree),
    PROGRESS: (fields, subtree) => create('progress', fields, subtree),
    Q: (fields, subtree) => create('q', fields, subtree),
    SCRIPT: (fields, subtree) => create('script', fields, subtree),
    SELECT: (fields, subtree) => create('select', fields, subtree),
    SLOT: (fields, subtree) => create('slot', fields, subtree),
    SEARCH: (fields, subtree) => create('search', fields, subtree),
    SOURCE: (fields, subtree) => create('source', fields, subtree),
    SPAN: (fields, subtree) => create('span', fields, subtree),
    STYLE: (fields, subtree) => create('style', fields, subtree),
    TABLE: (fields, subtree) => create('table', fields, subtree),
    TBODY: (fields, subtree) => create('tbody', fields, subtree),
    TD: (fields, subtree) => create('td', fields, subtree),
    TEMPLATE: (fields, subtree) => create('template', fields, subtree),
    TEXTAREA: (fields, subtree) => create('textarea', fields, subtree),
    TFOOT: (fields, subtree) => create('tfoot', fields, subtree),
    TH: (fields, subtree) => create('th', fields, subtree),
    THEAD: (fields, subtree) => create('thead', fields, subtree),
    TIME: (fields, subtree) => create('time', fields, subtree),
    TITLE: (fields, subtree) => create('title', fields, subtree),
    TR: (fields, subtree) => create('tr', fields, subtree),
    TRACK: (fields, subtree) => create('track', fields, subtree),
    UL: (fields, subtree) => create('ul', fields, subtree),
    VIDEO: (fields, subtree) => create('video', fields, subtree),
    WBR: (fields, subtree) => create('wbr', fields, subtree),
    ABBR: (fields, subtree) => create('abbr', fields, subtree),
    ADDRESS: (fields, subtree) => create('address', fields, subtree),
    ARTICLE: (fields, subtree) => create('article', fields, subtree),
    ASIDE: (fields, subtree) => create('aside', fields, subtree),
    B: (fields, subtree) => create('b', fields, subtree),
    BDI: (fields, subtree) => create('bdi', fields, subtree),
    BDO: (fields, subtree) => create('bdo', fields, subtree),
    CITE: (fields, subtree) => create('cite', fields, subtree),
    CODE: (fields, subtree) => create('code', fields, subtree),
    COLGROUP: (fields, subtree) => create('colgroup', fields, subtree),
    DD: (fields, subtree) => create('dd', fields, subtree),
    FIGURE: (fields, subtree) => create('figure', fields, subtree),
    FOOTER: (fields, subtree) => create('footer', fields, subtree),
    HGROUP: (fields, subtree) => create('hgroup', fields, subtree),
    I: (fields, subtree) => create('i', fields, subtree),
    INS: (fields, subtree) => create('ins', fields, subtree),
    KBD: (fields, subtree) => create('kbd', fields, subtree),
    MARK: (fields, subtree) => create('mark', fields, subtree),
    NAV: (fields, subtree) => create('nav', fields, subtree),
    NOSCRIPT: (fields, subtree) => create('noscript', fields, subtree),
    RP: (fields, subtree) => create('rp', fields, subtree),
    RT: (fields, subtree) => create('rt', fields, subtree),
    RUBY: (fields, subtree) => create('ruby', fields, subtree),
    SMALL: (fields, subtree) => create('small', fields, subtree),
    SUB: (fields, subtree) => create('sub', fields, subtree),
    SUMMARY: (fields, subtree) => create('summary', fields, subtree),
    U: (fields, subtree) => create('u', fields, subtree),
    VAR: (fields, subtree) => create('var', fields, subtree),
    SECTION: (fields, subtree) => create('section', fields, subtree),
}

