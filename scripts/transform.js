
'use strict';

module.exports = function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  root.find(j.Literal, { value: 'TabbedApplication' })
      .replaceWith(p => j.literal(options.appname));
  root.find(j.Identifier, { name: 'TabbedApplication' })
      .replaceWith(p=>j.identifier(options.appname))

  return root.toSource();
};
