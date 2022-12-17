import express from "express";

const app = express();

app.use(express.json());

//array which contains multiple objects - temporary database
const db = [
    {
        id: 1,
        title: "Physics",
        price: 150,
        category: "HSC"
    },
    {
        id: 2,
        title: "History",
        price: 80,
        category: "SSC"
    },
    {
        id: 3,
        title: "Java",
        price: 300,
        category: "Programming"
    }
]

//read all book items
app.get('/all-book-items', (req,res)=>{
    res.json({
        success: true,
        data:db,
        message: "All Books Fetched Successfully" 
    })
})

//add new book item
app.post('/add-book-item', (req,res)=>{
    const {id, title, price, category} = req.body;

    const newItem = {
        id:id,
        title:title,
        price:price,
        category:category
    }

    //check if book item is already exists with same id
    db.forEach((item) =>{
        if(item.id == id){
            return res.json({
                success: false,
                data: null,
                message: `Item Already Exists at id ${id}`
            })
        }
    })

    db.push(newItem);

    res.json({
        success: true,
        data: newItem,
        message: "Added new Book Item Successfully"
    })
})

//read book item from query param by id
app.get('/book-item-by-id', (req,res)=>{
    const id = req.query.id;

    db.forEach((item)=>{
        if(item.id == id){
            return res.json({
                success: true,
                data: item,
                message: `Book Item found Successfully at id ${id}`
            })
        } 
    })

    res.json({
        success: false,
        data: null,
        message: `Item Not Found for id ${id}`
    })
})

//delete book item from query param by id
app.get('/delete-book-item-by-id', (req,res)=>{
    const id = req.query.id;

    db.forEach((item, index)=>{
        if(item.id == id){
            db.splice(index, 1)
            return res.json({
                success: true,
                data: db,
                message: `Delete Book Item Successfully from id ${id}`
            })
        }
    })

    res.json({
        success: false,
        data: null,
        message: `Book is Not Available for id ${id}`
    })
})

//Get items by category by query params
app.get('/book-items-by-category', (req,res)=>{
    const category = req.query.category;

    const temp = []

    db.forEach((item)=>{
        if(item.category === category){
            temp.push(item)
            return res.json({
                success: true,
                data: temp,
                message: `Book Item found Successfully for category ${category}`
            })
        }
    })

    res.json({
        success: false,
        data: null,
        message: `Item Not Found for category ${category}`

    })
})

app.listen(5000, ()=>{
    console.log("Listening on Port 5000");
})