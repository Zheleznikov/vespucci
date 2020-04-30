module.exports = {
  // Root directory for traversing `rc` files and collecting configs.
  root: true,
  // Project levels.
  levels: {
      'common.blocks': {},
      'desktop.blocks': {}
  },
  // Modules.
  modules: {
      'bem-tools': {
          plugins: {
              create: {
                  
                techs: ['css'],
                'levels': 
                  {
                       'src/blocks': {
                      
                      'default': true}
                  }
              
              }
          }
      }
  }
}