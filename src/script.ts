import DOM from './dom';
import colorTemperature from './colorTemperature';

const CONTROL_PICK_LIST: HTMLInputElement[] = DOM.query('#pick-options input') as HTMLInputElement[];
const TEMPLATES: Map<string, HTMLElement> = (() => {
    const templateMap: Map<string, HTMLElement> = new Map();

    for (const template of (DOM.getByClass('template') as HTMLElement[])) {
        if (!template.dataset.type) {
            console.error(`Template element has no data-type: ${template}`);
        }

        templateMap.set(template.dataset.type, template);
    }

    return templateMap;
})();
const BACKDROP = DOM.getById('backdrop');
const CONTROL_PANEL = DOM.getById('control-panel');
const TEMPERATURE_SLIDER = DOM.getById('temperature-slider') as HTMLInputElement;
const TEMPERATURE_RESET = DOM.getById('temperature-reset') as HTMLButtonElement;
const TEMPERATURE_VALUE = DOM.getById('temperature-value') as HTMLInputElement;
const BIG_BUTTON = DOM.getById('big-button');

function setBackdrop() {
    let template: string|null = null;
    for (const control of CONTROL_PICK_LIST) {
        if (control.checked) {
            template = control.value;
        }
    }

    if (!TEMPLATES.has(template)) {
        console.error(`Cannot set backdrop to unknown template type: ${template}`);
    }

    const current = BACKDROP.children[0] as HTMLElement;
    const desired = TEMPLATES.get(template);
    if (current.dataset.type === desired.dataset.type) {
        return;
    }

    BACKDROP.appendChild(desired.cloneNode(true));
    BACKDROP.removeChild(current);
}

for (const control of CONTROL_PICK_LIST) {
    if (!control.value) {
        console.error(`Control element has no value: ${control}`);
    }

    control.addEventListener('change', () => {
        setBackdrop();
    });
}
setBackdrop();

const TEMPERATURE_DEFAULT_WHITE: number = 6500;
function setColor(color: string) {
    document.documentElement.style.setProperty('--light-color', color);
}

function setColorTemperature(temperature: number = TEMPERATURE_DEFAULT_WHITE) {
    const rgb = colorTemperature(temperature);
    let color: string = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

    if (temperature === TEMPERATURE_DEFAULT_WHITE) {
        color = 'rgb(255, 255, 255)';
    }
    setColor(color);
}

TEMPERATURE_SLIDER.addEventListener('input', () => {
    const desired: number = parseInt(TEMPERATURE_SLIDER.value, 10);
    TEMPERATURE_VALUE.value = desired.toString();
    setColorTemperature(desired);
});

TEMPERATURE_RESET.addEventListener('click', () => {
    TEMPERATURE_SLIDER.value = TEMPERATURE_DEFAULT_WHITE.toString();
    TEMPERATURE_VALUE.value = TEMPERATURE_DEFAULT_WHITE.toString();
    setColorTemperature();
});

TEMPERATURE_VALUE.addEventListener('input', () => {
    const desired: number = parseInt(TEMPERATURE_VALUE.value, 10);
    TEMPERATURE_SLIDER.value = desired.toString();
    setColorTemperature(desired);
})

setColorTemperature(TEMPERATURE_DEFAULT_WHITE);

BIG_BUTTON.addEventListener('click', () => {
    CONTROL_PANEL.classList.add('hidden');
});

BACKDROP.addEventListener('click', () => {
    CONTROL_PANEL.classList.remove('hidden');
});

BACKDROP.addEventListener('mouseover', () => {
    console.log("Hovering over backdrop!");
});