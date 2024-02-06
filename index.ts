import {Intrinsics} from "./src/intrinsics";
// import {Component as OxidizerComponent} from "./src/component";

export const {
    DIV
    // A,
    // AREA,
    // AUDIO,
    // ABBR,
    // ADDRESS,
    // ARTICLE,
    // ASIDE,
    // BR,
    // B,
    // BDI,
    // BDO,
    // BASE,
    // BODY,
    // BUTTON,
    // CANVAS,
    // CITE,
    // CODE,
    // COLGROUP,
    // DD,
    // DL,
    // DATA,
    // DATALIST,
    // DETAILS,
    // DIALOG,
    // DIV,
    // EM,
    // EMBED,
    // FIELDSET,
    // FIGURE,
    // FOOTER,
    // FORM,
    // HGROUP,
    // HR,
    // HEAD,
    // H1,
    // H2,
    // H3,
    // H4,
    // H5,
    // H6,
    // HTML,
    // KBD,
    // INS,
    // I,
    // IFRAME,
    // IMAGE,
    // INPUT,
    // LI,
    // LABEL,
    // LEGEND,
    // LINK,
    // MAP,
    // MENU,
    // MARK,
    // NAV,
    // NOSCRIPT,
    // META,
    // METER,
    // DEL,
    // OL,
    // OBJECT,
    // OPTGROUP,
    // OPTION,
    // OUTPUT,
    // P,
    // PICTURE,
    // PRE,
    // PROGRESS,
    // RT,
    // RP,
    // RUBY,
    // SMALL,
    // Q,
    // BLOCKQUOTE,
    // SCRIPT,
    // SELECT,
    // SLOT,
    // SOURCE,
    // SPAN,
    // STYLE,
    // SUB,
    // SUMMARY,
    // SEARCH,
    // SECTION,
    // CAPTION,
    // TH,
    // TD,
    // COL,
    // TABLE,
    // TR,
    // THEAD,
    // TFOOT,
    // TBODY,
    // TEMPLATE,
    // TEXTAREA,
    // TIME,
    // TITLE,
    // TRACK,
    // U,
    // UL,
    // VIDEO,
    // VAR,
    // WBR  
} = Intrinsics.Elements;

namespace Oxidizer {
    export function root(element:HTMLElement){
        return Object.assign(element, {
            render(toRender:HTMLElement|HTMLElement[]){
                element.innerHTML = "";
                if (Array.isArray(toRender)){
                    element.append(...toRender);
                } else {
                    element.append(toRender);
                }
            }
        })
    }
    export class Component {

    }
    // export import Component = OxidizerComponent;
}

export default Oxidizer

