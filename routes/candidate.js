const router = require("express").Router();
const User = require("../models/User");
const Candidate = require("../models/candidate_model/candidate")
const verify = require('../middleware/auth_middleware');
const { candidateValidation } = require("../validation/candidate_validation");

router.get('/get_candidates', verify,async(req, res)=>{
    console.log(req.user._id )
    const candidates = await Candidate.where({ user_id: req.user._id });
    res.send({'candidates': candidates});
});

router.post('/create_candidate', verify,async(req, res)=>{
    const { error } = candidateValidation(req.body);
    const user = await User.findOne({ id: req.user._id });
    if (error) {
        res.send({ validation: error.details[0].message });
      } else {
    const candidate = new Candidate({
        name: req.body.name,
        email: req.body.email,
        user_id: req.user._id
      });
    const savedCandidate = await candidate.save();
    res.send({ candidate: savedCandidate});
      }
});

router.post('/create_bulk_candidates', verify,async(req, res)=>{
    const user = await User.findOne({ id: req.user._id });
    res.send({'yeeey creating bulk candidates': user});
});

router.delete('/delete_candidate', verify,async(req, res)=>{
    const user = await User.findOne({ id: req.user._id });
    res.send({'yeeey deleting candidates': user});
});

module.exports = router;