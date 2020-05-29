const baseURL = "https://api.collegefootballdata.com/";
const conferencsURL = "https://api.collegefootballdata.com/conferences";

const independents = "https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa_conf/500/18.png";
const fcsLogo = "https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa_conf/500/32.png";

var myChart; //Global declaration so it can be destroyed before writing a new one.

let conferenceStrings = {
    acc: "acc",
    b12: "b12",
    b1g: "b1g",
    sec: "sec",
    pac: "pac"
}

//This is nasty, but better than doing a conf lookup and search to get to the team logo link
const logoLookups = {
            //School : [ID, Primary Color, Secondary Color]
            "Alabama" : [333, "#690014", "#f1f2f3"],
            "Arkansas" : [8, "#9c1831", "#000000"],
            "Auburn" : [2, "#03244d", "#f1f2f3"],
            "Florida" : [57, "#0021A5", "#0021a5"],
            "Georgia" : [61, "#CC0000", "#000000"],
            "Kentucky" : [96, "#005DAA", "#ffffff"],
            "LSU" : [99, "#22005c", "#fdd023"],
            "Mississippi State" : [344, "#762123", "#c8c8c8"],
            "Missouri" : [142, "#000000", "#000000"],
            "Ole Miss" : [145, "#001148", "#00205b"],
            "South Carolina" : [2579, "#670010", "#000000"],
            "Tennessee" : [2633, "#EE9627", "#ffffff"],
            "Texas A&M" : [245, "#5C0025", "#ffffff"],
            "Vanderbilt" : [238, "#000000", "#231f20"],
            "Arizona" : [12, "#002449", "#00205b"],
            "Arizona State" : [9, "#942139", "#f1f2f3"],
            "California" : [25, "#031522", "#ffc423"],
            "Colorado" : [38, "#d1c57e", "#ffd200"],
            "Oregon" : [2483, "#044520", "#fee123"],
            "Oregon State" : [204, "#c34500", "#dea076"],
            "Stanford" : [24, "#A80532", "#ffffff"],
            "UCLA" : [26, "#005C8E", "#ffc72c"],
            "USC" : [30, "#AE2531", "#ffc72c"],
            "Utah" : [254, "#890012", "#7e8083"],
            "Washington" : [264, "#2B2F64", "#e8e3d3"],
            "Washington State" : [265, "#94022a", "#6a747c"],
            "Boston College" : [103, "#88001a", "#a39161"],
            "Clemson" : [228, "#F66733", "#522d80"],
            "Duke" : [150, "#001A57", "#f1f2f3"],
            "Florida State" : [52, "#782F40", "#ceb888"],
            "Georgia Tech" : [59, "#00223e", "#002c56"],
            "Louisville" : [97, "#ad000a", "#cccccc"],
            "Miami" : [2390, "#004325", "#f0f0f0"],
            "NC State" : [152, "#EF1216", "#231f20"],
            "North Carolina" : [153, "#99bfe5", "#13294b"],
            "Pittsburgh" : [221, "#003263", "#231f20"],
            "Syracuse" : [183, "#F37321", "#0d1d37"],
            "Virginia" : [258, "#00204e", "#002d62"],
            "Virginia Tech" : [259, "#74232D", "#c2c1ba"],
            "Wake Forest" : [154, "#9E7E38", "#000000"],
            "Cincinnati" : [2132, "#000000", "#717073"],
            "Connecticut" : [41, "#001d40", "#f1f2f3"],
            "East Carolina" : [151, "#4b1869", "#f0907b"],
            "Houston" : [248, "#C90822", "#231f20"],
            "Memphis" : [235, "#002447", "#231f20"],
            "Navy" : [2426, "#131630", "#b6a77c"],
            "SMU" : [2567, "#E32F38", "#ecdcb9"],
            "South Florida" : [58, "#004A36", "#231f20"],
            "Temple" : [218, "#A80532", "#a7a9ac"],
            "Tulane" : [2655, "#005837", "#3baf29"],
            "Tulsa" : [202, "#004371", "#ee3b33"],
            "UCF" : [2116, "#000000", "#231f20"],
            "Illinois" : [356, "#f77329", "#fa6300"],
            "Indiana" : [84, "#7D110C", "#eeedeb"],
            "Iowa" : [2294, "#000000", "#ffe100"],
            "Maryland" : [120, "#D5002B", "#ffcd00"],
            "Michigan" : [130, "#00274c", "#ffcb05"],
            "Michigan State" : [127, "#18453B", "#ffffff"],
            "Minnesota" : [135, "#7F011B", "#7a0019"],
            "Nebraska" : [158, "#F20017", "#f5f1e7"],
            "Northwestern" : [77, "#372286", "#d6cac1"],
            "Ohio State" : [194, "#DE3121", "#666666"],
            "Penn State" : [213, "#00265D", "#002e5c"],
            "Purdue" : [2509, "#B89D29", "#a4a9ad"],
            "Rutgers" : [164, "#d21034", "#ffffff"],
            "Wisconsin" : [275, "#A00001", "#f7f7f7"],
            "Air Force" : [2005, "#004a7b", "#ffffff"],
            "Boise State" : [68, "#09347A", "#d8d9da"],
            "Colorado State" : [36, "#004537", "#ffc425"],
            "Fresno State" : [278, "#c41230", "#231f20"],
            "Hawai'i" : [62, "#003420", "#ffffff"],
            "Nevada" : [2440, "#153E5F", "#8e9295"],
            "New Mexico" : [167, "#000000", "#231f20"],
            "San Diego State" : [21, "#BF2C37", "#a8996e"],
            "San José State" : [23, "#005893", "#fdba31"],
            "UNLV" : [2439, "#000000", "#c2c4c6"],
            "Utah State" : [328, "#003263", "#949ca1"],
            "Wyoming" : [2751, "#533B22", "#ffffff"],
            "Charlotte" : [2429, "#0C562D", "#cfab7a"],
            "Florida Atlantic" : [2226, "#004B85", "#bb2f4c"],
            "Florida International" : [2229, "#001538", "#c5960c"],
            "Louisiana Tech" : [2348, "#002d65", "#d3313a"],
            "Marshall" : [276, "#186329", "#be854c"],
            "Middle Tennessee" : [2393, "#0079C2", "#c3c5c8"],
            "North Texas" : [249, "#00853D", "#000000"],
            "Old Dominion" : [295, "#00507d", "#a1d2f1"],
            "Rice" : [242, "#003D7D", "#d1d5d8"],
            "Southern Mississippi" : [2572, "#FFAA3C", "#ffc423"],
            "UAB" : [5, "#003b28", "#ffc845"],
            "UTEP" : [2638, "#002843", "#ff6f12"],
            "UT San Antonio" : [2636, "#002A5C", "#f47321"],
            "Western Kentucky" : [98, "#F32026", "#b3b5b8"],
            "Akron" : [2006, "#00285e", "#84754e"],
            "Ball State" : [2050, "#DA0000", "#ffffff"],
            "Bowling Green" : [189, "#2b1000", "#492000"],
            "Buffalo" : [2084, "#041A9B", "#ebebeb"],
            "Central Michigan" : [2117, "#6a0032", "#ffffff"],
            "Eastern Michigan" : [2199, "#00331b", "#f0f0f0"],
            "Kent State" : [2309, "#002445", "#f0b510"],
            "Miami (OH)" : [193, "#a4000c", "#f0f0f0"],
            "Northern Illinois" : [2459, "#F1122C", "#cc0000"],
            "Ohio" : [195, "#295A29", "#e4bb85"],
            "Toledo" : [2649, "#00488F", "#ffd51d"],
            "Western Michigan" : [2711, "#B59966", "#bfa979"],
            "Appalachian State" : [2026, "#000000", "#ffcd00"],
            "Arkansas State" : [2032, "#e81018", "#000000"],
            "Coastal Carolina" : [324, "#007073", "#876447"],
            "Georgia Southern" : [290, "#003775", "#f0f0f0"],
            "Georgia State" : [2247, "#1e539a", "#ebebeb"],
            "Louisiana" : [309, "#ce2842", "null"],
            "Louisiana Monroe" : [2433, "#231F20", "#b18445"],
            "South Alabama" : [6, "#003E7E", "null"],
            "Texas State" : [326, "#4e1719", "#b4975a"],
            "Troy" : [2653, "#AE0210", "#88898c"],
            "Army" : [349, "#ce9c00", "#231f20"],
            "BYU" : [252, "#001E4C", "#ffffff"],
            "Liberty" : [2335, "#071740", "#a61f21"],
            "New Mexico State" : [166, "#891216", "#000000"],
            "Notre Dame" : [87, "#00122b", "#ae9142"],
            "UMass" : [113, "#880007", "null"],
            "Baylor" : [239, "#004834", "#ffb81c"],
            "Iowa State" : [66, "#660015", "#830b2c"],
            "Kansas" : [2305, "#0022B4", "#e8000d"],
            "Kansas State" : [2306, "#633194", "#e7d2ad"],
            "Oklahoma" : [201, "#7b0000", "#cccccc"],
            "Oklahoma State" : [197, "#FF6500", "#ff9900"],
            "TCU" : [2628, "#3C377D", "#f1f2f3"],
            "Texas" : [251, "#EE7524", "#f0f0f0"],
            "Texas Tech" : [2641, "#C80025", "#231f20"],
            "West Virginia" : [277, "#FFC600", "#eaaa00"],
}

