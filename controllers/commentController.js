import Comment from '../models/comment.js';

export const createComment = async (req, res) => {
    const { post_id, content, author_id } = req.body;
    try {
        const comment = new Comment({ post_id, content, author_id });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getComments = async (req, res) => {
    const { post_id } = req.query;
    try {
        const comments = await Comment.find({ post_id }).populate('author_id');
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCommentById = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findById(id).populate('author_id');
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateComment = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const comment = await Comment.findByIdAndUpdate(id, { content }, { new: true });
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findByIdAndDelete(id);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        res.json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
