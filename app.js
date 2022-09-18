var birthdateInput = document.querySelector("#birth-date");
var palindromeBtn = document.querySelector("#show-btn");
var outputDiv = document.querySelector("#output");


function reverseString(str){
    var splittedStr = str.split("");
    var reversedStr = splittedStr.reverse();
    var newStr = reversedStr.join("");
    return(newStr)
}

function checkPalindrome(str){
    var reversedForm = reverseString(str);
    if(str === reversedForm){
        return true;
    }
    else{
        return false;
    }
}

function convertDateToString(date){
    var convertedDate = {day: "", month: "", year: ""};

    if(date.day < 10){
        convertedDate.day = '0' + date.day;
    }
    else{
        convertedDate.day = date.day.toString();
    }
    if(date.month < 10){
        convertedDate.month = '0' + date.month;
    }
    else{
        convertedDate.month = date.month.toString();
    }
    convertedDate.year = date.year.toString();

    return(convertedDate);
}

function dateInAllFormats(date){
    
    var dateStr = convertDateToString(date);

    var DDMMYYYY = dateStr.day + dateStr.month + dateStr.year;
    var MMDDYYYY = dateStr.month + dateStr.day + dateStr.year;
    var YYYYMMDD = dateStr.year + dateStr.month + dateStr.day;
    var DDMMYY = dateStr.day + dateStr.month + dateStr.year.slice(2);
    var MMDDYY = dateStr.month + dateStr.day + dateStr.year.slice(2);
    var YYMMDD = dateStr.year.slice(2) + dateStr.month + dateStr.day;

    return [DDMMYYYY, MMDDYYYY, YYYYMMDD, DDMMYY, MMDDYY, YYMMDD];

}

function palindromeCheckForAllDateFmt(date){
    var listOfPalindromes = dateInAllFormats(date);

    var newArr = [];

    for(var idx = 0; idx < listOfPalindromes.length; idx++){
        var flag = false;
        if(checkPalindrome(listOfPalindromes[idx])){
            flag = true;
            newArr.push(flag);
        }
        else{
            newArr.push(flag);
        }
    }
    return newArr;
    
}

function isLeapYear(Year){
    if(Year%400 === 0){
        return true;
    }
    if(Year%100 === 0){
        return false;
    }
    if(Year%4 === 0){
        return true;
    }
    return false;
}

function nextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    if(month === 2){
        if(isLeapYear(year)){
            if(day > 29){
                day = 1;
                month++;
            }
            else{
            if(day > 28){
                day = 1;
                month++;
            }
        }
        }
    }
    else{
        if(day > daysInMonth[month-1]){
            day = 1;
            month++;
        }
        if(month > 12){
            month = 1;
            year++;
        }
    }
    return {Day: day,
            Month: month,
            Year: year
        };
}

function nextPalindromeDate(date){
    var nextdate = nextDate(date);
    var cnt = 0;

    while(1){
        cnt++;
        var dateStr = convertDateToString(nextdate);
        var dateList = palindromeCheckForAllDateFmt(dateStr);

        for(var i = 0; i < dateList.length; i++){
            if(dateList[i]){
                return [cnt, nextdate];
            }
        }
        nextdate = nextDate(nextdate);
    }
}

function clickEventHandler(){
    var birthDate = birthdateInput.value.split("-");
    var bday = {day: Number(birthDate[2]),
                month: Number(birthDate[1]),
                year: Number(birthDate[0])}
    var dateStr = convertDateToString(bday);
    var dateList = palindromeCheckForAllDateFmt(dateStr);
    var ispalindrome = false;
    for(var idx = 0; idx < dateList.length; idx++){
        if(dateList[idx]){
            ispalindrome = true;
            break;
        }
    }
    if(!ispalindrome){
        var [cnt1, nextDate] = nextPalindromeDate(date);

        outputDiv.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${cnt1} days.`;
    }
    else{
        outputDiv.innerText = 'Yay! Your birthday is palindrome!'
    }
    // var dateCheck = {
    //     day: 23,
    //     month: 11,
    //     year: 2022
    // }
    // convertDateToString(dateCheck)
    // var input = prompt("Enter String");
    // var palindromeCheck = checkPalindrome(input);
    // console.log(palindromeCheck);
}


palindromeBtn.addEventListener("click", clickEventHandler);