let games = [];
let ts;

const summer = (a, c) => a + c;

class teamStats {
    constructor(school) {
        this.numGames = 0;
        this.school = school;
        this.record = [0, 0];       //[W, L]
        this.location = [];         //For storing home (1) or away (0)
        this.opponent = [];         //Storing 'School' names for logo lookup
        this.gameID = [];
        this.pointsScored = [];     //Off
        this.pointsAllowed = [];    //Def
        this.yards = [];            //Off
        this.rushYards = [];        //Off
        this.passYards = [];        //Off
        this.rushTD = [];           //Off
        this.passTD = [];           //Off
        this.compAtt = [];          //Off
        this.sacks = [];            //Off
        this.turnoversLost = [];    //Off
        this.yardsDef = [];         //Def
        this.rushYardsDef = [];     //Def
        this.passYardsDef = [];     //Def
        this.rushTDDef = [];        //Def
        this.passTDDef = [];        //Def
        this.sacked = [];           //Def
        this.turnoversGain = [];    //Def
    }

    parseGame(game) {
        //Expects a json object of a single game instance
        this.gameID.push(game.id);
        let gameIndex = this.numGames;
        this.numGames++;
        let off = (this.school == game.teams[0].school) ? 0 : 1; //Setting the teams index for this teams offense
        let def = off ? 0 : 1; //Swapping teams index for this teams defense
        this.location[gameIndex] = (game.teams[off].homeAway === "home") ? 1 : 0;
        this.opponent[gameIndex] = game.teams[def].school;
        this.pointsScored[gameIndex] = (game.teams[off].points);
        this.pointsAllowed[gameIndex] = (game.teams[def].points);
        if (this.pointsScored[gameIndex] > this.pointsAllowed[gameIndex]){
            this.record[0]++;
        } else {
            this.record[1]++;
        }
        for(let i = 0; i < game.teams[off].stats.length; i++) {
            //Going through all the elements of the json object. There is more data than what I'm using.
            //First for loop is for the main team, collecting offensive stats
            switch (game.teams[off].stats[i].category) {
                case "totalYards":
                    this.yards[gameIndex] = Number(game.teams[off].stats[i].stat);
                    break;
                case "rushingYards":
                    this.rushYards[gameIndex] = Number(game.teams[off].stats[i].stat);
                    break;
                case "netPassingYards":
                    this.passYards[gameIndex] = Number(game.teams[off].stats[i].stat);
                    break;
                case "rushingTDs":
                    this.rushTD[gameIndex] = Number(game.teams[off].stats[i].stat);
                    break;
                case "passingTDs":
                    this.passTD[gameIndex] = Number(game.teams[off].stats[i].stat);
                    break;
                case "completionAttempts":
                    this.compAtt[gameIndex] = game.teams[off].stats[i].stat.split('-').map(Number);
                    //Filling this array with num arrays for [comp, att]
                    break;
                case "sacks":
                    this.sacks[gameIndex] = Number(game.teams[off].stats[i].stat);
                    break;
                case "turnovers":
                    this.turnoversLost[gameIndex] = Number(game.teams[off].stats[i].stat);
                    break;
                default:
                    break;
            }
        }
        for(let i = 0; i < game.teams[def].stats.length; i++) {
            //This for loop collects information from the opposing team
            switch (game.teams[def].stats[i].category) {
                case "totalYards":
                    this.yardsDef[gameIndex] = Number(game.teams[def].stats[i].stat);
                    break;
                case "rushingYards":
                    this.rushYardsDef[gameIndex] = Number(game.teams[def].stats[i].stat);
                    break;
                case "netPassingYards":
                    this.passYardsDef[gameIndex] = Number(game.teams[def].stats[i].stat);
                    break;
                case "rushingTDs":
                    this.rushTDDef[gameIndex] = Number(game.teams[def].stats[i].stat);
                    break;
                case "passingTDs":
                    this.passTDDef[gameIndex] = Number(game.teams[def].stats[i].stat);
                    break;
                case "sacks":
                    this.sacked[gameIndex] = Number(game.teams[def].stats[i].stat);
                    break;
                case "sacks":
                    this.sacks[gameIndex] = Number(game.teams[def].stats[i].stat);
                    break;
                case "turnovers":
                    this.turnoversGain[gameIndex] = Number(game.teams[def].stats[i].stat);
                    break;
                default:
                    break;
            }
        }
    }
}

