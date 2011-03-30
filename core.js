
var sys = require('sys'),
    app = require('express').createServer(),
	db = require('mongous').Mongous;

/*  
 *		constants
 */

var title = "Pulgué";

var p = {

	views: __dirname + '/views/'

}

/*  
 *		app settings
 */

app.set('view engine', 'jade');


/*  
 *		app routing
 */

app.get('/recipe/:id?', function(req, res, next) {
	
	var id = req.params.id;
	
	if (id) {
		
		sys.puts("Find recipe nro "+id);
		
		db("pulgue.recipes").find({ _id: parseInt(id,10) }, function(reply) {
    
            //res.send(reply);
            
            res.render( p.views + '/recipe', { title : title, item : reply.documents[0] } );
			
		});

		
	} else {
	
        sys.puts("Find all recipes");
        
        db("pulgue.recipes").find(function(reply) {
    
//            res.send(reply);
            
            res.render( p.views + '/recipes', { title : title, items : reply.documents } );
            
        });
	
	}
	
});

app.get('/', function(req, res){
  
    res.render( p.views + '/index', { title : title } );

});

app.listen(8080);

sys.puts("Pulgue! on 8080");
