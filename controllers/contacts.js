const fs = require('fs');

function read_json_file() {
    let file = '../data/contacts.json';
    return fs.readFileSync(file);
}

// get contact list
exports.list = function() {
    return JSON.stringify(read_json_file());
}

// get contact by number
exports.query = function(number) {
    let contacts = JSON.parse(read_json_file()).result;
    for(i = 0; i < contacts.length; i++) {
        if(contacts[i].primarycontactnumber === number)
            return contacts[i];
    }
    return null;
}

// get contact by args
exports.query_by_arg = function(arg, value) {
    let contacts = JSON.parse(read_json_file()).result;
    for(i = 0; i < contacts.length; i++) {
        if(contacts[i][arg] === value)
            return contacts[i];
    }
    return null;
}

// list all groups
exports.list_groups = function() {
    let contacts = JSON.parse(read_json_file()).result;
    let groups = [];
    for(i = 0; i < contacts.length; i++) {
        let currentGroups = contacts[i];
        for(j = 0; j < currentGroups.length; j++) {
            if(groups.indexOf(currentGroups[j]) === -1) {
                groups.push(currentGroups[j]);
            }
        }
    }
    return groups;
}

// get members by group_name
exports.get_members = function(group_name) {
    let contacts = JSON.parse(read_json_file()).result;
    let members = [];
    for(i = 0; i < contacts.length; i++) {
        if(contacts[i].group[group_name] === group_name)
            members.push(contacts[i]);
    }
    return members;
}