let teams = []; //For tracking data of teams to display
let teamNameLookup = {}; //For a reverse id to teams index lookup

function resetPage() {
    games = [];
    teams = [];
    document.getElementById("teams-container").style.display = "none"; //Unhiding teams page
    document.getElementById("teams-container").textContent = "";
    document.getElementById("single-team-container").style.display = "none"; //Unhiding teams page
    document.getElementById("games-column").textContent = "";
    document.getElementById("game-container").style.display = "none"; //Unhiding teams page
    document.getElementById("conferences-container").style.display = "block"; //Showing Conferences
}

async function getData(localurl) {
    return response = await axios.get(localurl)
}

async function populateTeams(conferenceToDisplay){
    //teams = [];
    teamNameLookup = {};
    //This function will hide (none) the conferences page and display the teams in a conference
    var URL = baseURL + "teams?conference=" + conferenceToDisplay;
    //Making the API call
    await getData(URL)
        .then(response => {
        for (let i = 0; i < response.data.length; i++) {
            teams.push(response.data[i]);
            teamNameLookup[response.data[i].alt_name2] = i;
        }
    });
    confPage = document.getElementById("conferences-container")
    confPage.style.display = "none"; //Hiding conferences
    var page = document.getElementById("teams-container");
    page.style.display = "block"; //Unhiding teams page
    var row, deck;
    for (let i = 0, j = 1; i < teams.length; i++) {
        //Iterating through the fetched teams to display their logos as buttons
        //Creating card elements just like the fixed elements of conferences
        //console.log(teams[i].school);
        if(i % 3 == 0) {
            //Putting out 3 per row
            row = document.createElement("div");
            row.classList.add("row", "justify-content-center", "m-2");
            row.setAttribute("id", `teams-row${j}`);
            page.appendChild(row);
            deck = document.createElement("div");
            deck.classList.add("card-deck", `col-${(teams.length - i) >= 3? "lg-12" : "sm-" + (teams.length -i)*4}`);
            deck.setAttribute("id", `teams-deck${j}`);
            row.appendChild(deck);
            j++;
        }
        let team = document.createElement("div");
        team.classList.add("card");
        team.setAttribute("id", `${teams[i].alt_name2}-card`);
        //img = teams[i].logos[0] + imgSize;
        team.innerHTML = `<a href="#" class="btn btn-fix text-center" id="${teams[i].alt_name2}" onclick="showTeamData('${teams[i].school}')">
                            <img class=card-img-top img-responsive" id="${teams[i].alt_name2}-img" src="${teams[i].logos[0]}" >
                            <div class="card-block">
                                <h4 class=card-title">${teams[i].school}</h4>
                            </div>
                        </a>`
        deck.appendChild(team);
    }
    console.log(teams);
    console.log(teams.length);
}

