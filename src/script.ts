import {DOM} from './dom';

const CONTROL_LIST: HTMLElement[] = DOM.getChildren(DOM.getById('control-pick-type')) as HTMLElement[];
const TEMPLATES: Map<string, HTMLElement> = (() => {
    const templateMap: Map<string, HTMLElement> = new Map();

    for (const template of (DOM.getChildren(DOM.getById('templates')) as HTMLElement[])) {
        if (!template.dataset.type) {
            console.error(`Template element has no data-type: ${template}`);
        }

        templateMap.set(template.dataset.type, template);
    }

    return templateMap;
})();
const BACKDROP = DOM.getById('backdrop');

function toggleBackdrop(template: string) {
    if (!TEMPLATES.has(template)) {
        console.error(`Cannot set backdrop to unknown template type: ${template}`);
    }

    BACKDROP.appendChild(TEMPLATES.get(template).cloneNode(true));
    BACKDROP.removeChild(BACKDROP.children[0]);
}

for (const control of CONTROL_LIST) {
    if (!control.dataset.type) {
        console.error(`Control element has no data-type: ${control}`);
    }

    control.addEventListener('click', () => {
        toggleBackdrop(control.dataset.type);
    });
}
