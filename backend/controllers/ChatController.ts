import { Request, Response } from "express";
import ChatModel from "../models/ChatModel";

export const createChat = async (req: Request, res: Response) => {
    const { senderId, receiverId } = req.body;
    const newChat = new ChatModel({
        members: [senderId, receiverId],
    });
    try {
        const result = await newChat.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};
// individual user chats
export const userChats = async (req: Request, res: Response) => {
    try {
        const chat = await ChatModel.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json(error);
    }
};
// Both user chats
export const findChat = async (req: Request, res: Response) => {
    try {
        const chat = await ChatModel.findOne({
            members: { $all: [req.params.firstId, req.params.secondId] },
        });
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json(error);
    }
};
