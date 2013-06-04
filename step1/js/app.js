(function ($) {

var BookModel = Backbone.Model.extend({
        defaults:{
            coverImage:"../img/placeholder.png",
            title:"Some title",
            author:"John Doe",
            releaseDate:"2012",
            keywords:"JavaScript Programming"
        }
    });


var books = [{title:"JS the good parts", author:"John Doe", releaseDate:"2012", keywords:"JavaScript Programming"},
        {title:"CS the better parts", author:"John Doe", releaseDate:"2012", keywords:"CoffeeScript Programming"},
        {title:"Scala for the impatient", author:"John Doe", releaseDate:"2012", keywords:"Scala Programming"},
        {title:"American Psyco", author:"Bret Easton Ellis", releaseDate:"2012", keywords:"Novel Splatter"},
        {title:"Eloquent JavaScript", author:"John Doe", releaseDate:"2012", keywords:"JavaScript Programming"}];

var BookView = Backbone.View.extend({
        tagName:"div",
        className:"bookContainer",
        template:$("#bookTemplate").html(),

        render:function () {
            var tmpl = _.template(this.template); //tmpl is a function that takes a JSON object and returns html
            this.$el.html(tmpl(this.model.toJSON())); //this.el is what we defined in tagName. use $el to get access to jQuery html() function
            return this;
        }
    	});


var BookCollection = Backbone.Collection.extend({
	model:BookModel
});

var libraryView = Backbone.View.extend({
    el:$("#books"),
    initialize: function () {
    	console.log('init');
     	this.collection = new BookCollection(books);
     	this.render();
    },
  	events:{
    "click #add":"addBook"
	},
    render:function () {
        var that = this;
        _.each(this.collection.models, function(item){		 
			var  bookView = new BookView({model:item});
		    that.$el.append(bookView.render().el);
        });    
    },

     addBook:function () {
          console.log('addd book called');
    }


});


    var book = new BookModel({
        title:"JavaScript Good Parts",
        coverImage:"../img/jsgp.jpg",
        author:"Douglas Crokford",
        releaseDate:"2012",
        keywords:"JavaScript Programming"
    });

   
var libView = new libraryView();
 
 console.log($('#addlink'))	 
   
 $('#addlink').click(function (event) {
 	 console.log(event)
 	 event.preventDefault();
 	// $(this).unbind('click');
 	 $('#addFormContainer').fadeIn();
 });


})(jQuery);