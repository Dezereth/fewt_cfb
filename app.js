const baseURL = "https://api.collegefootballdata.com/";
const conferencsURL = "https://api.collegefootballdata.com/conferences";

const independents = "https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa_conf/500/18.png";
const fcsLogo = "https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa_conf/500/32.png";

let conferenceStrings = {
    acc: "acc",
    b12: "b12",
    b1g: "b1g",
    sec: "sec",
    pac: "pac"
}

//This is nasty, but better than doing a conf lookup and search to get to the team logo link
const logoLookups = {
            "Arizona":  12,
            "Arizona State":  9,
            "California":  25,
            "Colorado":  38,
            "Oregon":  2483,
            "Oregon State":  204,
            "Stanford":  24,
            "UCLA":  26,
            "USC":  30,
            "Utah":  254,
            "Washington":  264,
            "Washington State":  265,
            "Alabama":  333,
            "Arkansas":  8,
            "Auburn":  2,
            "Florida":  57,
            "Georgia":  61,
            "Kentucky":  96,
            "LSU":  99,
            "Mississippi State":  344,
            "Missouri":  142,
            "Ole Miss":  145,
            "South Carolina":  2579,
            "Tennessee":  2633,
            "Texas A&M":  245,
            "Vanderbilt":  238,
            "Illinois":  356,
            "Indiana":  84,
            "Iowa":  2294,
            "Maryland":  120,
            "Michigan":  130,
            "Michigan State":  127,
            "Minnesota":  135,
            "Nebraska":  158,
            "Northwestern":  77,
            "Ohio State":  194,
            "Penn State":  213,
            "Purdue":  2509,
            "Rutgers":  164,
            "Wisconsin":  275,
            "Baylor":  239,
            "Iowa State":  66,
            "Kansas":  2305,
            "Kansas State":  2306,
            "Oklahoma":  201,
            "Oklahoma State":  197,
            "TCU":  2628,
            "Texas":  251,
            "Texas Tech":  2641,
            "West Virginia":  277,
            "Boston College":  103,
            "Clemson":  228,
            "Duke":  150,
            "Florida State":  52,
            "Georgia Tech":  59,
            "Louisville":  97,
            "Miami":  2390,
            "NC State":  152,
            "North Carolina":  153,
            "Pittsburgh":  221,
            "Syracuse":  183,
            "Virginia":  258,
            "Virginia Tech":  259,
            "Wake Forest":  154,
            "Charlotte":  2429,
            "Florida Atlantic":  2226,
            "Florida International":  2229,
            "Louisiana Tech":  2348,
            "Marshall":  276,
            "Middle Tennessee":  2393,
            "North Texas":  249,
            "Old Dominion":  295,
            "Rice":  242,
            "Southern Mississippi":  2572,
            "UAB":  5,
            "UTEP":  2638,
            "UT San Antonio":  2636,
            "Western Kentucky":  98,
            "Akron":  2006,
            "Ball State":  2050,
            "Bowling Green":  189,
            "Buffalo":  2084,
            "Central Michigan":  2117,
            "Eastern Michigan":  2199,
            "Kent State":  2309,
            "Miami (OH)":  193,
            "Northern Illinois":  2459,
            "Ohio":  195,
            "Toledo":  2649,
            "Western Michigan":  2711,
            "Air Force":  2005,
            "Boise State":  68,
            "Colorado State":  36,
            "Fresno State":  278,
            "Hawai'i":  62,
            "Nevada":  2440,
            "New Mexico":  167,
            "San Diego State":  21,
            "San José State":  23,
            "UNLV":  2439,
            "Utah State":  328,
            "Wyoming":  2751,
            "Army":  349,
            "BYU":  252,
            "Liberty":  2335,
            "New Mexico State":  166,
            "Notre Dame":  87,
            "UMass":  113,
            "Cincinnati":  2132,
            "Connecticut":  41,
            "East Carolina":  151,
            "Houston":  248,
            "Memphis":  235,
            "Navy":  2426,
            "SMU":  2567,
            "South Florida":  58,
            "Temple":  218,
            "Tulane":  2655,
            "Tulsa":  202,
            "UCF":  2116,
            "Appalachian State":  2026,
            "Arkansas State":  2032,
            "Coastal Carolina":  324,
            "Georgia Southern":  290,
            "Georgia State":  2247,
            "Louisiana":  309,
            "Louisiana Monroe":  2433,
            "South Alabama":  6,
            "Texas State":  326,
            "Troy":  2653,
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
//let teamStats = []; //For populating with objects

async function getData(localurl) {
    return response = await axios.get(localurl)
}

async function populateTeams(conferenceToDisplay){
    teams = [];
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
        team.innerHTML = `<a href="#" class="btn btn-fix text-center" id="${teams[i].alt_name2}">
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
    //Takes a team object from the teams[] array
    games = [];
    let year = "2019";
    //let teamURLname = teamToShow.school.replace(/ /g, "%20"); //convert spaces to URL spaces
    let teamURLname = "Oregon";
    let oregonID = 2483; //TODO Remove placeholder once an actual team is passed.

    let gamesURL = baseURL + "games/teams?year=" + year + "&team=" + teamURLname + "&week=";
    //If the week is not included, then the game data is not organized in any coherent way

    ts = new teamStats(teamURLname) //TODO remove placeholder when team objects are passed
    //ts = new teamStats(teamToShow.school)
    document.getElementById("team-name").innerHTML = `${ts.school}`;
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
    fillSeasonTable();
    fillGamesList(teamURLname); //TODO remove placeholder
    //fillGamesList(teamToShow.school); 
}

function fillGamesList(school) {
    document.getElementById("team-record").innerHTML = `Record: ${ts.record[0]} - ${ts.record[1]}`;
    let gamesCol = document.getElementById("games-column");
    for(let i = 0; i < ts.numGames; i++){
        let game = document.createElement("div");
        game.classList.add("row", "border");
        let teamLogo = `http://a.espncdn.com/i/teamlogos/ncaa/500/${logoLookups[school]}.png`
        let oppLogo;
        if (logoLookups[ts.opponent[i]] === undefined) {
            oppLogo = fcsLogo;
        } else {
            oppLogo = `http://a.espncdn.com/i/teamlogos/ncaa/500/${logoLookups[ts.opponent[i]]}.png`;
        }
        game.innerHTML = `
            <img class="col-3 img-responsive" src="${ts.location[i] ? teamLogo : oppLogo}">
            <div class="col-6 text-center ${((ts.pointsScored[i]-ts.pointsAllowed[i]) > 0) ? "text-success" : "text-danger"}">${ts.location[i] ? ts.pointsScored[i] : ts.pointsAllowed[i]}-${ts.location[i] ? ts.pointsAllowed[i] : ts.pointsScored[i]}</div>
            <img class="col-3 img-responsive" src="${ts.location[i] ? oppLogo : teamLogo}">
        `;
        gamesCol.appendChild(game);

    }
}