//populateTeams("aac");

async function showTeamData(teamToShow) {
    console.log(teamToShow)
    games = [];
    document.getElementById("teams-container").style.display = "none"; //Hiding conferences if necessary
    document.getElementById('game-container').style.display = "none"; //Hiding game data if necessary
    document.getElementById("single-team-container").style.display = "block"; //Unhiding teams page
    if(ts !== undefined && ts.school == teamToShow) {
        //This data is already showing, lets not fetch it again
        return;
    }
    document.getElementById("games-column").textContent = ''; //TODid propagate this clearing method to other areas instead of innerHTML. stackoverflow.com/questions/3955229 says is faster.
    for (let el of document.querySelectorAll('.season-data')) el.style.visibility = 'hidden'; //Hide stats for when already filled stackoverflow.com/questions/18414384
    console.log(teamToShow);
    //Takes a team.school string from the team object
    let year = "2019";
    let teamURLname = teamToShow.replace(/ /g, "%20"); //convert spaces to URL spaces

    let gamesURL = baseURL + "games/teams?year=" + year + "&team=" + teamURLname + "&week=";
    //If the week is not included, then the game data is not organized in any coherent way

    ts = new teamStats(teamToShow) 
    document.getElementById("team-name").textContent = `${ts.school}`;
    for (let i = 0; i < 16; i++){
        //Getting data for all 16 weeks of games, including week 0
        await getData(gamesURL + i)
            .then(response => {
                if(typeof response.data[0] !== "undefined"){
                    //Filtering BYE weeks
                    games.push(response.data[0]);
                    ts.parseGame(response.data[0])
                }
        });
    }
    console.log(games);
    console.log(ts);
    fillSeasonTable();
    for (let el of document.querySelectorAll('.season-data')) el.style.visibility = ''; //unhide stats
    fillGamesList(teamToShow); 
}

