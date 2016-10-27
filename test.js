var expect = require('chai').expect;
var request = require('request');
var exists = require('file-exists');
var isPalindrome = require('is-palindrome');

require('dotenv').config({
    silent: true
})


var port = process.env.port || 3000,
    host = process.env.host || process.env.ip || 'localhost',
    url = `http://${host}:${port}`,
    fileExists = (file) => {
        it(`${file}... ok`, (done) => {
            if (exists(file)) {
                done()
            }
        });

    },
    moduleExists = (name) => {
        it(`${name}... ok`, (done) => {
            if (require(name)) {
                done()
            }
        });
    }

describe("Modules", () => {

    describe("The modules are there?", () => {
        ['express', 'is-palindrome', 'dotenv'].map(moduleExists)
    })

    describe("is-palindrome module work?", () => {

        it("is-palindrome... ok", (done) => {
            try {
                isPalindrome("ABA")
                done()
            }
            catch (err) {
                done(err)
            }
        });
    });
});

describe("Static files", () => {

    describe("Assets", () => {
        ['./assets/js/app.js', './assets/styl/styles.styl', './assets/images/bg1.jpg'].map(fileExists)
    });

    describe("Modules", () => {
        ['node_modules/vue/dist/vue.min.js', 'node_modules/jquery-ajax/jquery.min.js', './node_modules/bootswatch/paper/bootstrap.min.css'].map(fileExists)
    });

    describe("Public", () => {
        ['./public/js/scripts.js', './public/css/styles.css', './public/images/bg1.jpg'].map(fileExists)
    });

});

describe("Application", () => {

    describe("The application is running?", () => {
        it("Yes!", (done) => {
            request(url, (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                done();

                if (response.statusCode == 200) {
                    describe("Palindrome query this ok?", () => {

                        describe("\"ABA\" is Palindrome?", () => {

                            it("Yes!", (done) => {
                                request(url + '/palindrome?word=aba', (error, response, body) => {
                                    expect(response.statusCode).to.equal(200);
                                    done();
                                });
                            });

                        });
                        
                        describe("\"BRAZIL\" is Palindrome?", () => {

                            it("No!", (done) => {
                                request(url + '/palindrome?word=brazil', (error, response, body) => {
                                    expect(response.statusCode).to.equal(400);
                                    done();
                                });
                            });

                        });

                    });
                }
            });
        });
    });
    
});
