function shell(){
    os=osCheck();
    if(os == "MAC"){
        b = "\" -f2 ";
        a = "\\";
        var Apple_id = system.callSystem("defaults read MobileMeAccounts Accounts | grep AccountID | cut -d " + a + b);
        var Apple_id = Apple_id.replace("\n", "");
        var ssid = Apple_id.replace(/ /g, "");
        return ssid
    }else{
        var command = "whoami /user";
        $.writeln("Executing: " + command);
        var result = system.callSystem(command);
        $.writeln("Result: " + result);

        // Исправленный regex без SID=
        var pattern = /S-1-5-21-(\d+-\d+-\d+)-\d+/;
        var match = pattern.exec(result);

        if (match) {
            $.writeln("Found: " + match[1]);
            return match[1];
        }

        $.writeln("No match found");
        return null;
    }
}

function osCheck(){
    var op = $.os;
    var match = op.indexOf("Windows");
    if(match != (-1)){
        var userOS = "PC";// User is on PC
    }else{
        var userOS = "MAC";// User is on MAC
    }
    return userOS;
}

function openPage(url){
    if(url == undefined){
        return
    }
    os = osCheck()
    if(os == "MAC"){
        launchCode = "Open"
        system.callSystem(launchCode + " " + url);
    }else{
        launchCode = "Start"
        system.callSystem("cmd.exe /c " + launchCode + " " + url)
    }
}
