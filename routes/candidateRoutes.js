import express from 'express';
const router = express.Router();  // jis variable ser router ko import karoge usi ko export karoge
import { jwtAuthMiddleware, generateToken } from "./../jwt.js";
import candidate from './../models/candidate.js';
import user from './../models/user.js';

//......check role
const checkAdminRole = async (userId) => {
    try {
        const userde = await user.findById(userId);
        if (userde.role === 'admin') {
            console.log(user.role);
            return true;
        }
    } catch (err) {
        return false;
    }
}

//post route to add candidate
router.post('/', jwtAuthMiddleware, async (req, res) => {
    try {
        if (!await checkAdminRole(req.user.id)) {
            return res.status(403).json({ message: "user has not admin role" });
        }
        const data = req.body;//assuming the  request body contain the candidate data
        //create a new user document using the mongoose model
        const newcandidate = new candidate(data);
        const response = await newcandidate.save();
        console.log(`Data saved`);
        res.status(200).json({ response: response });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
})

//// using PUT method to update candidate data
router.put('/:candidateID', jwtAuthMiddleware, async (req, res) => {
    try {
        if (!await checkAdminRole(req.user.id)) {
            return res.status(403).json({ message: "user has not admin role" });
        }
        const candidateID = req.params.candidateID; //getting unique id from the URL parameter
        const updatecandidateData = req.body; //getting candidate update json data from the the body 
        const response = await candidate.findByIdAndUpdate(candidateID, updatecandidateData, {
            new: true,
            runValidators: true,
        })

        if (!response) {
            return res.status(404).json({ error: "candidate not found" });
        }
        console.log('candidate data updated');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
});


//// using delete method to delete candidate 
router.delete('/:candidateID', jwtAuthMiddleware, async (req, res) => {
    try {
        if (!await checkAdminRole(req.user.id)) {
            return res.status(403).json({ message: "user has not admin role" });
        }
        const candidateID = req.params.candidateID; //getting unique id from the URL parameter
        const response = await candidate.findByIdAndDelete(candidateID);
        if (!response) {
            return res.status(404).json({ error: "candidate not found" });
        }
        console.log('candidate Deleted');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
});

//let's start voting
router.post('/vote/:candidateID', jwtAuthMiddleware, async (req, res) => {
    //only user can vote.
    //user can vote only one time.
    //extract user id by the token
    //get candidate id by the parameter
    try {
        const candidateID = req.params.candidateID;
        //reading user id through token
        const userId = req.user.id;
        if (await checkAdminRole(userId)) {
            return res.status(403).json({ message: "user should be a voter" });
        }
        const User = await user.findById(userId);
        let userIsVoted = User.isVoted;
        if (userIsVoted) {
            return res.status(400).json({ message: "You have already voted" });
        }
        const Candidate = await candidate.findById(candidateID);
        if (!Candidate) {
            return res.status(404).json({ message: "Candidate not found" })
        }
        //update the candidate document and record the vote
        Candidate.votes.push({ user: userId });
        Candidate.voteCount++;
        userIsVoted = true;
        //save the candidate updated data
        await Candidate.save();
        //save the user updated data
        await User.save();
        console.log("user voted successfully")
        res.status(200).json({ message: "user voted successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
})

router.get('/vote/count', async (req, res) => {
    try {
        //find all candidate and sort them by vote count in descending order
        const Candidate = await candidate.find().sort({ voteCount: 'desc' });
        //map the candidate to only return their name and vote count 
        const voteRecord = Candidate.map((data) => {
            return {
                name: data.name,
                party: data.party,
                count: data.voteCount
            }
        });
        return res.status(200).json(voteRecord);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Interal Server Error" });
    }
})



export default router;