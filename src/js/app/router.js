
import broadcaster from './broadcaster'

/**
 * Dispatch all infographic routes, e.g.:
 * #/infografik/KFW-100
 */
route('/infografik/*', function(name) {

  broadcaster('route.matched').publish({

    route: 'infographic',
    args: [name]
  })
})

export default route
