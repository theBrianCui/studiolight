export default {
    getById: (id: string): HTMLElement => {
        return document.getElementById(id);
    },
    getByClass: (className: string): Element[] => {
        return Array.from(document.getElementsByClassName(className));
    },
    query: (query: string): Element[] => {
        return Array.from(document.querySelectorAll(query));
    },
    getChildren: (element: Element): Element[] => {
        return Array.from(element.children);
    }
}
