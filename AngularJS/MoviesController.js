function MoviesController() {

	this.list=[];

	this. favorites = [{

		title: "qwebnvr",
		year: "2017",
		catagory: "action"
	},
	{
		title: "qwerbv",
		year: "2014",
		catagory: "thriller"
	},
	{
		title: "qwenb vr",
		year: "2010",
		catagory: "action"
	},
	{
		title: "qwer",
		year: "2016",
		catagory: "comedy"
	}

];
	this.unlike = function (index) {
		this.list.splice(index,1);
	};
	this.addToList = function (movie) {
		this.list.push(movie);
	}
}

angular.module("myapp",[]).controller("MoviesController",MoviesController);