function fillGamesList(school) {
    let gamesCol = document.getElementById("games-column");
    let record = document.createElement("div");
    record.classList.add("row", "border")
    record.innerHTML = `<div class="col-12 text-center" id="team-record"></div>`
    let homeAway = document.createElement("div");
    homeAway.classList.add("row", "border")
    homeAway.innerHTML = `<div class="col-6 text-left" id="home">Home</div>
                    <div class="col-6 text-right" id="away">Away</div>`
    gamesCol.appendChild(record);
    gamesCol.appendChild(homeAway);
    document.getElementById("team-record").textContent = `Record: ${ts.record[0]} - ${ts.record[1]}`;
    let teamLogo = `http://a.espncdn.com/i/teamlogos/ncaa/500/${logoLookups[school][0]}.png`;
    for(let i = 0; i < ts.numGames; i++){
        let game = document.createElement("div");
        game.classList.add("row", "border");
        let oppLogo;
        let fbs = true;
        if (logoLookups[ts.opponent[i]] === undefined) {
            oppLogo = fcsLogo;
            fbs = false;
        } else {
            oppLogo = `http://a.espncdn.com/i/teamlogos/ncaa/500/${logoLookups[ts.opponent[i]][0]}.png`;
        }
        let team1 = document.createElement("img");
        let team2 = document.createElement("img");
        let score = document.createElement("u");
        score.classList.add("clickable-row", "col-6", "text-center", "align-self-center", "font-weight-bold",(((ts.pointsScored[i]-ts.pointsAllowed[i]) > 0) ? "text-success" : "text-danger"),);
        score.textContent = `${ts.location[i] ? ts.pointsScored[i] : ts.pointsAllowed[i]}-${ts.location[i] ? ts.pointsAllowed[i] : ts.pointsScored[i]}`;
        score.addEventListener("click", function() {showGameData(ts.gameID[i])})
        team1.classList.add("col-3", "img-responsive")
        team2.classList.add("col-3", "img-responsive")
        if (ts.location[i]) {
            team1.src = teamLogo;
            team2.src = oppLogo;
            if(fbs) {
                team2.classList.add("clickable-row");
                team2.addEventListener("click", function() {showTeamData(ts.opponent[i])} );
            }
        } else {
            team2.src = teamLogo;
            team1.src = oppLogo;
            if(fbs) {
                team1.classList.add("clickable-row");
                team1.addEventListener("click", function () {showTeamData(ts.opponent[i])} );
            }
        }
        game.appendChild(team1);
        game.appendChild(score);
        game.appendChild(team2);
        gamesCol.appendChild(game);

    }
}

function fillSeasonTable() {
    //Filling in Stats Table Data
    let sum;
    //Points Scored
    sum = ts.pointsScored.reduce(summer);
    document.getElementById("points-data-avg").textContent = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("points-data-total").textContent = `${sum}`;
    //Yards Gained
    sum = ts.yards.reduce(summer);
    document.getElementById("yards-data-avg").textContent = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("yards-data-total").textContent = `${sum}`;
    //Pass Yards Gained
    sum = ts.passYards.reduce(summer);
    document.getElementById("pass-yards-data-avg").textContent = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("pass-yards-data-total").textContent = `${sum}`;
    //Rush Yards Gained
    sum = ts.rushYards.reduce(summer);
    document.getElementById("rush-yards-data-avg").textContent = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("rush-yards-data-total").textContent = `${sum}`;
    //Pass Touchdowns
    sum = ts.passTD.reduce(summer);
    document.getElementById("pass-td-data-avg").textContent = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("pass-td-data-total").textContent = `${sum}`;
    //Rush Touchdowns
    sum = ts.rushTD.reduce(summer);
    document.getElementById("rush-td-data-avg").textContent = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("rush-td-data-total").textContent = `${sum}`;
    //Sacks Allowed
    sum = ts.sacked.reduce(summer);
    document.getElementById("sacks-allowed-data-avg").textContent = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("sacks-allowed-data-total").textContent = `${sum}`;
    //Turnovers Lost
    sum = ts.turnoversLost.reduce(summer);
    document.getElementById("turnovers-lost-data-avg").textContent = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("turnovers-lost-data-total").textContent = `${sum}`;
    //Points Allowed
    sum = ts.pointsAllowed.reduce(summer);
    document.getElementById("points-allowed-data-avg").textContent = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("points-allowed-data-total").textContent = `${sum}`;
    //Yards Allowed
    sum = ts.yardsDef.reduce(summer);
    document.getElementById("yards-allowed-data-avg").textContent = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("yards-allowed-data-total").textContent = `${sum}`;
    //Pass Yards Allowed
    sum = ts.passYardsDef.reduce(summer);
    document.getElementById("pass-yards-allowed-data-avg").textContent = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("pass-yards-allowed-data-total").textContent = `${sum}`;
    //Rush Yards Allowed
    sum = ts.rushYardsDef.reduce(summer);
    document.getElementById("rush-yards-allowed-data-avg").textContent = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("rush-yards-allowed-data-total").textContent = `${sum}`;
    //Pass Touchdowns Allowed
    sum = ts.passTDDef.reduce(summer);
    document.getElementById("pass-td-allowed-data-avg").textContent = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("pass-td-allowed-data-total").textContent = `${sum}`;
    //Rush Touchdowns Allowed
    sum = ts.rushTDDef.reduce(summer);
    document.getElementById("rush-td-allowed-data-avg").textContent = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("rush-td-allowed-data-total").textContent = `${sum}`;
    //Sacks
    sum = ts.sacks.reduce(summer);
    document.getElementById("sacks-data-avg").textContent = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("sacks-data-total").textContent = `${sum}`;
    //Turnovers Gained
    sum = ts.turnoversGain.reduce(summer);
    document.getElementById("turnovers-gained-data-avg").textContent = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("turnovers-gained-data-total").textContent = `${sum}`;
}

