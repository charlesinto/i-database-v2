
import Express from 'express';
import Robot from '../controller/Robot';
import { handleErrorAsync } from '../middleware/ErrorHandler';

const router = Express.Router()


router.post('/send-message', handleErrorAsync(Robot.handleOnPost))

router.post('/receive-messae', (req, res) => {
    console.log('payload gooten: ', req.body)

    res.status(200).send({message: 'Ok'})
})

export default router;