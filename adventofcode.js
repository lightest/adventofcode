    //day3 part1
    function checkIfVisited(location, visited) {
        for(var i = 0; i < visited.length; i++) {
            if(visited[i][0] == location[0] && visited[i][1] == location[1]) {
                return true;
            }
        }
        return false;
    };

    function changePosition (instruction, cur) {
        if(instruction == '>') {
            cur[0]++;
        } else if (instruction == '<') {
            cur[0]--;
        } else if (instruction == '^') {
            cur[1]--;
        } else if (instruction == 'v') {
            cur[1]++;
        }
    }

    function santaTrip (directions) {
        var visitedHouses = [];
        var currentHouseSanta = [0,0];
        visitedHouses.push([0,0]);
        for(var i = 0; i < directions.length; i++) {
            changePosition(directions[i], currentHouseSanta);
            if(!checkIfVisited(currentHouseSanta, visitedHouses)) {
                visitedHouses.push([currentHouseSanta[0], currentHouseSanta[1]]);
            }
        }
        return visitedHouses.length;
    };

    //day3 part2
    function santaTrip2 (directions) {
        var visitedHouses = [];
        var currentHouseSanta = [0,0];
        var currentHouseRoboSanta = [0,0];
        visitedHouses.push([0,0]);
        for(var i = 0; i < directions.length; i+=2) {
            changePosition(directions[i], currentHouseSanta);
            changePosition(directions[i + 1], currentHouseRoboSanta);
            if(!checkIfVisited(currentHouseSanta, visitedHouses)) {
                visitedHouses.push([currentHouseSanta[0], currentHouseSanta[1]]);
            }
            if(!checkIfVisited(currentHouseRoboSanta, visitedHouses)) {
                visitedHouses.push([currentHouseRoboSanta[0], currentHouseRoboSanta[1]]);
            }
        }
        return visitedHouses.length;
    };

    //day4 part1
    var md5 = require('md5');
    function checkHash (hash) {
        var start = hash.substr(0,5);
        if(start == '00000') { return true; }
        return false;
    }

    function mine (input) {
        var postfix = 1;
        while (!checkHash(md5(input + postfix))) {
            postfix++;
        }
        return postfix;
    };

    //day5 part1
    function isNiceString (string) {
        var vowels = 'aeiou';
        var forbidden = ['ab', 'cd', 'pq', 'xy'];
        var vows = 0;
        var doubleLetters = false;
        for(var i = 0; i < string.length; i++) {
            if(vowels.indexOf(string[i]) != -1) {
                vows++;
            }
            if(!doubleLetters) {
                var check = string[i] + string[i]
                if(string.indexOf(check) != -1){
                    doubleLetters = true;
                }
            }
        }

        if(vows < 3) {
            console.log('vowels < 3');
            return false;
        } else if (!doubleLetters) {
            console.log('nodoubles');
            return false;
        }

        for(var i = 0; i < forbidden.length; i++) {
            if(string.indexOf(forbidden[i]) != -1) {
                console.log('has forbidden')
                return false;
            }
        }

        console.log('true');
        return true;
    };

    //day 5 part2
    function isNice2 (str) {
        var condition1 = false;
        var condition2 = false;
        for(var i = 0; i < str.length; i++) {
            var regexp = null;
            if(!condition1) {
                var check = str[i] + str[i+1];
                regexp = new RegExp(check, 'ig');
                var match = str.match(regexp);
                if(match && match.length >= 2) {
                    condition1 = true;
                }
            }
            if(!condition2) {
                regexp = new RegExp(str[i] + '\\w{1}' + str[i], 'ig');
                var match = str.match(regexp);
                if(match) {
                    condition2 = true;
                }
            }
            if(condition1 && condition2) {
                console.log('nice');
                return true;
            }
        }
        return false;
    };

    function day5 (input) {
        var data = input.split(',');
        var nice = 0;
        for(var i = 0; i < data.length; i++) {
            if(isNice2(data[i])) {
                nice++;
            }
        }
        console.log(nice);
        return nice;
    };