function buildChart(dataType) {
    const opponentBackgroundColors = [];
    const opponentBorderColors = [];
    const primaryColor = logoLookups[ts.school][1]
    const secondaryColor = logoLookups[ts.school][2]
    for(let i = 0; i < ts.numGames; i++) {
        if (logoLookups[ts.opponent[i]] === undefined) {
            //No data for FCS colors, using teams' secondary color
            opponentBackgroundColors.push(addHue(secondaryColor, 0.8));
            opponentBorderColors.push(addHue(secondaryColor, 1));
        } else {
            opponentBackgroundColors.push(addHue(logoLookups[ts.opponent[i]][1], 0.6));
            opponentBorderColors.push(addHue(logoLookups[ts.opponent[i]][1], 1));
        }
    }
    if(myChart !== undefined) {
        myChart.destroy(); //Clearing past charts
    }
    document.getElementById("modal-header").textContent = document.getElementById(`${dataType}-title`).innerText;
    myChart = new Chart(document.getElementById("statsCanvas"), {
    type: 'bar',
    data: {
        labels: ts.opponent,
        datasets: [{
            label: document.getElementById(`${dataType}-title`).innerText,
            data: ts[dataType],
            backgroundColor: opponentBackgroundColors,
            borderColor: opponentBorderColors,
            borderWidth: 1,
            order: 1,
        }, {
            type: 'line',
            label: "Avg.",
            data: rollingAverage(ts[dataType]),
            backgroundColor: 'rgba(0, 0, 0, 1)',
            borderColor: 'rgba(0, 0, 0, 1)',
            order: 3,
            fill: false,
            lineTension: 0,
            pointStyle: 'rectRot',
        }]
    },
    options: {
        legend: {
            display: false,
        }
    }
    })
}

