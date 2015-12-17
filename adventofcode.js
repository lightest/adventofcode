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
    var input = JSON.parse('["bn RSHIFT 2 -> bo","lf RSHIFT 1 -> ly","fo RSHIFT 3 -> fq","cj OR cp -> cq","fo OR fz -> ga","t OR s -> u","lx -> a","NOT ax -> ay","he RSHIFT 2 -> hf","lf OR lq -> lr","lr AND lt -> lu","dy OR ej -> ek","1 AND cx -> cy","hb LSHIFT 1 -> hv","1 AND bh -> bi","ih AND ij -> ik","c LSHIFT 1 -> t","ea AND eb -> ed","km OR kn -> ko","NOT bw -> bx","ci OR ct -> cu","NOT p -> q","lw OR lv -> lx","NOT lo -> lp","fp OR fv -> fw","o AND q -> r","dh AND dj -> dk","ap LSHIFT 1 -> bj","bk LSHIFT 1 -> ce","NOT ii -> ij","gh OR gi -> gj","kk RSHIFT 1 -> ld","lc LSHIFT 1 -> lw","lb OR la -> lc","1 AND am -> an","gn AND gp -> gq","lf RSHIFT 3 -> lh","e OR f -> g","lg AND lm -> lo","ci RSHIFT 1 -> db","cf LSHIFT 1 -> cz","bn RSHIFT 1 -> cg","et AND fe -> fg","is OR it -> iu","kw AND ky -> kz","ck AND cl -> cn","bj OR bi -> bk","gj RSHIFT 1 -> hc","iu AND jf -> jh","NOT bs -> bt","kk OR kv -> kw","ks AND ku -> kv","hz OR ik -> il","b RSHIFT 1 -> v","iu RSHIFT 1 -> jn","fo RSHIFT 5 -> fr","be AND bg -> bh","ga AND gc -> gd","hf OR hl -> hm","ld OR le -> lf","as RSHIFT 5 -> av","fm OR fn -> fo","hm AND ho -> hp","lg OR lm -> ln","NOT kx -> ky","kk RSHIFT 3 -> km","ek AND em -> en","NOT ft -> fu","NOT jh -> ji","jn OR jo -> jp","gj AND gu -> gw","d AND j -> l","et RSHIFT 1 -> fm","jq OR jw -> jx","ep OR eo -> eq","lv LSHIFT 15 -> lz","NOT ey -> ez","jp RSHIFT 2 -> jq","eg AND ei -> ej","NOT dm -> dn","jp AND ka -> kc","as AND bd -> bf","fk OR fj -> fl","dw OR dx -> dy","lj AND ll -> lm","ec AND ee -> ef","fq AND fr -> ft","NOT kp -> kq","ki OR kj -> kk","cz OR cy -> da","as RSHIFT 3 -> au","an LSHIFT 15 -> ar","fj LSHIFT 15 -> fn","1 AND fi -> fj","he RSHIFT 1 -> hx","lf RSHIFT 2 -> lg","kf LSHIFT 15 -> kj","dz AND ef -> eh","ib OR ic -> id","lf RSHIFT 5 -> li","bp OR bq -> br","NOT gs -> gt","fo RSHIFT 1 -> gh","bz AND cb -> cc","ea OR eb -> ec","lf AND lq -> ls","NOT l -> m","hz RSHIFT 3 -> ib","NOT di -> dj","NOT lk -> ll","jp RSHIFT 3 -> jr","jp RSHIFT 5 -> js","NOT bf -> bg","s LSHIFT 15 -> w","eq LSHIFT 1 -> fk","jl OR jk -> jm","hz AND ik -> im","dz OR ef -> eg","1 AND gy -> gz","la LSHIFT 15 -> le","br AND bt -> bu","NOT cn -> co","v OR w -> x","d OR j -> k","1 AND gd -> ge","ia OR ig -> ih","NOT go -> gp","NOT ed -> ee","jq AND jw -> jy","et OR fe -> ff","aw AND ay -> az","ff AND fh -> fi","ir LSHIFT 1 -> jl","gg LSHIFT 1 -> ha","x RSHIFT 2 -> y","db OR dc -> dd","bl OR bm -> bn","ib AND ic -> ie","x RSHIFT 3 -> z","lh AND li -> lk","ce OR cd -> cf","NOT bb -> bc","hi AND hk -> hl","NOT gb -> gc","1 AND r -> s","fw AND fy -> fz","fb AND fd -> fe","1 AND en -> eo","z OR aa -> ab","bi LSHIFT 15 -> bm","hg OR hh -> hi","kh LSHIFT 1 -> lb","cg OR ch -> ci","1 AND kz -> la","gf OR ge -> gg","gj RSHIFT 2 -> gk","dd RSHIFT 2 -> de","NOT ls -> lt","lh OR li -> lj","jr OR js -> jt","au AND av -> ax","0 -> c","he AND hp -> hr","id AND if -> ig","et RSHIFT 5 -> ew","bp AND bq -> bs","e AND f -> h","ly OR lz -> ma","1 AND lu -> lv","NOT jd -> je","ha OR gz -> hb","dy RSHIFT 1 -> er","iu RSHIFT 2 -> iv","NOT hr -> hs","as RSHIFT 1 -> bl","kk RSHIFT 2 -> kl","b AND n -> p","ln AND lp -> lq","cj AND cp -> cr","dl AND dn -> do","ci RSHIFT 2 -> cj","as OR bd -> be","ge LSHIFT 15 -> gi","hz RSHIFT 5 -> ic","dv LSHIFT 1 -> ep","kl OR kr -> ks","gj OR gu -> gv","he RSHIFT 5 -> hh","NOT fg -> fh","hg AND hh -> hj","b OR n -> o","jk LSHIFT 15 -> jo","gz LSHIFT 15 -> hd","cy LSHIFT 15 -> dc","kk RSHIFT 5 -> kn","ci RSHIFT 3 -> ck","at OR az -> ba","iu RSHIFT 3 -> iw","ko AND kq -> kr","NOT eh -> ei","aq OR ar -> as","iy AND ja -> jb","dd RSHIFT 3 -> df","bn RSHIFT 3 -> bp","1 AND cc -> cd","at AND az -> bb","x OR ai -> aj","kk AND kv -> kx","ao OR an -> ap","dy RSHIFT 3 -> ea","x RSHIFT 1 -> aq","eu AND fa -> fc","kl AND kr -> kt","ia AND ig -> ii","df AND dg -> di","NOT fx -> fy","k AND m -> n","bn RSHIFT 5 -> bq","km AND kn -> kp","dt LSHIFT 15 -> dx","hz RSHIFT 2 -> ia","aj AND al -> am","cd LSHIFT 15 -> ch","hc OR hd -> he","he RSHIFT 3 -> hg","bn OR by -> bz","NOT kt -> ku","z AND aa -> ac","NOT ak -> al","cu AND cw -> cx","NOT ie -> if","dy RSHIFT 2 -> dz","ip LSHIFT 15 -> it","de OR dk -> dl","au OR av -> aw","jg AND ji -> jj","ci AND ct -> cv","dy RSHIFT 5 -> eb","hx OR hy -> hz","eu OR fa -> fb","gj RSHIFT 3 -> gl","fo AND fz -> gb","1 AND jj -> jk","jp OR ka -> kb","de AND dk -> dm","ex AND ez -> fa","df OR dg -> dh","iv OR jb -> jc","x RSHIFT 5 -> aa","NOT hj -> hk","NOT im -> in","fl LSHIFT 1 -> gf","hu LSHIFT 15 -> hy","iq OR ip -> ir","iu RSHIFT 5 -> ix","NOT fc -> fd","NOT el -> em","ck OR cl -> cm","et RSHIFT 3 -> ev","hw LSHIFT 1 -> iq","ci RSHIFT 5 -> cl","iv AND jb -> jd","dd RSHIFT 5 -> dg","as RSHIFT 2 -> at","NOT jy -> jz","af AND ah -> ai","1 AND ds -> dt","jx AND jz -> ka","da LSHIFT 1 -> du","fs AND fu -> fv","jp RSHIFT 1 -> ki","iw AND ix -> iz","iw OR ix -> iy","eo LSHIFT 15 -> es","ev AND ew -> ey","ba AND bc -> bd","fp AND fv -> fx","jc AND je -> jf","et RSHIFT 2 -> eu","kg OR kf -> kh","iu OR jf -> jg","er OR es -> et","fo RSHIFT 2 -> fp","NOT ca -> cb","bv AND bx -> by","u LSHIFT 1 -> ao","cm AND co -> cp","y OR ae -> af","bn AND by -> ca","1 AND ke -> kf","jt AND jv -> jw","fq OR fr -> fs","dy AND ej -> el","NOT kc -> kd","ev OR ew -> ex","dd OR do -> dp","NOT cv -> cw","gr AND gt -> gu","dd RSHIFT 1 -> dw","NOT gw -> gx","NOT iz -> ja","1 AND io -> ip","NOT ag -> ah","b RSHIFT 5 -> f","NOT cr -> cs","kb AND kd -> ke","jr AND js -> ju","cq AND cs -> ct","il AND in -> io","NOT ju -> jv","du OR dt -> dv","dd AND do -> dq","b RSHIFT 2 -> d","jm LSHIFT 1 -> kg","NOT dq -> dr","bo OR bu -> bv","gk OR gq -> gr","he OR hp -> hq","NOT h -> i","hf AND hl -> hn","gv AND gx -> gy","x AND ai -> ak","bo AND bu -> bw","hq AND hs -> ht","hz RSHIFT 1 -> is","gj RSHIFT 5 -> gm","g AND i -> j","gk AND gq -> gs","dp AND dr -> ds","b RSHIFT 3 -> e","gl AND gm -> go","gl OR gm -> gn","y AND ae -> ag","hv OR hu -> hw","1674 -> b","ab AND ad -> ae","NOT ac -> ad","1 AND ht -> hu","NOT hn -> ho"]');
    
    function not16(val) {
        return ~(val << 16) >>> 16;
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
                    result = resolved[0] << resolved[1];
                break;
                case 'RSHIFT':
                    result = resolved[0] >>> resolved[1];
                break;
                case 'AND':
                    result = resolved[0] & resolved[1];
                break;
                case 'OR':
                    result = resolved[0] | resolved[1];
                break;
                default:
                    result = resolved[0];
                break;
            }
            wire.cached = result;
            console.log('wire', wire, 'resolved to', result);
            return result;
        };

        return resolve(wires['a']);
    };

    buildCircuit(input);