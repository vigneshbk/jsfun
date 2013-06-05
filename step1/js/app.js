(function ($) {

var BookModel = Backbone.Model.extend({
        defaults:{
            coverImage:"../img/thumb.png",
            title:"Some title",
            author:"John Doe",
            releaseDate:"2012",
            keywords:"JavaScript Programming"
        },

        validate: function(attributes) {
            if(attributes.title == null || attributes.title === '') {
              return 'Title in required';
            }
            return '';
        }
    });


var books = [{coverImage:"../img/jsgp.jpg",title:"JS the good parts", author:"John Doe", releaseDate:"2012", keywords:"JavaScript Programming"},
        {coverImage:"../img/coffee.png",title:"CS the better parts", author:"John Doe", releaseDate:"2012", keywords:"CoffeeScript Programming"},
        {coverImage:"../img/scala.jpg",title:"Scala for the impatient", author:"John Doe", releaseDate:"2012", keywords:"Scala Programming"},
        {title:"American Psyco", author:"Bret Easton Ellis", releaseDate:"2012", keywords:"Novel Splatter"},
        {coverImage:"../img/placeholder.png",title:"Eloquent JavaScript", author:"John Doe", releaseDate:"2012", keywords:"JavaScript Programming"}];

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
        this.collection.on("add", this.renderBook, this);
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

     addBook:function (e) {
          e.preventDefault();
        var formData = {};
        $("#addBook").find("input").each(function(i, el){ 
                if($(el).val() !== '')
                    formData[el.id] = $(el).val();
        });
 
        books.push(formData);
        
        this.collection.add(new BookModel(formData),{ error: function(){console.log('error in adding model to collection');} });        
    },
     renderBook:function(item){
 
            var bookView = new BookView({
                model: item
            });
            this.$el.append(bookView.render().el);
        }


});


    

   
var libView = new libraryView();
 
 $('#addlink').click(function (event) { event.preventDefault();$('#addFormContainer').fadeIn();});
 $('#cancel').click(function (event) {$('#addFormContainer').fadeOut(1000);});


})(jQuery);