async function showGameData(gameID) {
    //gameID = "401114194"; //TODO Remove placeholder
    document.getElementById("single-team-container").style.display = "none"; //Showing Conferences
    document.getElementById("game-container").style.display = "block"; //Unhiding teams page
    for (let el of document.querySelectorAll('.game-data')) el.style.visibility = 'hidden'; //Hide stats for when already filled stackoverflow.com/questions/18414384
    let year = "2019";
    let gameURL1 = baseURL + 'games/teams?year=' + year + '&gameId=' + gameID;
    let gameURL2 = baseURL + 'games?year=' + year + '&id=' + gameID;
    let game, gameBasic;
    console.log(gameURL1);
    await getData(gameURL1)
        .then(response => {
            game = response.data[0];
    });
    await getData(gameURL2)
        .then(response => {
            gameBasic = response.data[0];
    });
    console.log(game);
    console.log(gameBasic)
    let homeLogo, awayLogo;
    let fbsHome = true;
    let fbsAway = true;
    //games.push(game)
    //games.push(gameBasic)
    //document.getElementById("game-home-img").src = `http://a.espncdn.com/i/teamlogos/ncaa/500/${gameBasic.home_id}.png`;
    //document.getElementById("game-away-img").src = `http://a.espncdn.com/i/teamlogos/ncaa/500/${gameBasic.away_id}.png`;

    //Building the Team Header Cards. So that event listners don't keep happening
    let homeCard = document.getElementById("home-card"); 
    let awayCard = document.getElementById("away-card");
    homeCard.textContent = ''; //Clearing out the content
    awayCard.textContent = '';
    let homeLink = document.createElement("a"); //Our main insert
    homeLink.classList.add("btn-fix", "text-center"); //Adding basic class, adding button if FBS
    homeLink.id = "game-home-team";
    let homeImg = document.createElement("img"); //Our image element
    homeImg.id = "game-away-img";
    homeImg.classList.add("card-img-top", "img-responsive");
    homeImg.src = `http://a.espncdn.com/i/teamlogos/ncaa/500/${gameBasic.home_id}.png`; //Linking to team logo
    if (logoLookups[gameBasic.home_team] !== undefined) {
        //Checking if FBS, so we can link to a season
        homeLink.addEventListener("click", function homeClick() {showTeamData(gameBasic.home_team)} );
        homeLink.setAttribute("href", "#")
        homeLink.classList.add("btn");
    }
    let homeTitle1 = document.createElement("div"); //Card top title
    homeTitle1.classList.add("card-block");
    let homeName1 = document.createElement("h4");
    homeName1.classList.add("card-title", "m-0");
    homeName1.textContent = "HOME";
    homeTitle1.appendChild(homeName1);
    let homeTitle2 = document.createElement("div"); //Card bottom title
    homeTitle2.classList.add("card-block");
    let homeName2 = document.createElement("h4");
    homeName2.classList.add("card-title", "m-0");
    homeName2.textContent = `${gameBasic.home_team}`;
    homeTitle2.appendChild(homeName2);
    homeLink.appendChild(homeTitle1);
    homeLink.appendChild(homeImg);
    homeLink.appendChild(homeTitle2);
    homeCard.appendChild(homeLink);

    let awayLink = document.createElement("a");
    awayLink.classList.add("btn", "btn-fix", "text-center"); //TODO add href if FBS
    awayLink.id = "game-away-team";
    let awayImg = document.createElement("img");
    awayImg.id = "game-away-img";
    awayImg.classList.add("card-img-top", "img-responsive");
    awayImg.src = `http://a.espncdn.com/i/teamlogos/ncaa/500/${gameBasic.away_id}.png`;
    if (logoLookups[gameBasic.away_team] !== undefined) {
        awayLink.addEventListener("click", function awayClick() {showTeamData(gameBasic.away_team)} );
        awayLink.setAttribute("href", "#")
        awayLink.classList.add("btn"); //TODO add href if FBS
    }
    let awayTitle1 = document.createElement("div");
    awayTitle1.classList.add("card-block");
    let awayName1 = document.createElement("h4");
    awayName1.classList.add("card-title", "m-0");
    awayName1.textContent = "AWAY";
    awayTitle1.appendChild(awayName1);
    let awayTitle2 = document.createElement("div");
    awayTitle2.classList.add("card-block");
    let awayName2 = document.createElement("h4");
    awayName2.classList.add("card-title", "m-0");
    awayName2.textContent = `${gameBasic.away_team}`;
    awayTitle2.appendChild(awayName2);
    awayLink.appendChild(awayTitle1);
    awayLink.appendChild(awayImg);
    awayLink.appendChild(awayTitle2);
    awayCard.appendChild(awayLink);

 
    /*
    if (logoLookups[gameBasic.home_team] !== undefined) {
        document.getElementById("game-home-team").addEventListener("click", function homeClick() {showTeamData(gameBasic.home_team)} );
        //document.getElementById("game-home-team").addEventListener("click", function() {} );
    } else {
        document.getElementById("game-home-team").classList.remove("btn");
        document.getElementById("game-home-team").removeAttribute("href");
    }
    if (logoLookups[gameBasic.away_team] !== undefined) {
        document.getElementById("game-away-team").addEventListener("click", function awayClick() {showTeamData(gameBasic.away_team)} );
    } else {
        document.getElementById("game-away-team").classList.remove("btn");
        document.getElementById("game-away-team").removeAttribute("href");
    }
    */
    let gsh = document.getElementById("game-score-home")
    let gsa = document.getElementById("game-score-away")
    gsh.textContent = gameBasic.home_points;
    try {
        gsh.style.backgroundColor = addHue(logoLookups[gameBasic.home_team][1], 0.5);
        gsh.style.color = logoLookups[gameBasic.home_team][2];
    } catch(e) {
        gsh.style.backgroundColor = "rgba(200, 200, 200, 0.5)";
        gsh.style.color = "black";
    }
    gsa.textContent = gameBasic.away_points;
    try {
        gsa.style.backgroundColor = addHue(logoLookups[gameBasic.away_team][1], 0.5);
        gsa.style.color = logoLookups[gameBasic.away_team][2];
    } catch(e) {
        gsa.style.backgroundColor = "rgba(200, 200, 200, 0.5)";
        gsa.style.color = "black";
    }
    document.getElementById("game-date").textContent = `${gameBasic.start_date.slice(5,7)}/${gameBasic.start_date.slice(8,10)}/${gameBasic.start_date.slice(2,4)}`

    fillGameData(game);
    for (let el of document.querySelectorAll('.game-data')) el.style.visibility = ''; //unhide stats
}

