function createPage({title, sections}) {
    const header = createElement( {type: 'div', parent: document.body});
    const headerStyle = {
        backgroundColor: variables.backgroundColor,
        overflow: 'auto'
    };
    styleElement({element: header, styleObject: headerStyle});

    const h1 = createElement({type: 'h1', parent: header, text: 'Variables'});
    const h1Style = {
        textAlign: 'center'
    };
    styleElement({element: h1, styleObject: h1Style});

    const sectionWrapper = createElement( {type: 'div', parent: document.body, classes: ['flex-wrap']});

    sections.forEach( section => {
       const sectionNode = createElement({type: 'div', parent: sectionWrapper, classes: ['link-list'] });
       const title = createElement({type: 'h3', parent: sectionNode, text: section.title})
        section.lines.forEach( line => {
            createElement({type: 'div', parent: sectionNode, text: line.text, html: line.html})
        })
    });
}

