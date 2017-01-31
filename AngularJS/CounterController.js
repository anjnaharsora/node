angular.module("app",[]).controller("CounterController",CounterController);

function CounterController($scope){
    this.count=$scope.count;
    this.incerment = function(){
        this.count++;
    }
    this.decrement = function(){
        this.count--;
    }

}
