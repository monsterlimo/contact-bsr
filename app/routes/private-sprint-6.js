const _ = require('lodash')

module.exports = router => {
    router.post('/private-sprint-6/start', (req, res) => {
        req.session.data = []
        res.redirect('/private-sprint-6/about-the-request/complaint-or-advice')
    })

    //router.post('/private-sprint-6/about-the-request/request-about', (req, res) => {
    //    res.redirect('/private-sprint-6/about-the-request/complaint-or-advice')
    //})

    router.post('/private-sprint-6/about-the-request/complaint-or-advice', (req, res) => {
        if (req.session.data['enquiry-about'] == "ask a question") {
            res.redirect('/private-sprint-6/about-the-request/who-are-you')
            req.session.data['enquiry-about'] = "ask a question"
        } else {
            res.redirect('/private-sprint-6/about-the-request/complaint-about-a-building')
        }
    })

    router.post('/private-sprint-6/about-the-request/complaint-about-a-building', (req, res) => {
        if (req.session.data['request-about-what'] == "building") {
            res.redirect('/private-sprint-6/about-the-request/who-are-you')
        } else {
            res.redirect('/private-sprint-6/about-the-request/complaint-or-advice-about')
        }
    })

    router.post('/private-sprint-6/about-the-request/complaint-or-advice-about', (req, res) => {
        res.redirect('/private-sprint-6/about-the-request/who-are-you')
    })

    router.post('/private-sprint-6/about-the-request/who-are-you', (req, res) => {       
        if (req.session.data['request-about-what'] == "building") {
            res.redirect('/private-sprint-6/about-the-building/postcode-lookup')
        } else if (req.session.data['request-about-what'] == "unoccupied") {
            // bsr, other, person
            res.redirect('/private-sprint-6/about-the-building/do-you-know-the-address')
        } else {
            res.redirect('/private-sprint-6/about-the-person/enter-your-name')
        }
    })

    router.post('/private-sprint-6/about-the-building/do-you-know-the-address', (req, res) => {
        if (req.session.data['address-known'] == "yes") {
            res.redirect('/private-sprint-6/about-the-building/postcode-lookup')
        } else {
            res.redirect('/private-sprint-6/about-the-building/building-location')
        }
    })

    router.post('/private-sprint-6/about-the-building/building-location', (req, res) => {
        res.redirect('/private-sprint-6/about-the-person/enter-your-name')
    })
    
    router.post('/private-sprint-6/about-the-building/postcode-lookup', (req, res) => {
        if (req.session.data['building-postcode'].toUpperCase() == "SW1") {
            res.redirect('/private-sprint-6/about-the-building/confirm-address')
        } else {
            res.redirect('/private-sprint-6/about-the-building/choose-address')
        }
    })

    router.post('/private-sprint-6/about-the-building/choose-address', (req, res) => {
        res.redirect('/private-sprint-6/about-the-building/confirm-address')
    })

    router.post('/private-sprint-6/about-the-building/confirm-address', (req, res) => {
        res.redirect('/private-sprint-6/about-the-person/enter-your-name')
    })

    router.post('/private-sprint-6/about-the-building/which-region', (req, res) => {
        res.redirect('/private-sprint-6/about-the-building/enter-the-building-address')
    })

    router.post('/private-sprint-6/about-the-building/enter-the-building-address', (req, res) => {
        res.redirect('/private-sprint-6/about-the-person/enter-your-name')
    })

    router.post('/private-sprint-6/about-the-person/enter-your-name', (req, res) => {
        if (req.session.data['enquiry-about'] == "mor") {
            res.redirect('/private-sprint-6/about-the-person/enter-your-org-name')
        } else {
            res.redirect('/private-sprint-6/about-the-person/enter-your-contact-details')
        }
    })

    router.post('/private-sprint-6/about-the-person/enter-your-org-name', (req, res) => {
        res.redirect('/private-sprint-6/about-the-person/enter-your-contact-details')
    })

    router.post('/private-sprint-6/about-the-person/enter-your-contact-details', (req, res) => {
        // check if both contact and email have been entered
        if (req.session.data['contact-email'] && req.session.data['contact-number']) {
            //console.log('both entered')
            res.redirect('/private-sprint-6/about-the-person/contact-preference')
        } else {
            if (req.session.data['enquiry-about'] == "ask a question") {
                // advice
                if (req.session.data['request-about-what'] == "person") {
                    res.redirect('/private-sprint-6/about-the-request/enter-advice-required')
                } else {
                    // building
                    if (req.session.data['building-region']) {
                        // HRB public check
                        if (req.session.data['type-of-person'] == "professional") {
                            res.redirect('/private-sprint-6/building-in-scope/prof-number-of-floors')
                        } else {
                            res.redirect('/private-sprint-6/building-in-scope/number-of-floors')
                        }
                    } else {
                        // HRB
                        res.redirect('/private-sprint-6/about-the-request/enter-advice-required')
                    }
                }
               } else {
                // complaint
                if (req.session.data['request-about-what'] == "building" || req.session.data['request-about-what'] == "unoccupied") {
                    // building
                    if (req.session.data['building-region']) {
                        // HRB public check
                        if (req.session.data['type-of-person'] == "professional") {
                            res.redirect('/private-sprint-6/building-in-scope/prof-number-of-floors')
                        } else {
                            res.redirect('/private-sprint-6/building-in-scope/number-of-floors')
                        }
                    } else {
                        // HRB
                        res.redirect('/private-sprint-6/about-the-complaint/complaint-details')
                    }
                } else if (req.session.data['request-about-what'] == "person") {
                    res.redirect('/private-sprint-6/about-the-complaint/complaint-about-who')
                } else {
                    res.redirect('/private-sprint-6/about-the-complaint/complaint-details-bsr')
                }
               }
        }
    })

    router.post('/private-sprint-6/about-the-person/contact-preference', (req, res) => {

        if (req.session.data['enquiry-about'] == "ask a question") {
                // advice
                if (req.session.data['request-about-what'] == "person") {
                    res.redirect('/private-sprint-6/about-the-request/enter-advice-required')
                } else {
                    // building
                    if (req.session.data['building-region']) {
                        // HRB public check
                        if (req.session.data['type-of-person'] == "professional") {
                            res.redirect('/private-sprint-6/building-in-scope/prof-number-of-floors')
                        } else {
                            res.redirect('/private-sprint-6/building-in-scope/number-of-floors')
                        }
                    } else {
                        // HRB
                        res.redirect('/private-sprint-6/about-the-request/enter-advice-required')
                    }
                }
               } else {
                // complaint
                if (req.session.data['request-about-what'] == "building" || req.session.data['request-about-what'] == "unoccupied") {
                    // building
                    if (req.session.data['building-region']) {
                        // HRB public check
                        if (req.session.data['type-of-person'] == "professional") {
                            res.redirect('/private-sprint-6/building-in-scope/prof-number-of-floors')
                        } else {
                            res.redirect('/private-sprint-6/building-in-scope/number-of-floors')
                        }
                    } else {
                        // HRB
                        res.redirect('/private-sprint-6/about-the-complaint/complaint-details')
                    }
                } else if (req.session.data['request-about-what'] == "person") {
                    res.redirect('/private-sprint-6/about-the-complaint/complaint-about-who')
                } else {
                    res.redirect('/private-sprint-6/about-the-complaint/complaint-details-bsr')
                }
               }
    })



    router.post('/private-sprint-6/about-the-complaint/complaint-details-bsr', (req, res) => {
        res.redirect('/private-sprint-6/supporting-information/upload-supporting-info')
    })


    router.post('/private-sprint-6/about-the-complaint/complaint-about-who', (req, res) => {
        res.redirect('/private-sprint-6/about-the-complaint/complaint-details-person')
    })

    router.post('/private-sprint-6/about-the-complaint/complaint-details-person', (req, res) => {
        res.redirect('/private-sprint-6/supporting-information/upload-supporting-info')
    })

    router.post('/private-sprint-6/about-the-request/ask-a-question-about-who', (req, res) => {
        res.redirect('/private-sprint-6/about-the-request/enter-advice-required')
    })

    router.post('/private-sprint-6/about-the-complaint/have-you-contacted-the-ap', (req, res) => {
        res.redirect('/private-sprint-6/about-the-complaint/complaint-details')
    })

    router.post('/private-sprint-6/about-the-ap/enter-ap-details', (req, res) => {
        res.redirect('/private-sprint-6/about-the-ap/when-contacted-ap')
    })

    // only appears for public
    router.post('/private-sprint-6/about-the-person/what-is-your-relationship-to-the-building', (req, res) => {
        if (req.session.data['enquiry-about'] == "ask a question") {
            if (req.session.data['building-region']) {
                res.redirect('/private-sprint-6/building-in-scope/number-of-floors') 
            } else {
                res.redirect('/private-sprint-6/about-the-request/enter-advice-required') 
            } 
        } else {
            if (req.session.data['building-resident'] == "yes") {
                res.redirect('/private-sprint-6/building-in-scope/any-building-work') 
            } else {
                res.redirect('/private-sprint-6/building-in-scope/is-the-building-occupied')   
            }
        }
        
        
    })
    
    router.post('/private-sprint-6/building-in-scope/any-building-work', (req, res) => {
        if (req.session.data['building-region']) {
            res.redirect('/private-sprint-6/building-in-scope/number-of-floors')   
        } else {
            res.redirect('/private-sprint-6/about-the-complaint/complaint-details')   
        }
    })

    router.post('/private-sprint-6/about-the-person/what-is-your-role', (req, res) => {
        if (req.session.data['building-region']) {
            res.redirect('/private-sprint-6/building-in-scope/prof-number-of-floors')   
        } else {
            res.redirect('/private-sprint-6/about-the-occurrence/occurrence-type')   
        }
    })

    router.post('/private-sprint-6/building-in-scope/is-the-building-occupied', (req, res) => {
        res.redirect('/private-sprint-6/building-in-scope/any-building-work')
    })

    router.post('/private-sprint-6/building-in-scope/prof-number-of-floors', (req, res) => {
        res.redirect('/private-sprint-6/building-in-scope/prof-height-of-building')   
    })

    router.post('/private-sprint-6/building-in-scope/prof-height-of-building', (req, res) => {
        res.redirect('/private-sprint-6/building-in-scope/prof-number-of-units')   
    })

    // public building in scope

    router.post('/private-sprint-6/building-in-scope/number-of-floors', (req, res) => {
        res.redirect('/private-sprint-6/building-in-scope/number-of-units')   
    })

    router.post('/private-sprint-6/building-in-scope/number-of-units', (req, res) => {
        if (req.session.data['enquiry-about'] == "ask a question") {
            res.redirect('/private-sprint-6/about-the-request/enter-advice-required')   
        } else {
            res.redirect('/private-sprint-6/about-the-complaint/complaint-details')   
        }
    })

    router.post('/private-sprint-6/building-in-scope/prof-number-of-units', (req, res) => {
        if (req.session.data['enquiry-about'] == "ask a question") {
            res.redirect('/private-sprint-6/about-the-request/enter-advice-required')   
        } else {
            res.redirect('/private-sprint-6/about-the-complaint/complaint-details')   
        }
    })

    

    router.post('/private-sprint-6/about-the-request/enter-advice-required', (req, res) => {
        res.redirect('/private-sprint-6/check-your-answers')
    })

    router.post('/private-sprint-6/about-the-complaint/scope-of-bsr', (req, res) => {
        res.redirect('/private-sprint-6/about-the-complaint/complaint-details')
    })

    router.post('/private-sprint-6/about-the-complaint/complaint-details', (req, res) => {
        res.redirect('/private-sprint-6/supporting-information/upload-supporting-info')
    })

    router.post('/private-sprint-6/about-the-occurrence/occurrence-type', (req, res) => {
        res.redirect('/private-sprint-6/about-the-occurrence/occurrence-date')
    })

    router.post('/private-sprint-6/about-the-occurrence/occurrence-date', (req, res) => {
        res.redirect('/private-sprint-6/about-the-occurrence/occurrence-who-reported')
    })

    router.post('/private-sprint-6/about-the-occurrence/occurrence-who-reported', (req, res) => {
        if (req.session.data['who-reported-occurrence'] == "i did") {
            res.redirect('/private-sprint-6/about-the-occurrence/occurrence-details')
        } else {
            res.redirect('/private-sprint-6/about-the-occurrence/occurrence-reporter')
        }
    })

    router.post('/private-sprint-6/about-the-occurrence/occurrence-reporter', (req, res) => {
        res.redirect('/private-sprint-6/about-the-occurrence/occurrence-details')
    })

    router.post('/private-sprint-6/about-the-occurrence/occurrence-details', (req, res) => {
        res.redirect('/private-sprint-6/supporting-information/upload-supporting-info')
    })

    router.post('/private-sprint-6/supporting-information/do-you-have-any-supporting-info', (req, res) => {
        if (req.session.data['supporting-evidence'] == "yes") {
            res.redirect('/private-sprint-6/supporting-information/upload-supporting-info')
        } else {
            if (req.session.data['contacted-ap'] == "yes") {
                res.redirect('/private-sprint-6/about-the-ap/enter-ap-details')
            } else {
                res.redirect('/private-sprint-6/check-your-answers')
            }
        }
    })

    router.post('/private-sprint-6/supporting-information/upload-supporting-info', (req, res) => {
        console.log(req.session.data['filesUploaded'])
        console.log("before: " + typeof(req.session.data['filesUploaded']))

        if (typeof(req.session.data['filesUploaded']) == "string") {
            // convert string to object
            var myArray = [];
            myArray.push(req.session.data['filesUploaded'])
            req.session.data['filesUploaded'] = myArray

            console.log("after: " + typeof(req.session.data['filesUploaded']))
        }
    
        res.redirect('/private-sprint-6/check-your-answers')
    })

    router.post('/private-sprint-6/supporting-information/review-uploads', (req, res) => {
        /*
        if (req.session.data['enquiry-about'] == "make a complaint") {
            // no complaint goes to AP
            if (req.session.data['contacted-ap'] == "yes") {
                res.redirect('/private-sprint-6/about-the-ap/enter-ap-details')
            } else {
                res.redirect('/private-sprint-6/check-your-answers')
            }
        } else {
            res.redirect('/private-sprint-6/check-your-answers')
        }
        */
        res.redirect('/private-sprint-6/check-your-answers')
    })

    router.post('/private-sprint-6/about-occurrence/reporter-relationship', (req, res) => {
        res.redirect('/private-sprint-6/about-the-building/do-you-know-the-address')
    })

    router.post('/private-sprint-6/about-the-building/do-you-know-the-address', (req, res) => {
        res.redirect('/private-sprint-6/about-the-building/is-the-building-occupied')
    })

    router.post('/private-sprint-6/about-the-ap/have-you-contacted-the-ap', (req, res) => {
        if (req.session.data['contacted-ap'] == "yes") {
            res.redirect('/private-sprint-6/about-the-ap/enter-ap-details')
        } else {
            res.redirect('/private-sprint-6/check-your-answers')
        }
    })

    router.post('/private-sprint-6/about-the-ap/enter-ap-details', (req, res) => {
        res.redirect('/private-sprint-6/about-the-ap/when-contacted-ap')
    })

    router.post('/private-sprint-6/about-the-ap/when-contacted-ap', (req, res) => {
        res.redirect('/private-sprint-6/check-your-answers')
    })

    router.post('/private-sprint-6/check-your-answers', (req, res) => {
        res.redirect('/private-sprint-6/confirmation')
    })

    router.post('/private-sprint-6/about-the-person/share-details', (req, res) => {
        res.redirect('/private-sprint-6/about-the-person/confirmation-share-details')
    })
    
}
