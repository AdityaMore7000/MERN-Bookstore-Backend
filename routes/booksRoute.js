import express from 'express'
const router = express.Router() 
import { Book } from '../models/bookModel.js';
//get book by id:

router.get('/:_id',async (req,res)=>{
    try {
        const book = await Book.findById(req.params._id);
        if(book)
        return res.status(200).send(book)
    else 
    return res.status(404).send("Book not found")
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})


//get all books

router.get('/', async(req,res)=>{
    try {
        const books = await Book.find({ })
        return res.status(200).json({
            count:books.length,
            data: books
        });
    } catch (error) {
        res.status(500).send({message:error.message})
    }
})

// add new book
router.post('/', async (req,res)=>{
    try {
        const {title,author,publishYear} = req.body
        if(!title || !author || !publishYear){
            return res.status(400).send({
                message:"Send all fields please"
            })
        }
        const newBook = {
            title:title,
            author:author,
            publishYear:publishYear
        }
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})

// update a book
router.put('/:_id', async (req,res)=>{
    try {
        if(!title || !author || !publishYear){
            return res.status(400).send({
                message:"Send all fields please"
            })
        }
        else{
            const {_id} = req.params
            const result = Book.findByIdAndUpdate(_id,req.body)
            if(!result){
                return res.status(404).json({error:"Book not found"})
            }
            else{
                return res.status(200).json(result);
            }
        }
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})

//delete a book:
router.delete('/:_id', async (req,res)=>{
    try {
            const {_id} = req.params
            const result = await Book.findByIdAndDelete(_id)
            if(!result){
                return res.status(404).json({error:"Book not found"})
            }
            else{
                return res.status(200).json({Status:"Book Deleted Successfully"});
            }
        
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})

export default router;