function fillGameData(game) {
    let home_team, away_team;
    if(game.teams[0].homeAway === "home") {
        home_team = 0;
        away_team = 1;
    } else {
        home_team = 1;
        away_team = 0;
    }
    for(let i = 0; i < game.teams[home_team].stats.length; i++) {
        switch (game.teams[home_team].stats[i].category) {
            case "totalYards":
                document.getElementById("game-yards-home").textContent = game.teams[home_team].stats[i].stat;
                break;
            case "netPassingYards":
                document.getElementById("game-pass-yards-home").textContent = game.teams[home_team].stats[i].stat;
                break;
            case "completionAttempts":
                document.getElementById("game-compatt-home").textContent = game.teams[home_team].stats[i].stat;
                break;
            case "yardsPerPass":
                document.getElementById("game-ypp-home").textContent = game.teams[home_team].stats[i].stat;
                break;
            case "passingTDs":
                document.getElementById("game-pass-td-home").textContent = game.teams[home_team].stats[i].stat;
                break;
            case "rushingYards":
                document.getElementById("game-rush-yards-home").textContent = game.teams[home_team].stats[i].stat;
                break;
            case "rushingAttempts":
                document.getElementById("game-rushes-home").textContent = game.teams[home_team].stats[i].stat;
                break;
            case "yardsPerRushAttempt":
                document.getElementById("game-ypr-home").textContent = game.teams[home_team].stats[i].stat;
                break;
            case "rushingTDs":
                document.getElementById("game-rush-td-home").textContent = game.teams[home_team].stats[i].stat;
                break;
            case "firstDowns":
                document.getElementById("game-first-downs-home").textContent = game.teams[home_team].stats[i].stat;
                break;
            case "thirdDownEff":
                document.getElementById("game-third-down-home").textContent = game.teams[home_team].stats[i].stat;
                break;
            case "fourthDownEff":
                document.getElementById("game-fourth-down-home").textContent = game.teams[home_team].stats[i].stat;
                break;
            case "tackles":
                document.getElementById("game-tackles-home").textContent = game.teams[home_team].stats[i].stat;
                break;
            case "sacks":
                document.getElementById("game-sacks-home").textContent = game.teams[home_team].stats[i].stat;
                break;
            case "turnovers":
                document.getElementById("game-tos-home").textContent = game.teams[home_team].stats[i].stat;
                break;
            case "totalPenaltiesYards":
                document.getElementById("game-penalty-home").textContent = game.teams[home_team].stats[i].stat;
                break;
            case "possessionTime":
                document.getElementById("game-possession-home").textContent = game.teams[home_team].stats[i].stat;
                break;
            default:
                break;
        }
    }
    for(let i = 0; i < game.teams[away_team].stats.length; i++) {
        switch (game.teams[away_team].stats[i].category) {
            case "totalYards":
                document.getElementById("game-yards-away").textContent = game.teams[away_team].stats[i].stat;
                break;
            case "netPassingYards":
                document.getElementById("game-pass-yards-away").textContent = game.teams[away_team].stats[i].stat;
                break;
            case "completionAttempts":
                document.getElementById("game-compatt-away").textContent = game.teams[away_team].stats[i].stat;
                break;
            case "yardsPerPass":
                document.getElementById("game-ypp-away").textContent = game.teams[away_team].stats[i].stat;
                break;
            case "passingTDs":
                document.getElementById("game-pass-td-away").textContent = game.teams[away_team].stats[i].stat;
                break;
            case "rushingYards":
                document.getElementById("game-rush-yards-away").textContent = game.teams[away_team].stats[i].stat;
                break;
            case "rushingAttempts":
                document.getElementById("game-rushes-away").textContent = game.teams[away_team].stats[i].stat;
                break;
            case "yardsPerRushAttempt":
                document.getElementById("game-ypr-away").textContent = game.teams[away_team].stats[i].stat;
                break;
            case "rushingTDs":
                document.getElementById("game-rush-td-away").textContent = game.teams[away_team].stats[i].stat;
                break;
            case "firstDowns":
                document.getElementById("game-first-downs-away").textContent = game.teams[away_team].stats[i].stat;
                break;
            case "thirdDownEff":
                document.getElementById("game-third-down-away").textContent = game.teams[away_team].stats[i].stat;
                break;
            case "fourthDownEff":
                document.getElementById("game-fourth-down-away").textContent = game.teams[away_team].stats[i].stat;
                break;
            case "tackles":
                document.getElementById("game-tackles-away").textContent = game.teams[away_team].stats[i].stat;
                break;
            case "sacks":
                document.getElementById("game-sacks-away").textContent = game.teams[away_team].stats[i].stat;
                break;
            case "turnovers":
                document.getElementById("game-tos-away").textContent = game.teams[away_team].stats[i].stat;
                break;
            case "totalPenaltiesYards":
                document.getElementById("game-penalty-away").textContent = game.teams[away_team].stats[i].stat;
                break;
            case "possessionTime":
                document.getElementById("game-possession-away").textContent = game.teams[away_team].stats[i].stat;
                break;
            default:
                break;
        }
    }
}


function rollingAverage(array) {
    //Helper function takes an array, returns rolling average of the values
    let sum = 0;
    let avg = [];
    for(let i = 0; i < array.length; i++) {
        sum += array[i];
        avg.push((sum/(i+1)).toFixed(2));
    }
    return avg;
}

function addHue(color, alpha) {
    /*Helper function for building chart colors
      <color>: a string for color ex: '#123456'
      <alpha>: a number for the opaqueness value ex: 0.5
      Returns: <string>
        'rgb(18, 52, 86, 0.5)
    */
    return `rgb(${parseInt(color.slice(1,3), 16)}, ${parseInt(color.slice(3,5), 16)}, ${parseInt(color.slice(5), 16)}, ${alpha})`
}

//showTeamData("string");