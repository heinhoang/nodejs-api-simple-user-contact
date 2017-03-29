const fs = require('fs');

function read_json_file() {
    let file = './data/contacts.json';
    return fs.readFileSync(file);
}

let contacts = JSON.parse(read_json_file()).result;

// get contact list
exports.list = function () {
    return JSON.parse(read_json_file());
}

// get contact by number
exports.query = function (number) {
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].primarycontactnumber === number)
            return contacts[i];
    }
    return null;
}

// get contact by args
exports.query_by_arg = function (arg, value) {
    for (let i = 0; i < contacts.length; i++) {
        var contact = contacts[i];
        if (contact[arg] === value) {
            return contact;
        }
    }
    return null;
}

// list all groups
exports.list_groups = function () {
    let groups = [];
    for (let i = 0; i < contacts.length; i++) {
        let currentGroups = contacts[i].groups;
        for (let j = 0; j < currentGroups.length; j++) {
            if (groups.indexOf(currentGroups[j]) === -1) {
                groups.push(currentGroups[j]);
            }
        }
    }
    return groups;
}

// get members by group_name
exports.get_members = function (group_name) {
    let members = [];
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].groups.indexOf(group_name) > -1)
            members.push(contacts[i]);
    }
    return members;
}
