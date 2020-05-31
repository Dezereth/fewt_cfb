const baseURL = "https://api.collegefootballdata.com/";
const conferencsURL = "https://api.collegefootballdata.com/conferences";

const independents = "https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa_conf/500/18.png";
const fcsLogo = "https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa_conf/500/32.png";

var myChart; //Global declaration so it can be destroyed before writing a new one.

//This is nasty, but better than doing a conf lookup and search to get to the team logo link
//Even better in fact since the API in use does not have correct color values for many teams
//Manually Sourced color codes from https://teamcolorcodes.com/ncaa-color-codes/
const logoLookups = {
            //School : [ID, Primary Color, Secondary Color]
            "Alabama" : [333, "#9e1b32", "#b2babf"],
            "Arkansas" : [8, "#9d2235", "#ffffff"],
            "Auburn" : [2, "#0c2340", "#e87722"],
            "Florida" : [57, "#0021A5", "#fa4616"],
            "Georgia" : [61, "#ba0c2f", "#000000"],
            "Kentucky" : [96, "#0033a0", "#ffffff"],
            "LSU" : [99, "#461d7c", "#fdd023"],
            "Mississippi State" : [344, "#660000", "#ffffff"],
            "Missouri" : [142, "#000000", "#f1b82d"],
            "Ole Miss" : [145, "#ce1126", "#14213d"],
            "South Carolina" : [2579, "#73000a", "#000000"],
            "Tennessee" : [2633, "#ff8200", "#58595b"],
            "Texas A&M" : [245, "#500000", "#ffffff"],
            "Vanderbilt" : [238, "#000000", "#866d4b"],
            "Arizona" : [12, "#cc0033", "#003366"],
            "Arizona State" : [9, "#8c1d40", "#ffc627"],
            "California" : [25, "#003262", "#fdb515"],
            "Colorado" : [38, "#cfb87c", "#000000"],
            "Oregon" : [2483, "#154733", "#fee123"],
            "Oregon State" : [204, "#dc4405", "#000000"],
            "Stanford" : [24, "#8c1515", "#ffffff"],
            "UCLA" : [26, "#2d68c4", "#f2a900"],
            "USC" : [30, "#990000", "#ffc72c"],
            "Utah" : [254, "#cc0000", "#808080"],
            "Washington" : [264, "#4b2e83", "#e8e3d3"],
            "Washington State" : [265, "#981e32", "#5e6a71"],
            "Boston College" : [103, "#98002e", "#bc9b6a"],
            "Clemson" : [228, "#f56600", "#522d80"],
            "Duke" : [150, "#003087", "#ffffff"],
            "Florida State" : [52, "#782F40", "#ceb888"],
            "Georgia Tech" : [59, "#b3a369", "#003057"],
            "Louisville" : [97, "#ad0000", "#000000"],
            "Miami" : [2390, "#f47321", "#005030"],
            "NC State" : [152, "#cc0000", "#000000"],
            "North Carolina" : [153, "#7bafd4", "#ffffff"],
            "Pittsburgh" : [221, "#003594", "#ffb81c"],
            "Syracuse" : [183, "#f76900", "#000e54"],
            "Virginia" : [258, "#232d4b", "#f84c1e"],
            "Virginia Tech" : [259, "#630031", "#cf4420"],
            "Wake Forest" : [154, "#9E7E38", "#000000"],
            "Cincinnati" : [2132, "#E00122", "#000000"],
            "Connecticut" : [41, "#000e2f", "#ffffff"],
            "East Carolina" : [151, "#592a8a", "#fdc82f"],
            "Houston" : [248, "#c8102e", "#ffffff"],
            "Memphis" : [235, "#003087", "#898d8d"],
            "Navy" : [2426, "#00205b", "#c5b783"],
            "SMU" : [2567, "#0033a0", "#c8102e"],
            "South Florida" : [58, "#006747", "#cfc493"],
            "Temple" : [218, "#9d2235", "#c1c6c8"],
            "Tulane" : [2655, "#006757", "#418fde"],
            "Tulsa" : [202, "#002d72", "#c8102e"],
            "UCF" : [2116, "#ba9b37", "#101010"],
            "Illinois" : [356, "#13294b", "#e84a27"],
            "Indiana" : [84, "#990000", "#eeedeb"],
            "Iowa" : [2294, "#ffcd00", "#000000"],
            "Maryland" : [120, "#e03a3e", "#ffd520"],
            "Michigan" : [130, "#00274c", "#ffcb05"],
            "Michigan State" : [127, "#18453B", "#ffffff"],
            "Minnesota" : [135, "#7a0019", "#ffcc33"],
            "Nebraska" : [158, "#e41c38", "#ffffff"],
            "Northwestern" : [77, "#4e2a84", "#ffffff"],
            "Ohio State" : [194, "#bb0000", "#cccccc"],
            "Penn State" : [213, "#041e42", "#ffffff"],
            "Purdue" : [2509, "#ceb888", "#373a36"],
            "Rutgers" : [164, "#cc0033", "#2f3a42"],
            "Wisconsin" : [275, "#c5050c", "#ffffff"],
            "Air Force" : [2005, "#003087", "#b1b3b3"],
            "Boise State" : [68, "#0033a0", "#d64309"],
            "Colorado State" : [36, "#1e4d2b", "#c8c372"],
            "Fresno State" : [278, "#db0032", "#002e6d"],
            "Hawai'i" : [62, "#024731", "#c8c8c8"],
            "Nevada" : [2440, "#003366", "#807f84"],
            "New Mexico" : [167, "#ba0c2f", "#63666a"],
            "San Diego State" : [21, "#a6192e", "#000000"],
            "San José State" : [23, "#0055a2", "#e5a823"],
            "UNLV" : [2439, "#cf0a2c", "#cac8c8"],
            "Utah State" : [328, "#0f2439", "#9d968d"],
            "Wyoming" : [2751, "#ffc425", "#492f24"],
            "Charlotte" : [2429, "#046a38", "#b9975b"],
            "Florida Atlantic" : [2226, "#003366", "#cc0000"],
            "Florida International" : [2229, "#081e3f", "#b6862c"],
            "Louisiana Tech" : [2348, "#002f8b", "#e31b23"],
            "Marshall" : [276, "#00b140", "#27251f"],
            "Middle Tennessee" : [2393, "#0066cc", "#000000"],
            "North Texas" : [249, "#00853e", "#000000"],
            "Old Dominion" : [295, "#003057", "#7c878e"],
            "Rice" : [242, "#00205b", "#c1c6c8"],
            "Southern Mississippi" : [2572, "#ffab00", "#000000"],
            "UAB" : [5, "#006341", "#cc8a00"],
            "UTEP" : [2638, "#ff8200", "#041e42"],
            "UT San Antonio" : [2636, "#0c2340", "#f15a22"],
            "Western Kentucky" : [98, "#c60c30", "#1e1e1e"],
            "Akron" : [2006, "#041e42", "#a89968"],
            "Ball State" : [2050, "#ba0c2f", "#000000"],
            "Bowling Green" : [189, "#4f2c1d", "#fe5000"],
            "Buffalo" : [2084, "#005bbb", "#ffffff"],
            "Central Michigan" : [2117, "#6a0032", "#ffc82e"],
            "Eastern Michigan" : [2199, "#006633", "#000000"],
            "Kent State" : [2309, "#002664", "#eaab00"],
            "Miami (OH)" : [193, "#b61e2e", "#000000"],
            "Northern Illinois" : [2459, "#ba0c2f", "#8a8d8f"],
            "Ohio" : [195, "#00694e", "#cda077"],
            "Toledo" : [2649, "#15395f", "#ffda00"],
            "Western Michigan" : [2711, "#6c4023", "#b5a167"],
            "Appalachian State" : [2026, "#222222", "#ffcd00"],
            "Arkansas State" : [2032, "#cc092f", "#000000"],
            "Coastal Carolina" : [324, "#006f71", "#a27752"],
            "Georgia Southern" : [290, "#011e41", "#a3aaae"],
            "Georgia State" : [2247, "#0039a6", "#c60c30"],
            "Louisiana" : [309, "#ce181e", "000000"],
            "Louisiana Monroe" : [2433, "#800029", "#bd955a"],
            "South Alabama" : [6, "#00205b", "#bf0d3e"],
            "Texas State" : [326, "#501214", "#8d734a"],
            "Troy" : [2653, "#8a2432", "#b3b5b8"],
            "Army" : [349, "#d4bf91", "#000000"],
            "BYU" : [252, "#002e5d", "#ffffff"],
            "Liberty" : [2335, "#002d62", "#c41230"],
            "New Mexico State" : [166, "#861f41", "#000000"],
            "Notre Dame" : [87, "#0c2340", "#c99700"],
            "UMass" : [113, "#971b2f", "b1b3b3"],
            "Baylor" : [239, "#003015", "#fecb00"],
            "Iowa State" : [66, "#c8102e", "#f1be48"],
            "Kansas" : [2305, "#0051ba", "#e8000d"],
            "Kansas State" : [2306, "#512888", "#a7a7a7"],
            "Oklahoma" : [201, "#841617", "#fdf9d8"],
            "Oklahoma State" : [197, "#ff7300", "#000000"],
            "TCU" : [2628, "#4d1979", "#a3a9ac"],
            "Texas" : [251, "#bf5700", "#333f48"],
            "Texas Tech" : [2641, "#cc0000", "#000000"],
            "West Virginia" : [277, "#002855", "#eaaa00"],
}

