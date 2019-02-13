const variablesPage = {
  title: 'Variables',

  sections: [
      {title: 'keywords', lines: [
              {text: '<span class="example special">var</span>', html: true},
              {text: '<span class="example special">let</span>', html: true},
              {text: '<span class="example special">const</span>', html: true},
              {text: 'use a keyword to declare a variable.', html: true}
          ]},
      {title: 'declare', lines: [
              {text: '<span class="example"><span class="special">var</span> name = "vinson"; </span>', html: true},
              {text: '<span class="example"><span class="special">let</span> name = "vinson"; </span>', html: true},
              {text: '<span class="example"><span class="special">const</span> name = "vinson"; </span>', html: true},
              {text: 'declared exactly the same but act differently.', html: true},
          ]},
      {title: 'var', lines: [
              {text: 'is re-declarable', html: true},
              {text: '<span class="example">var favoriteLanguage = "English";</span>', html: true},
              {text: 'No, wait I changed my mind!'},
              {text: '<span class="example">var favoriteLanguage = "JavaScript";</span>', html: true},
              {text: 'value for favoriteLanguage is set to "javascript" ', html: true},
              {text: 'scope: "current execution context" '}
          ]},
      {title: 'let', lines: [
              {text: 'is not re-declarable', html: true},
              {text: '<span class="example">let favoriteLanguage = "English";</span>', html: true},
              {text: 'No, wait I changed my mind!'},
              {text: '<span class="example">let favoriteLanguage = "JavaScript";</span>', html: true},
              {text: '<span class="special">this will result in an Error</span>', html: true},
              {text: 'but you can declare once and change value', html: true},
              {text: '<span class="example">let favoriteLanguage = "English";</span>', html: true},
              {text: 'No, wait I changed my mind!'},
              {text: '<span class="example">favoriteLanguage = "JavaScript";</span>', html: true},
              {text: '<span>dropping the keyword just changes the value</span>', html: true},
              {text: 'scope: "block" '},
          ]},
      {title: 'const', lines: [
              {text: 'is not re-declarable', html: true},
              {text: '<span class="example">const favoriteLanguage = "English";</span>', html: true},
              {text: 'No, wait I changed my mind!'},
              {text: '<span class="example">const favoriteLanguage = "JavaScript";</span>', html: true},
              {text: '<span class="example">favoriteLanguage = "JavaScript";</span>', html: true},
              {text: '<span class="special">no way to change value. You have to just like english.</span>', html: true},
              {text: 'scope: "block" '}
          ]}
  ]
};

createPage(variablesPage);


