export const getUser = (req,res) => {
    const user = req.query.user;
    console.log(user);
    res.send("<h1> hello </h>")
}