/**
 * Created by lcom23_two on 1/30/2017.
 */
function stretch() {
    return {
        restrict : 'A',
        link : function ($scope,$element,$attr) {
                var element  = $element[0];

            element.addEventListener('focus',function () {
                this.style.width = 500;
                console.log("focus event");
            });
            element.addEventListener('blur',function () {
                this.style.width = 120;
            });
        }
    };
}
angular.module("app",[]).directive("stretch",stretch);