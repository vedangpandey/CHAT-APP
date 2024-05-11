import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage=async (req,res)=>{
    try{
        const {message} = req.body;
        const {id:recieverId} =req.params;
        const senderId=req.user._id;
        let conversation=await Conversation.findOne({
            participants:{
                $all: [senderId,recieverId]
            },
        });
        if(!conversation){
            conversation=await Conversation.create({
                participants:[senderId,recieverId],
            })
        }
        const newMessage=new Message({
            senderId,
            recieverId,
            message,
        });
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        //Socket IO functionality will go here
        //await conversation.save();
        //await newMessage.save();
        await Promise.all([conversation.save(),newMessage.save()]);
        res.status(201).json(newMessage);
    }catch(error){
        console.log("Error in message controller ",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};