(function () {
    'use strict';

    angular.module('app.station')
    .controller('stationMapCtrl', ['$scope', '$timeout', stationMapCtrl]);

    function stationMapCtrl($scope, $timeout) {

        $scope.targets = [
            {"id":1, "level":"2", "category":"1", "space":"办公室", "name":"张三"},
            {"id":2, "level":"1", "category":"1", "space":"讯询问室（1）", "name":"李四"},
            {"id":3, "level":"1", "category":"1", "space":"讯询问室（1）", "name":"王五"},
            {"id":4, "level":"1", "category":"1", "space":"人身安全检查室", "name":"赵六"},
            {"id":5, "level":"2", "category":"1", "space":"办公室", "name":"钱七"},
            {"id":6, "level":"1", "category":"2", "status":"醒酒中", "space":"醒酒室", "name":"孙八"},
            {"id":7, "level":"1", "category":"2", "status":"讯询问中", "space":"讯询问室（1）", "name":"周九"},
            {"id":8, "level":"1", "category":"2", "status":"等候中", "space":"讯询问室（2）", "name":"吴十"},
            {"id":9, "level":"1", "category":"2", "status":"看管候问中", "space":"看管候问室", "name":"郑十一"}
        ];

        $scope.levels = [{level: 1}, {level: 2}, {level: 3}, {level: 4}];
        $scope.showingSurroundings = true;

        // $timeout(function() {
        //     $scope.showLevel(1);
        // }, 3000);

        /**
         * Opens a level. The current level moves to the center while the other ones move away.
         */
        $scope.showLevel = function(level) {
            if( $scope.isExpanded ) {
                return false;
            }
            
            $scope.selectedLevel = level;

            // $scope.showPins();
            $scope.isExpanded = true;

            $scope.hideSurroundings();
            
            // show mall nav ctrls
            $scope.showMallNav();
        }

        /**
         * Shows all Mall´s levels
         */
        $scope.showAllLevels = function() {

            if( $scope.isNavigating || !$scope.isExpanded ) {
                return false;
            }

            $scope.selectedLevel = null;

            $scope.isExpanded = false;

            // shows surrounding element
            $scope.showSurroundings();
            
            // hide mall nav ctrls
            $scope.hideMallNav();

            // close content area if it is open
            if( $scope.isOpenContentArea ) {
                $scope.closeContentArea();
            }
        }

        /**
         * Show the navigation ctrls
         */
        $scope.showMallNav = function() {
            $scope.showingMallNav = true;
        }

        /**
         * Hide the navigation ctrls
         */
        $scope.hideMallNav = function() {
            $scope.showingMallNav = false;
        }

        /**
         * Show the surroundings level
         */
        $scope.showSurroundings = function() {
            $scope.showingSurroundings = true;
        }

        /**
         * Hide the surroundings level
         */
        $scope.hideSurroundings = function() {
            $scope.showingSurroundings = false;
        }

        /**
         * Navigate through the mall´s levels
         */
        $scope.navigate = function(direction) {
            console.log($scope.isNavigating, $scope.isExpanded, $scope.isOpenContentArea)
            if( $scope.isNavigating || !$scope.isExpanded || $scope.isOpenContentArea ) {
                return false;
            }

            $scope.isNavigating = true;

            $scope.prevSelectedLevel = $scope.selectedLevel;

            if( direction === 'Up' && $scope.prevSelectedLevel < $scope.levels.length ) {
                ++$scope.selectedLevel;
            }
            else if( direction === 'Down' && $scope.prevSelectedLevel > 1 ) {
                --$scope.selectedLevel;
            }
            else {
                $scope.isNavigating = false;    
                return false;
            }

            $scope.movingOutDirection = direction;

            // $scope.removePins();
        }

        /**
         * Opens/Reveals a content item.
         */
        $scope.openContent = function(spacerefval) {
            // if one already shown:
            if( $scope.isOpenContentArea ) {
                $scope.hideSpace();
                $scope.spaceref = spacerefval;
                $scope.showSpace();
            }
            else {
                $scope.spaceref = $scope.spacerefval;
                $scope.openContentArea();
            }
        }

        /**
         * Opens the content area.
         */
        $scope.openContentArea = function() {
            $scope.isOpenContentArea = true;
            $scope.showSpace(true);
        }

        /**
         * Shows a space.
         */
        $scope.showSpace = function(sliding) {
            $scope.showingSpace = true;
        }

        /**
         * Closes the content area.
         */
        $scope.closeContentArea = function() {
            $scope.slidingSpace = false;
            $scope.isOpenContentArea = false;
            $scope.hideSpace();
        }

        /**
         * Hides a space.
         */
        $scope.hideSpace = function(){
            $scope.showingSpace = false;
        }

        /**
         * for smaller screens: open search bar
         */
        $scope.openSearch = function() {
            $scope.showAllLevels();
            $scope.isSpaceListOpen = true;
        }

        /**
         * for smaller screens: close search bar
         */
        $scope.closeSearch = function() {
            $scope.isSpaceListOpen = false;
        }

    }

})();