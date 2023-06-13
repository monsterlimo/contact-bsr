const _ = require('lodash')

module.exports = router => {
    router.post('/private-sprint-2/start', (req, res) => {
        req.session.data = []
        res.redirect('/private-sprint-2/about-the-request/request-about')
    })

    router.post('/private-sprint-2/about-the-request/request-about', (req, res) => {
        res.redirect('/private-sprint-2/about-the-request/complaint-or-advice')
    })

    router.post('/private-sprint-2/about-the-request/complaint-or-advice', (req, res) => {
        res.redirect('/private-sprint-2/about-the-request/who-are-you')
    })

    router.post('/private-sprint-2/about-the-request/who-are-you', (req, res) => {       
        if (req.session.data['request-about-what'] == "building") {
            res.redirect('/private-sprint-2/about-the-building/postcode-lookup')
        } else {
            // bsr, other, person
            res.redirect('/private-sprint-2/about-the-person/enter-your-name')
        }
    })

    router.post('/private-sprint-2/about-the-building/do-you-know-the-address', (req, res) => {
        res.redirect('/private-sprint-2/about-the-building/postcode-lookup')
    })
    
    router.post('/private-sprint-2/about-the-building/postcode-lookup', (req, res) => {
        res.redirect('/private-sprint-2/about-the-building/choose-address')
    })

    router.post('/private-sprint-2/about-the-building/choose-address', (req, res) => {
        res.redirect('/private-sprint-2/about-the-building/confirm-address')
    })

    router.post('/private-sprint-2/about-the-building/confirm-address', (req, res) => {
        res.redirect('/private-sprint-2/about-the-person/enter-your-name')
    })

    router.post('/private-sprint-2/about-the-building/which-region', (req, res) => {
        res.redirect('/private-sprint-2/about-the-building/enter-the-building-address')
    })

    router.post('/private-sprint-2/about-the-building/enter-the-building-address', (req, res) => {
        res.redirect('/private-sprint-2/about-the-person/enter-your-name')
    })

    router.post('/private-sprint-2/about-the-person/enter-your-name', (req, res) => {
        if (req.session.data['enquiry-about'] == "mor") {
            res.redirect('/private-sprint-2/about-the-person/enter-your-org-name')
        } else {
            res.redirect('/private-sprint-2/about-the-person/enter-your-contact-details')
        }
    })

    router.post('/private-sprint-2/about-the-person/enter-your-org-name', (req, res) => {
        res.redirect('/private-sprint-2/about-the-person/enter-your-contact-details')
    })

    router.post('/private-sprint-2/about-the-person/enter-your-contact-details', (req, res) => {
       if (req.session.data['enquiry-about'] == "advice") {
        // advice
        if (req.session.data['request-about-what'] == "person") {
            res.redirect('/private-sprint-2/about-the-request/enter-advice-required')
        } else {
            // building
            if (req.session.data['building-region']) {
                // HRB public check
                if (req.session.data['type-of-person'] == "professional") {
                    res.redirect('/private-sprint-2/building-in-scope/prof-number-of-floors')
                } else {
                    res.redirect('/private-sprint-2/building-in-scope/number-of-floors')
                }
            } else {
                // HRB
                res.redirect('/private-sprint-2/about-the-request/enter-advice-required')
            }
        }
       } else {
        // complaint
        if (req.session.data['request-about-what'] == "building") {
            // building
            if (req.session.data['building-region']) {
                // HRB public check
                if (req.session.data['type-of-person'] == "professional") {
                    res.redirect('/private-sprint-2/building-in-scope/prof-number-of-floors')
                } else {
                    res.redirect('/private-sprint-2/building-in-scope/number-of-floors')
                }
            } else {
                // HRB
                res.redirect('/private-sprint-2/about-the-complaint/have-you-contacted-the-ap')
            }
        } else {
            res.redirect('/private-sprint-2/about-the-complaint/complaint-about-who')
        }
        
       }
    })

    router.post('/private-sprint-2/about-the-complaint/complaint-about-who', (req, res) => {
        res.redirect('/private-sprint-2/about-the-complaint/have-you-contacted-the-ap')
    })

    router.post('/private-sprint-2/about-the-request/ask-a-question-about-who', (req, res) => {
        res.redirect('/private-sprint-2/about-the-request/enter-advice-required')
    })

    router.post('/private-sprint-2/about-the-complaint/have-you-contacted-the-ap', (req, res) => {
        res.redirect('/private-sprint-2/about-the-complaint/complaint-details')
    })

    router.post('/private-sprint-2/about-the-ap/enter-ap-details', (req, res) => {
        res.redirect('/private-sprint-2/about-the-ap/when-contacted-ap')
    })

    // only appears for public
    router.post('/private-sprint-2/about-the-person/what-is-your-relationship-to-the-building', (req, res) => {
        if (req.session.data['enquiry-about'] == "advice") {
            if (req.session.data['building-region']) {
                res.redirect('/private-sprint-2/building-in-scope/number-of-floors') 
            } else {
                res.redirect('/private-sprint-2/about-the-request/enter-advice-required') 
            } 
        } else {
            if (req.session.data['building-resident'] == "yes") {
                res.redirect('/private-sprint-2/building-in-scope/any-building-work') 
            } else {
                res.redirect('/private-sprint-2/building-in-scope/is-the-building-occupied')   
            }
        }
        
        
    })
    
    router.post('/private-sprint-2/building-in-scope/any-building-work', (req, res) => {
        if (req.session.data['building-region']) {
            res.redirect('/private-sprint-2/building-in-scope/number-of-floors')   
        } else {
            res.redirect('/private-sprint-2/about-the-complaint/complaint-details')   
        }
    })

    router.post('/private-sprint-2/about-the-person/what-is-your-role', (req, res) => {
        if (req.session.data['building-region']) {
            res.redirect('/private-sprint-2/building-in-scope/prof-number-of-floors')   
        } else {
            res.redirect('/private-sprint-2/about-the-occurrence/occurrence-type')   
        }
    })

    router.post('/private-sprint-2/building-in-scope/is-the-building-occupied', (req, res) => {
        res.redirect('/private-sprint-2/building-in-scope/any-building-work')
    })

    router.post('/private-sprint-2/building-in-scope/prof-number-of-floors', (req, res) => {
        res.redirect('/private-sprint-2/building-in-scope/prof-height-of-building')   
    })

    router.post('/private-sprint-2/building-in-scope/prof-height-of-building', (req, res) => {
        res.redirect('/private-sprint-2/building-in-scope/prof-number-of-units')   
    })

    // public building in scope

    router.post('/private-sprint-2/building-in-scope/number-of-floors', (req, res) => {
        res.redirect('/private-sprint-2/building-in-scope/number-of-units')   
    })

    router.post('/private-sprint-2/building-in-scope/number-of-units', (req, res) => {
        if (req.session.data['enquiry-about'] == "advice") {
            res.redirect('/private-sprint-2/about-the-request/enter-advice-required')   
        } else {
            res.redirect('/private-sprint-2/about-the-complaint/complaint-details')   
        }
    })

    router.post('/private-sprint-2/building-in-scope/prof-number-of-units', (req, res) => {
        if (req.session.data['enquiry-about'] == "advice") {
            res.redirect('/private-sprint-2/about-the-request/enter-advice-required')   
        } else {
            res.redirect('/private-sprint-2/about-the-complaint/complaint-details')   
        }
    })

    

    router.post('/private-sprint-2/about-the-request/enter-advice-required', (req, res) => {
        res.redirect('/private-sprint-2/check-your-answers')
    })

    router.post('/private-sprint-2/about-the-complaint/scope-of-bsr', (req, res) => {
        res.redirect('/private-sprint-2/about-the-complaint/complaint-details')
    })

    router.post('/private-sprint-2/about-the-complaint/complaint-details', (req, res) => {
        res.redirect('/private-sprint-2/supporting-information/do-you-have-any-supporting-info')
    })

    router.post('/private-sprint-2/about-the-occurrence/occurrence-type', (req, res) => {
        res.redirect('/private-sprint-2/about-the-occurrence/occurrence-date')
    })

    router.post('/private-sprint-2/about-the-occurrence/occurrence-date', (req, res) => {
        res.redirect('/private-sprint-2/about-the-occurrence/occurrence-who-reported')
    })

    router.post('/private-sprint-2/about-the-occurrence/occurrence-who-reported', (req, res) => {
        if (req.session.data['who-reported-occurrence'] == "i did") {
            res.redirect('/private-sprint-2/about-the-occurrence/occurrence-details')
        } else {
            res.redirect('/private-sprint-2/about-the-occurrence/occurrence-reporter')
        }
    })

    router.post('/private-sprint-2/about-the-occurrence/occurrence-reporter', (req, res) => {
        res.redirect('/private-sprint-2/about-the-occurrence/occurrence-details')
    })

    router.post('/private-sprint-2/about-the-occurrence/occurrence-details', (req, res) => {
        res.redirect('/private-sprint-2/supporting-information/do-you-have-any-supporting-info')
    })

    router.post('/private-sprint-2/supporting-information/do-you-have-any-supporting-info', (req, res) => {
        if (req.session.data['supporting-evidence'] == "yes") {
            res.redirect('/private-sprint-2/supporting-information/upload-supporting-info')
        } else {
            if (req.session.data['contacted-ap'] == "yes") {
                res.redirect('/private-sprint-2/about-the-ap/enter-ap-details')
            } else {
                res.redirect('/private-sprint-2/check-your-answers')
            }
        }
    })

    router.post('/private-sprint-2/supporting-information/upload-supporting-info', (req, res) => {
        res.redirect('/private-sprint-2/supporting-information/review-uploads')
    })

    router.post('/private-sprint-2/supporting-information/review-uploads', (req, res) => {
        if (req.session.data['enquiry-about'] == "complaint") {
            // no complaint goes to AP
            if (req.session.data['contacted-ap'] == "yes") {
                res.redirect('/private-sprint-2/about-the-ap/enter-ap-details')
            } else {
                res.redirect('/private-sprint-2/check-your-answers')
            }
        } else {
            res.redirect('/private-sprint-2/check-your-answers')
        }
    })

    router.post('/private-sprint-2/about-occurrence/reporter-relationship', (req, res) => {
        res.redirect('/private-sprint-2/about-the-building/do-you-know-the-address')
    })

    router.post('/private-sprint-2/about-the-building/do-you-know-the-address', (req, res) => {
        res.redirect('/private-sprint-2/about-the-building/is-the-building-occupied')
    })

    router.post('/private-sprint-2/about-the-ap/have-you-contacted-the-ap', (req, res) => {
        if (req.session.data['contacted-ap'] == "yes") {
            res.redirect('/private-sprint-2/about-the-ap/enter-ap-details')
        } else {
            res.redirect('/private-sprint-2/check-your-answers')
        }
    })

    router.post('/private-sprint-2/about-the-ap/enter-ap-details', (req, res) => {
        res.redirect('/private-sprint-2/about-the-ap/when-contacted-ap')
    })

    router.post('/private-sprint-2/about-the-ap/when-contacted-ap', (req, res) => {
        res.redirect('/private-sprint-2/check-your-answers')
    })

    router.post('/private-sprint-2/check-your-answers', (req, res) => {
        res.redirect('/private-sprint-2/confirmation')
    })
    
}