function fillSeasonTable() {
    //Filling in Stats Table Data
    let sum;
    //Points Scored
    sum = ts.pointsScored.reduce(summer);
    document.getElementById("points-data-avg").innerHTML = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("points-data-total").innerHTML = `${sum}`;
    //Yards Gained
    sum = ts.yards.reduce(summer);
    document.getElementById("yards-data-avg").innerHTML = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("yards-data-total").innerHTML = `${sum}`;
    //Pass Yards Gained
    sum = ts.passYards.reduce(summer);
    document.getElementById("pass-yards-data-avg").innerHTML = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("pass-yards-data-total").innerHTML = `${sum}`;
    //Rush Yards Gained
    sum = ts.rushYards.reduce(summer);
    document.getElementById("rush-yards-data-avg").innerHTML = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("rush-yards-data-total").innerHTML = `${sum}`;
    //Pass Touchdowns
    sum = ts.passTD.reduce(summer);
    document.getElementById("pass-td-data-avg").innerHTML = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("pass-td-data-total").innerHTML = `${sum}`;
    //Rush Touchdowns
    sum = ts.rushTD.reduce(summer);
    document.getElementById("rush-td-data-avg").innerHTML = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("rush-td-data-total").innerHTML = `${sum}`;
    //Sacks Allowed
    sum = ts.sacked.reduce(summer);
    document.getElementById("sacks-allowed-data-avg").innerHTML = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("sacks-allowed-data-total").innerHTML = `${sum}`;
    //Turnovers Lost
    sum = ts.turnoversLost.reduce(summer);
    document.getElementById("turnovers-lost-data-avg").innerHTML = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("turnovers-lost-data-total").innerHTML = `${sum}`;
    //Points Allowed
    sum = ts.pointsAllowed.reduce(summer);
    document.getElementById("points-allowed-data-avg").innerHTML = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("points-allowed-data-total").innerHTML = `${sum}`;
    //Yards Allowed
    sum = ts.yardsDef.reduce(summer);
    document.getElementById("yards-allowed-data-avg").innerHTML = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("yards-allowed-data-total").innerHTML = `${sum}`;
    //Pass Yards Allowed
    sum = ts.passYardsDef.reduce(summer);
    document.getElementById("pass-yards-allowed-data-avg").innerHTML = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("pass-yards-allowed-data-total").innerHTML = `${sum}`;
    //Rush Yards Allowed
    sum = ts.rushYardsDef.reduce(summer);
    document.getElementById("rush-yards-allowed-data-avg").innerHTML = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("rush-yards-allowed-data-total").innerHTML = `${sum}`;
    //Pass Touchdowns Allowed
    sum = ts.passTDDef.reduce(summer);
    document.getElementById("pass-td-allowed-data-avg").innerHTML = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("pass-td-allowed-data-total").innerHTML = `${sum}`;
    //Rush Touchdowns Allowed
    sum = ts.rushTDDef.reduce(summer);
    document.getElementById("rush-td-allowed-data-avg").innerHTML = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("rush-td-allowed-data-total").innerHTML = `${sum}`;
    //Sacks
    sum = ts.sacks.reduce(summer);
    document.getElementById("sacks-data-avg").innerHTML = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("sacks-data-total").innerHTML = `${sum}`;
    //Turnovers Gained
    sum = ts.turnoversGain.reduce(summer);
    document.getElementById("turnovers-gained-data-avg").innerHTML = `${(sum/ts.numGames).toFixed(2)}`;
    document.getElementById("turnovers-gained-data-total").innerHTML = `${sum}`;
}

showTeamData("string");