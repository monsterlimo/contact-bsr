const _ = require('lodash')

module.exports = router => {
    router.post('/public-sprint-10/start', (req, res) => {
        req.session.data = []
        res.redirect('/public-sprint-10/about-the-request/who-are-you')
    })

    router.post('/public-sprint-10/about-the-request/who-are-you', (req, res) => {       
        res.redirect('/public-sprint-10/about-the-person/enter-your-name')
    })

    router.post('/public-sprint-10/about-the-person/enter-your-name', (req, res) => {
        res.redirect('/public-sprint-10/about-the-person/enter-your-contact-details')
    })

    router.post('/public-sprint-10/about-the-person/enter-your-contact-details', (req, res) => {
        // check if both contact and email have been entered
        if (req.session.data['contact-email'] && req.session.data['contact-number']) {
            //console.log('both entered')
            res.redirect('/public-sprint-10/about-the-person/contact-preference')
        } else {
            res.redirect('/public-sprint-10/about-the-request/enter-advice-required')
        }
    })

    router.post('/public-sprint-10/about-the-person/contact-preference', (req, res) => {
        res.redirect('/public-sprint-10/about-the-request/enter-advice-required')        
    })

    router.post('/public-sprint-10/about-the-request/enter-advice-required', (req, res) => {
        res.redirect('/public-sprint-10/check-your-answers')
    })

    router.post('/public-sprint-10/check-your-answers', (req, res) => {
        res.redirect('/public-sprint-10/confirmation')
    })
}