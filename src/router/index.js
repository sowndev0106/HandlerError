const { Router } = require("express");
const ValidationError = require("../errors/ValidationError");
const NotFoundError = require("../errors/ValidationError");
const errorHandler = require("../middlerware/errorHandler");
const { User } = require("../mongoose")
const router = Router();

router.get("/", (req, res) => {
    res.send("Handles errors");
});

router.get("/division", (req, res) => {
    const { a, b } = req.query

    //  // level 1
    // if(!a || !b ){
    //     return res.status(422).json({error: "a and b is number and required "})
    // }
    // if(Number(b) == 0){
    //     return res.status(422).json({error: "b must be different from 0"})
    // }

    //  // level 2
    if (!a || !b) {
        throw new Error("a and b is required")
    }
    if (Number(b) == 0) {
        throw new Error("b must be different from 0 ")
    }

    // level 3
    if (!a || !b) {
        throw new ValidationError("a and b is required") // status code 
    }
    if (Number(b) == 0) {
        throw new ValidationError("b must be different from 0 ")
    }
    const result = a / b;
    res.json({ result })
});

router.post("/users", async (req, res) => {
    const { name, sex } = req.body
    const error = []
    if (!name) {
        error.push({ name: "name is invalid" })
    }
    if (!sex) {
        error.push({ sex: "sex id invalid" })
    }
    if (error.length) {
        throw new ValidationError(error)
    }
    const user = await new User({ name, sex }).save()
    res.json({ user })
});

router.get("/users/:id", async (req, res) => {
    const { id } = req.params
    // level 3
    // const regexMongoId = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
    // if (!regexMongoId.test(id)) {
    //     throw new ValidationError({ id: "id is require" })
    // }
    const user = await User.findById(id)
    if (!user) {
        throw new NotFoundError("user not found");
    }

    res.json({ user })
});


router.use(errorHandler);

module.exports = router;


