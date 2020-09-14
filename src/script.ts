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
const CONTROL_PANEL = DOM.getById('control-panel');
const BIG_BUTTON = DOM.getById('big-button');

function setBackdrop(template: string) {
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
        setBackdrop(control.dataset.type);
    });
}

BIG_BUTTON.addEventListener('click', () => {
    CONTROL_PANEL.classList.add('hidden');
});

BACKDROP.addEventListener('click', () => {
    CONTROL_PANEL.classList.remove('hidden');
});

BACKDROP.addEventListener('mouseover', () => {
    console.log("Hovering over backdrop!");
});