function grab() {
    if(this._workContext instanceof Ci.nsIDOMWindow)
        var window = this._workContext;
    else
        throw new Error('Not in a window.');

    var prevTitle = window.top.title;
    var prevEl, prevColor;
    function onOver(event) {
        var curEl = event.target;

        window.top.title =
            '<' + curEl.nodeName + '> in ' + curEl.ownerDocument.location.href;

        if(prevEl)
            prevEl.style.backgroundColor = prevColor;

        prevEl = curEl;
        prevColor = curEl.style.backgroundColor;

        curEl.style.backgroundColor = '#E6E5C8';
    };

    var repl = this;
    function onClick(event) {
        result.event = event;
        repl.highlight(event.target);
        event.stopPropagation();
        finished();
    };

    function finished() {
        window.document.removeEventListener('click', onClick, true);
        window.document.removeEventListener('mouseover', onOver, true);
        prevEl.style.backgroundColor = prevColor;
        window.top.title = prevTitle;
    }

    var result = {};
    window.document.addEventListener('click', onClick, true);
    window.document.addEventListener('mouseover', onOver, true);
    return result;
}
