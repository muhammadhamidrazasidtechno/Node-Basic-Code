import  express  from "express";
import Users from "../models/usersSchema.mjs";
import verifyToken from "../middlewares/verifyToken.mjs";


const Router = express.Router();



Router.get('/',async (req,res)=> {
    try{
        const users = await Users.find()
    res.send({ message: "Data fetched successfully", data: users })

    }catch(e){
    res.send({ message: e.message })

    }
})


Router.post('/add',async (req,res) => {
try{
    const user = new Users(req.body)
    await user.save()
    res.send({ message: "User registered successfully!" })
}catch(e){
    res.send({ message: e.message })
}
})


Router.put('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        //Step 1: Check if email exists
        const user = await Users.findOne({ email })
    
        if (!user) {
            res.status(404).send({ message: 'Email not found!' })
            return
        }
    
        //Step 2: Compare Password
        const isCorrectPassword = user.comparePassword(password)
    
        if (!isCorrectPassword) {
            res.status(404).send({ message: 'Password is incorrect!' })
            return
        }
    
        //Step 3: Generate Token
        const token = user.generateToken()
        user.tokens.push(token)
        await user.save()
    
        res.send({ message: 'User logged in successfully!', token })
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
})
Router.put('/logout', verifyToken, async (req, res) => {
    await Users.findByIdAndUpdate(req.userId, { $pull: { tokens: req.tokenToRemove } })
    res.send({ message: 'Logged out successfully!' })
})


export default Router;