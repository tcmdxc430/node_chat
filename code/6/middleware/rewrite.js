var url = require('url')
var path = '/blog/posts/12'

module.exports = function rewrite(req,res,next) {
    
    var match = path.match(/^\/blog\/posts\/(.+)/)
    console.log(match)
    if(match) {
        findPostIdBySlug(match[1],function(err,id){
            if(err) return next(err)
            if(!id) return next(new Error('no user id'))
            req.url = '/blog/posts/'+id
            next()
        })
    }else {
        next()
    }
} 