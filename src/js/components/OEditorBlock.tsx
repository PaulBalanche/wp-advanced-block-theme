export default class OEditorBlock {
    _blockInstance;

    constructor(blockInstance) {
        this._blockInstance = blockInstance;
        document.location.hash = `${this._blockInstance.getId()}`;
    }

    renderTitle() {
        return this._blockInstance.renderTitle?.();
    }

    renderTools() {
        return this._blockInstance.renderTools?.();
    }

    renderFooter() {
        return this._blockInstance.renderFooter?.();
    }

    render() {
        const render = [];
        return render;
    }

    getExtraClassName() {
        var className = "block";

        if (this._blockInstance.isReusable()) {
            className += " is-reusable";
        }

        return className;
    }
}
