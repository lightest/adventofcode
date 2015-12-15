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

    //day 6
    function switchl(c1, c2, mode, grid) {
        for(var i = c1[0]; i <= c2[0]; i++) {
            for(var j = c1[1]; j <= c2[1]; j++) {
                if(mode == -1) { grid[i][j] = !grid[i][j]; } else {
                    grid[i][j] = mode || false;
                }
            }
        }
    };

    function switchl2(c1, c2, mode, grid) {
        for(var i = c1[0]; i <= c2[0]; i++) {
            for(var j = c1[1]; j <= c2[1]; j++) {
                grid[i][j] = Math.max(0, grid[i][j] + mode);
            }
        }
    };

    function generateGrid (m, n) {
        var grid = [];
        for(var i = 0; i < m; i++) {
            if(grid[i] == undefined) { grid[i] = []; }
            for(var j = 0; j < n; j++) {
                grid[i][j] = false;
            }
        }

        return grid;
    };

    function solveday6 (input) {
        var grid = generateGrid(1000, 1000);
        for(var i = 0; i < input.length; i++) {
            var corners = input[i].match(/\d+,\d+/g);
            var c1 = corners[0].split(',');
            var c2 = corners[1].split(',');
            c1[0] = parseInt(c1[0]);
            c1[1] = parseInt(c1[1]);
            c2[0] = parseInt(c2[0]);
            c2[1] = parseInt(c2[1]);
            var mode = input[i].match(/turn on|turn off|toggle/);
            mode = mode == 'turn on' ? true : mode == 'turn off' ? false : -1;
            switchl(c1, c2, mode, grid);
        }
        return lit(grid);
    };

    function solveday6_2(input) {
        var grid = generateGrid(1000, 1000);
        for(var i = 0; i < input.length; i++) {
            var corners = input[i].match(/\d+,\d+/g);
            var c1 = corners[0].split(',');
            var c2 = corners[1].split(',');
            c1[0] = parseInt(c1[0]);
            c1[1] = parseInt(c1[1]);
            c2[0] = parseInt(c2[0]);
            c2[1] = parseInt(c2[1]);
            var mode = input[i].match(/turn on|turn off|toggle/);
            mode = mode == 'turn on' ? 1 : mode == 'turn off' ? -1 : 2;
            switchl2(c1, c2, mode, grid);
        }
        return totalbrightness(grid);
    };

    function lit(grid) {
        var lita = 0;
         for(var i = 0; i < grid.length; i++) {
            for(var j = 0; j < grid[i].length; j++) {
                if(grid[i][j]) {
                    lita++;
                }
            }
        }
        return lita;
    }

    function totalbrightness (grid) {
        var total = 0;
        for(var i = 0; i < grid.length; i++) {
            for(var j = 0; j < grid[i].length; j++) {
                total += grid[i][j];
            }
        }
        return total;
    };


    //day 7
    function not16(val) {
        return ~(val << 16) >> 16;
    };

    function buildWires (input) {
        var wires = {};
        for(var i = input.length; --i >= 0;) {
            var instruction = input[i].split(' -> ');
            wires[instruction[1]] = {
                input: instruction[0],
                cached: null
            };
        }
        return wires;
    };


    function buildCircuit (input) {
        var wires = buildWires(input);

        function resolve (wire) {
            if(wire.cached != null) {
                console.log('wire', wire, 'resolved to', wire.cached);
                return wire.cached;
            }
            var result = null;
            if(!Number.isNaN(parseInt(wire.input))) {
                result = parseInt(wire.input);
                console.log('wire', wire, 'resolved to', result);
                wire.cached = result;
                return result;
            }
            
            var operation = wire.input.match(/LSHIFT|RSHIFT|AND|OR|NOT/);
            operation = operation != null ? operation[0] : operation;
            var dependency = wire.input.split(operation);
            var resolved = [];
            for(var i in dependency) {
                if(dependency[i] != '') {
                    if(!Number.isNaN(parseInt(dependency[i]))) {
                        resolved.push(parseInt(dependency[i]));
                    } else {
                        var unresolved = wires[dependency[i].trim()];
                        resolved.push(resolve(unresolved));
                    }
                }
            }
            switch(operation) {
                case 'NOT':
                    result = not16(resolved[0]);
                break;
                case 'LSHIFT':
                    result = resolved[0] >> resolved[1];
                break;
                case 'RSHIFT':
                    result = resolved[0] << resolved[1];
                break;
                case 'AND':
                    result = resolved[0] & resolved[1];
                break;
                case 'OR':
                    result = resolved[0] | resolved[1];
                break;
            }
            wire.cached = result;
            console.log('wire', wire, 'resolved to', result);
            return result;
        };

        return resolve(wires['a']);
    };