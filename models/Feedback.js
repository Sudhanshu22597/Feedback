const mongoose=require('mongoose');
const feedbackcollectionsystem=new mongoose.Schema({
        name:String,
        contactNumber:String,
        email:String,
        feedback:String

});
module.exports=mongoose.model('Feedback',feedbackcollectionsystem);
