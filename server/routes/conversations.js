const router = require("express").Router();
const Conversation = require("../models/Conversation");
const mongoose = require('mongoose');
//new conv

router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    return res.status(200).json(savedConversation);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//get conv of a user

router.get("/:userId", async (req, res) => {
  try {
    const _id = new mongoose.Types.ObjectId(req.params.userId)
    console.log(_id)
    const conversation = await Conversation.find({
      members: { $in: [_id] },
    });
    console.log("conversation",conversation)
   
    return res.status(200).json(conversation);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const _idfirstUserId = new mongoose.Types.ObjectId(req.params.firstUserId)
    const _idsecondUserId = new mongoose.Types.ObjectId(req.params.secondUserId)
    const conversation = await Conversation.findOne({
      members: { $all: [_idfirstUserId, _idsecondUserId] },
    });
    return res.status(200).json(conversation)
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;