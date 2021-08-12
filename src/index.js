import Core from './lib/index.js';

export const define = (name, module, options = {}) => {
    if (!name) {
        return;
    }
    if (!module) {
        return;
    }
    let core = new Core({
        name,
        module,
        options
    });
    core.init();
};