let games = [];
let ts;

const summer = (a, c) => a + c;

class teamStats {
    constructor(school) {
        this.numGames = 0;
        this.school = school;
        this.record = [0, 0];       //[W, L]
        this.confRecord = [0, 0]    //Conference W-L
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
            if(game.teams[off].conference === game.teams[def].conference) { this.confRecord[0]++;}
        } else {
            this.record[1]++;
            if(game.teams[off].conference === game.teams[def].conference) { this.confRecord[1]++;}
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

function showSpinner(bool) {
    if(bool) {
        document.getElementById("spin-container").classList.remove("d-none");
        document.getElementById("spin-container").classList.add("d-flex");
    } else {
        document.getElementById("spin-container").classList.remove("d-flex");
        document.getElementById("spin-container").classList.add("d-none");
    }
}

async function getData(localurl) {
    return response = await axios.get(localurl)
}

async function populateTeams(conferenceToDisplay){
    //teams = [];
    showSpinner(true);
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
        team.innerHTML = `<a href="#" class="btn btn-fix text-center" id="${teams[i].alt_name2}" onclick="showTeamData('${teams[i].school.replace(/'/g, "\\'")}')">
                            <img class=card-img-top img-responsive" id="${teams[i].alt_name2}-img" src="${teams[i].logos[0]}" >
                            <div class="card-block">
                                <div class="h4 card-title">${teams[i].school}</div>
                            </div>
                        </a>`
        deck.appendChild(team);
    }
    console.log(teams);
    console.log(teams.length);
    showSpinner(false);
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
    showSpinner(true);
    document.getElementById("games-column").textContent = ''; //TODid propagate this clearing method to other areas instead of innerHTML. stackoverflow.com/questions/3955229 says is faster.
    for (let el of document.querySelectorAll('.season-data')) el.style.visibility = 'hidden'; //Hide stats for when already filled stackoverflow.com/questions/18414384
    console.log(teamToShow);
    //Takes a team.school string from the team object
    let year = "2019";
    let teamURLname = teamToShow.replace(/ /g, "%20").replace(/&/g, "%26"); //convert spaces to URL spaces, and & to URL ampersand for Tx A&M

    let gamesURL = baseURL + "games/teams?year=" + year + "&team=" + teamURLname + "&week=";
    //If the week is not included, then the game data is not organized in any coherent way

    ts = new teamStats(teamToShow) 
    //Set the background color to the secondary color, but if secondary color is white, grey it up for a little contrast with the white body background
    document.getElementById("single-team-container").style.backgroundColor = (logoLookups[ts.school][2] === "#ffffff") ? "#fcfcfc" : logoLookups[ts.school][2];
    let tn = document.getElementById("team-name");
    tn.textContent = `${ts.school}`;
    tn.style.backgroundColor = logoLookups[ts.school][1];
    tn.style.color = logoLookups[ts.school][2];

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
    showSpinner(false);
}

function fillGamesList(school) {
    let gamesCol = document.getElementById("games-column");
    let record = document.createElement("div");
    record.classList.add("row", "bg-white", "font-weight-bold", "border", "rounded-top", "py-md-1")
    let recordCol = document.createElement("div");
    recordCol.classList.add("col-12", "text-center", "h2")
    recordCol.id = "team-record";
    recordCol.textContent = `${ts.record[0]}-${ts.record[1]} (${ts.confRecord[0]}-${ts.confRecord[1]})`;
    record.appendChild(recordCol);
    //record.innerHTML = `<div class="col-12 text-center" id="team-record"></div>`
    let homeAway = document.createElement("div");
    homeAway.classList.add("row", "border", "bg-white", "py-md-1", "py-lg-2");
    homeAway.innerHTML = `<div class="col-6 text-left font-weight-bold" id="home">Home</div>
                    <div class="col-6 text-right font-weight-bold" id="away">Away</div>`;
    gamesCol.appendChild(record);
    gamesCol.appendChild(homeAway);
    //document.getElementById("team-record").textContent = `Record: ${ts.record[0]} - ${ts.record[1]}`;
    let teamLogo = `http://a.espncdn.com/i/teamlogos/ncaa/500/${logoLookups[school][0]}.png`;
    for(let i = 0; i < ts.numGames; i++){
        let game = document.createElement("div");
        game.classList.add("row", "border", "bg-white", "py-md-1");
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
        score.classList.add("score-row", "clickable-row", "col-6", "text-center", "align-self-center", "font-weight-bold",(((ts.pointsScored[i]-ts.pointsAllowed[i]) > 0) ? "text-success" : "text-danger"),);
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
        if(i === ts.numGames-1) {
            game.classList.add("rounded-bottom")
        }
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
            opponentBackgroundColors.push("rgba(200, 200, 200, 0.7)");
            opponentBorderColors.push("#000000");
        } else {
            opponentBackgroundColors.push(addHue(logoLookups[ts.opponent[i]][1], 0.6));
            opponentBorderColors.push(addHue(logoLookups[ts.opponent[i]][1], 1));
        }
    }
    if(myChart !== undefined) {
        myChart.destroy(); //Clearing past charts
    }
    let mh = document.getElementById("modal-header");
    let mb = document.getElementById("modal-body");
    let mf = document.getElementById("modal-footer");
    let tt = document.getElementById("team-name");
    mh.textContent = document.getElementById(`${dataType}-title`).innerText;
    mh.style.color = tt.style.backgroundColor;
    mh.style.backgroundColor = document.getElementById("single-team-container").style.backgroundColor.replace(')', ', 0.55)').replace('rgb', 'rgba');
    mb.style.backgroundColor = document.getElementById("single-team-container").style.backgroundColor.replace(')', ', 0.55)').replace('rgb', 'rgba');
    mf.style.backgroundColor = document.getElementById("single-team-container").style.backgroundColor.replace(')', ', 0.55)').replace('rgb', 'rgba');
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
    document.getElementById("single-team-container").style.display = "none"; //Hide the single team page
    document.getElementById("game-container").style.display = "block"; //Unhiding game page
    if(gameID == document.getElementById("game-container").getAttribute("data-id")) {
        return
    }
    document.getElementById("game-container").setAttribute("data-id", gameID);
    showSpinner(true);
    for (let el of document.querySelectorAll('.game-data')) el.style.visibility = 'hidden'; //Hide stats for when already filled stackoverflow.com/questions/18414384
    //Moved up from below the await, hides older cards faster
    let homeCard = document.getElementById("home-card"); 
    let awayCard = document.getElementById("away-card");
    homeCard.textContent = ''; //Clearing out the content
    awayCard.textContent = '';
    //Moved up from below the await, hiding scores by setting them white
    let gsh = document.getElementById("game-score-home")
    let gsa = document.getElementById("game-score-away")
    gsh.style.backgroundColor = "white";
    gsh.style.color = "white";
    gsa.style.backgroundColor = "white";
    gsa.style.color = "white";
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

