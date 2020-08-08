
        var myStorage = window.localStorage;
        var dateTimeDisplay = document.getElementById("dateDisplay");
        var countryListArray = [];
        var slugListArray = [];
        window.addEventListener("load", function () {
            displayDate();
            displayList();
            displayOptions();
        });

        function displayDate() {
            dateTimeDisplay.textContent = new Date();
        }

        function displayOptions() {
            var select = document.getElementById("selectCountry");
            var xhrSelect = new XMLHttpRequest();
            var categoryUrl = "https://api.covid19api.com/countries"
            xhrSelect.open("GET", categoryUrl);
            xhrSelect.send();
            xhrSelect.onload = function () {
                var response = JSON.parse(this.response);
                // console.log(response);
                response.sort();
                for (var i = 0; i < response.length; i++) {
                    // console.log(response[i])
                    countryListArray.push(response[i].Country);
                    slugListArray.push(response[i].Slug);
                }
                slugListArray.sort();
                // console.log(slugListArray);
                countryListArray.sort();
                // console.log(countryListArray);
                for (var j = 0; j < countryListArray.length; j++) {
                    var option = document.createElement("option");
                    // console.log(countryListArray[j])
                    option.textContent = countryListArray[j];
                    select.append(option);
                }
            }
            // console.log(countryListArray)
        }

        function displayList() {
            var displayUl = document.getElementById("listUl");
            var listXhr = new XMLHttpRequest();
            var listURL = "https://api.covid19api.com/countries"
            listXhr.open("GET", listURL);
            listXhr.send();
            listXhr.onload = function () {
                var response = JSON.parse(this.response);
                // console.log(response);
                response.sort(compare);
                //sort function
                function compare(a, b) {
                    const var1 = a.Country.toUpperCase();
                    const var2 = b.Country.toUpperCase();
                    var count = 0;
                    if (var1 > var2) {
                        count = 1;
                    } else {
                        count = -1;
                    }
                    return count;
                }
                console.log(response);
                for (var i = 0; i < response.length; i++) {
                    var listDiv = document.createElement("div");
                    listDiv.setAttribute("class", "list-group-item d-flex w-100 justify-content-between");
                    var heading = document.createElement("p");
                    heading.textContent = response[i].Country;
                    var countryCode = response[i].ISO2; //getting Country Code
                    // console.log(countryCode);
                    var countryBtn = document.createElement("button");
                    countryBtn.setAttribute("id", response[i].Slug);
                    countryBtn.setAttribute("class", "list-group-item");
                    countryBtn.setAttribute("name", response[i].ISO2)
                    countryBtn.setAttribute("class", "btn btn-secondary")
                    countryBtn.textContent = "Get Data";
                    listDiv.append(heading, countryBtn);
                    displayUl.append(listDiv);
                    countryBtn.addEventListener("click", function () {
                        nextPageFunction(this.id, this.name);
                    });
                }
            }
            //addCountryListener();
        }

        function nextPageFunction(key, cc) {
            // var countryDiv = document.getElementById("countryViewDiv");
            // var buttonList = document.querySelectorAll("button");
            // console.log(buttonList);
            // Array.from(buttonList).forEach(function(item){
            //     // console.log(item);
            // });
            console.log("id is", key);
            var jsonKey = JSON.stringify(key);
            var jsonCc = JSON.stringify(cc);
            myStorage.setItem("key", jsonKey);
            myStorage.setItem("cc", jsonCc);
            alert("Moving to next page");
            window.location.href = "covid19CountryPage.html";
        }