// Change body data to contact model
function toContact(body, ContactModel) {
    return new ContactModel({
        firstname: body.firstname,
        lastname: body.lastname,
        title: body.title,
        company: body.company,
        jobtitle: body.jobtitle,
        primarycontactnumber: body.primarycontactnumber,
        primaryemailaddress: body.primaryemailaddress,
        emailaddresses: body.emailaddresses,
        groups: body.groups,
        othercontactnumbers: body.othercontactnumbers
    });
}

// Create
exports.create = function (model, reqBody, res) {
    const contact = toContact(reqBody, model);
    const primaryPhoneNumber = reqBody.primarycontactnumber;
    contact.save(function (err) {
        if (err) {
            console.log('meeting error, checking...');
            model.findOne({ primarycontactnumber: primaryPhoneNumber }, function (err, data) {
                if (err) {
                    console.log(err);
                    if (res != null) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Server Internal Error');
                        return;
                    }
                }
                if(data) {
                    console.log(`Can\'t create one more: Contact with this phone number: ${primaryPhoneNumber} is in our database`);
                    return;
                }
            });

        }
        contact.save();
        res.send('contact created');
        return;
    });
};

// Read
exports.list = function (model, req, res) {
    model.find({}, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        if (res != null) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
        }
        return JSON.stringify(data);

    });
};

// Read check end
exports.getByNumber = function (model, phoneNumber, res) {
    model.findOne({ primarycontactnumber: phoneNumber }, function (err, data) {
        if (err) {
            console.log(err);
            if (res != null) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server Internal Error');
            }
            return;
        }
        if (!data) {
            if (res != null) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('not found');
            }
            return;
        }
        if (res != null) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(data));
        }
        return;
    });
};

// Update
exports.update = function (model, reqBody, res) {
    model.findOne({ primarycontactnumber: reqBody.primarycontactnumber }, function (err, data) {
        if (err) {
            console.log(err);
            if (res != null) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end('Internal Server Error');
            }
            return;
        }
        const contact = toContact(reqBody, model);
        if (!data) {
            console.log(`there\'s no contact with primarycontactnumber: ${reqBody.primarycontactnumber}. We will create one`);
            contact.save(function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
            });
            if (res != null) {
                console.log('contact created');
            }
            return;
        }
        data.firstname = contact.firstname;
        data.lastname = contact.lastname;
        data.title = contact.title;
        data.company = contact.company;
        data.jobtitle = contact.jobtitle;
        data.primarycontactnumber = contact.primarycontactnumber;
        data.othercontactnumbers = contact.othercontactnumbers;
        data.emailaddresses = contact.emailaddresses;
        data.primaryemailaddress = contact.primaryemailaddress;
        data.groups = contact.groups;
        data.save(function (err) {
            if (err) {
                console.log('error on updating');
            }
            if (res != null) {
                res.send('Contact updated');
            }
            return;
        });
    });
};

// Delete
exports.remove = function (model, primaryPhoneNumber, res) {
    console.log('Deleting contact with primary number: ' + primaryPhoneNumber);
    model.findOne({ primarycontactnumber: primaryPhoneNumber }, function (err, data) {
        if (err) {
            console.log(err);
            if (res != null) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Error');
            }
            return;
        }
        if (!data) {
            console.log('Data not found');
            if (res != null) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not found Data');
            }
            return;
        }
        data.remove(function (err) {
            if (err) {
                console.log(err);
            }
        });
        if (res != null)
            console.log('deleted');
        return;
    });
};
