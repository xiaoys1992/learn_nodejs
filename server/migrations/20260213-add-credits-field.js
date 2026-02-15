const User = mongoose.model('users');
User.updateMany(
    { credits: { $exists: false } },
    { $set: { credits: 0 } }
).then(result => {
    console.log(`Updated ${result.modifiedCount} users with credits: 0`);
});