//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here
require('./routes/sprint-3')(router)
require('./routes/sprint-4')(router)
require('./routes/sprint-5')(router)
require('./routes/sprint-6')(router)
require('./routes/sprint-6-mor')(router)
require('./routes/sprint-7')(router)
require('./routes/sprint-8')(router)
require('./routes/sprint-9')(router)

require('./routes/private-sprint-2')(router)
require('./routes/private-sprint-3')(router)
require('./routes/private-sprint-4')(router)
require('./routes/private-sprint-5')(router)
require('./routes/private-sprint-6')(router)