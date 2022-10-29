import mongoose from 'mongoose';

//Schema
const User = new mongoose.Schema({
    username: String,
    hash: String,
    years: [{type: mongoose.Schema.Types.ObjectId, ref:'Year'}]
});

const Year = new mongoose.Schema({
    months: [{type: mongoose.Schema.Types.ObjectId, ref:'Month'}]
});
const Month = new mongoose.Schema({
    transactions:[{type: mongoose.Schema.Types.ObjectId, ref:'Transaction'}]
});
const Transaction = new mongoose.Schema({
    user: String,
	month: String,
	items: [{Day: Number, 
            flow: String, 
            Amount: Number, 
            Category: String, 
            comment: String
        }],
});

// mongoose.model('User', User);
// mongoose.model('Year', Year);
// mongoose.model('Transaction', Transaction);
mongoose.connect('mongodb://localhost/dollarbook');
