const express = require('express');
const router = express.Router();
const uuid = require('uuid');
let users = require('../../users.js');

//fetch all users
router.get('/', (req, resp) => {
    resp.json(users);
})

//fetch user by id
router.get('/:id', (req, resp) => {
    const userDetails = users.filter(user => user.id === parseInt(req.params.id));
    if(!!userDetails) {
        resp.json(userDetails);
    } else {
        resp.sendStatus(400);
    }
})

//create new user
router.post('/', (req, resp) => {
    let newUser = {
        id: uuid.v4(),
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email
    };

    if(!newUser.name || !newUser.email || !newUser.mobile) {
        return resp.sendStatus(400);
    }

    users.push(newUser);
    resp.json(users);
})

//update user
router.put('/', (req, resp) => {
    const userFound = users.filter(user => user.id === req.body.id);
    if(userFound) {
        let userReq = req.body;
        users.map(user => {
            if(user.id == userReq.id) {
                user.name = userReq.name;
                user.mobile = userReq.mobile;
                user.email = userReq.email;
                resp.json({message: 'User Details updated', user});
            }
        });
    } else {
        return resp.sendStatus(400);
    }
})

//delete user
router.delete('/', (req, resp) => {
    const userFound = users.filter(user => user.id === parseInt(req.body.id));
    if(userFound) {
        users = users.filter(user => user.id !== parseInt(req.body.id));
        return resp.json({message :'User Deleted', users});
    } else {
        return resp.sendStatus(400);
    }
})

module.exports = router;