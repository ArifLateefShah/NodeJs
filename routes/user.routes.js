const {authJwt} = require('../middlewares');
const controller = require('../controllers/user.controller');

module.exports = (app) => {
    app.use(function(req,res,next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
          );
        next();
    });

    app.get('/user/all',controller.allAccess);

    app.get('/blog/:id', controller.getBlog);

    app.post('/blog/comment',controller.postComment);

    app.post('/blog/comment/:id/reply',controller.postReply);

    app.get('/blog/comment/:id/replies',controller.getReplies)

    app.get('/user/:id', [authJwt.verifyToken,authJwt.isSuperAdmin],controller.superAdminArea);

    app.post('/blog/add',[authJwt.verifyToken,authJwt.isAuthor],controller.authorArea);

    app.put('/blog',[authJwt.verifyToken,authJwt.isAuthor],controller.authorArea);

    app.get('/blog/moderator/:id',[authJwt.verifyToken,authJwt.isModerator],controller.getBlogforModerator);

}