    //Building the Team Header Cards. So that event listners don't keep happening
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
    let homeTitle2 = document.createElement("div"); //Card bottom title
    homeTitle2.classList.add("card-block");
    let homeName2 = document.createElement("div");
    homeName2.classList.add("card-title", "m-0", "h4", "font-shrink");
    homeName2.textContent = `${gameBasic.home_team}`;
    homeTitle2.appendChild(homeName2);
    homeLink.appendChild(homeTitle1);
    homeLink.appendChild(homeImg);
    homeLink.appendChild(homeTitle2);
    homeCard.appendChild(homeLink);

    let awayLink = document.createElement("a");
    awayLink.classList.add("btn-fix", "text-center"); //TODO add href if FBS
    awayLink.id = "game-away-team";
    let awayImg = document.createElement("img");
    awayImg.id = "game-away-img";
    awayImg.classList.add("card-img-top", "img-responsive");
    awayImg.src = `http://a.espncdn.com/i/teamlogos/ncaa/500/${gameBasic.away_id}.png`;
    if (logoLookups[gameBasic.away_team] !== undefined) {
        awayLink.addEventListener("click", function awayClick() {showTeamData(gameBasic.away_team)} );
        awayLink.setAttribute("href", "#")
        awayLink.classList.add("btn");
    }
    let awayTitle1 = document.createElement("div");
    awayTitle1.classList.add("card-block");
    let awayTitle2 = document.createElement("div");
    awayTitle2.classList.add("card-block");
    let awayName2 = document.createElement("div");
    awayName2.classList.add("card-title", "m-0", "h4", "font-shrink");
    awayName2.textContent = `${gameBasic.away_team}`;
    awayTitle2.appendChild(awayName2);
    awayLink.appendChild(awayTitle1);
    awayLink.appendChild(awayImg);
    awayLink.appendChild(awayTitle2);
    awayCard.appendChild(awayLink);

    gsh.textContent = gameBasic.home_points;
    try {
        gsh.style.backgroundColor = addHue(logoLookups[gameBasic.home_team][1], 1);
        gsh.style.color = logoLookups[gameBasic.home_team][2];
    } catch(e) {
        //The try failed because a team is FCS, setting generic colors
        gsh.style.backgroundColor = "rgba(200, 200, 200, 0.7)";
        gsh.style.color = "black";
    }
    gsa.textContent = gameBasic.away_points;
    try {
        gsa.style.backgroundColor = addHue(logoLookups[gameBasic.away_team][1], 1);
        gsa.style.color = logoLookups[gameBasic.away_team][2];
    } catch(e) {
        gsa.style.backgroundColor = "rgba(200, 200, 200, 0.7)";
        gsa.style.color = "black";
    }
    document.getElementById("game-date").textContent = `${gameBasic.start_date.slice(5,7)}/${gameBasic.start_date.slice(8,10)}/${gameBasic.start_date.slice(2,4)}`

    fillGameData(game);
    for (let el of document.querySelectorAll('.game-data')) el.style.visibility = ''; //unhide stats
    showSpinner(false);
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