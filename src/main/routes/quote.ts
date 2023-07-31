import { Router } from 'express'

export default (router: Router): void => {
    router.get('/quote', (req, res) => {
        res.json({
            quote: 'Hello World!'
        })
    })

    router.post('/quote', (req, res) => {
        res.json({
            quote: 'Hello World!'
        })
    })
}
