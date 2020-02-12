const knex = require('knex')
const app = require('../../src/app')
const helpers = require('../test-helpers')

describe.only('Nurses Endpoints', function() {
    let db

    const {
        testNurses,
        testTechs,
        testRooms,
    } = helpers.makeRoomsFixtures()

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    describe.only(`GET /api/nurses`, () => {
        context(`Given no nurses`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/nurses')
                    .expect(200, [])
            })
        })

        context('Given there are nurses in the database', () => {
            beforeEach('insert nurses', () =>
                    helpers.seedRoomsTables(
                        db,
                        testNurses,
                        testTechs,
                        testRooms,
                    )
            )

            it('responds with 200 and all of the nurses', () => {
                const expectedNurses = testNurses.map(nurse =>
                    helpers.makeExpectedNurse(
                        testNurses,
                    )
                )
                return supertest(app)
                    .get('/api/nurses')
                    .expect(200, expectedNurses)
            })
        })

    // context(`Given an XSS attack nurse`, () => {
    //   const testUser = helpers.makeUsersArray()[1]
    //   const {
    //     maliciousNurse,
    //     expectedNurse,
    //   } = helpers.makeMaliciousNurse(testUser)

    //   beforeEach('insert malicious nurse', () => {
    //     return helpers.seedMaliciousNurse(
    //       db,
    //       testUser,
    //       maliciousNurse,
    //     )
    //   })

    //   it('removes XSS attack name or nick_name', () => {
    //     return supertest(app)
    //       .get(`/api/nurses`)
    //       .expect(200)
    //       .expect(res => {
    //         expect(res.body[0].name).to.eql(expectedNurse.name)
    //         expect(res.body[0].nick_name).to.eql(expectedNurse.nick_name)
    //       })
    //   })
    // })
    })

    describe(`GET /api/nurses/:nurse_id`, () => {
        context(`Given no nurses`, () => {
            it(`responds with 404`, () => {
                const nurseId = 123456
                return supertest(app)
                    .get(`/api/nurses/${nurseId}`)
                    //.set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(404, { error: `Nurse doesn't exist` })
            })
        })

        context('Given there are nurses in the database', () => {
            beforeEach('insert nurses', () =>
                    helpers.seedRoomsTables(
                        db,
                        testNurses,
                        testTechs,
                        testRooms,
                    )
            )

            it('responds with 200 and the specified nurse', () => {
                const nurseId = 2
                const expectedNurse = helpers.makeExpectedNurse(
                    testNurse[nurseId - 1],
                )

                return supertest(app)
                    .get(`/api/nurse/${nurseId}`)
                    //.set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(200, expectedNurse)
            })
        })

        // context(`Given an XSS attack nurse`, () => {
        //     const testUser = helpers.makeUsersArray()[1]
        //     const {
        //         maliciousNurse,
        //         expectedNurse,
        //     } = helpers.makeMaliciousNurse(testUser)

        //     beforeEach('insert malicious nurse', () => {
        //         return helpers.seedMaliciousNurse(
        //             db,
        //             testUser,
        //             maliciousNurse,
        //         )
        //     })

        //     it('removes XSS attack content', () => {
        //         return supertest(app)
        //         .get(`/api/nurses/${maliciousNurse.id}`)
        //         // use the testUser seeded above
        //         .set('Authorization', helpers.makeAuthHeader(testUser))
        //         .expect(200)
        //         .expect(res => {
        //             expect(res.body.name).to.eql(expectedNurse.name)
        //             expect(res.body.nick_name).to.eql(expectedNurse.nick_name)
        //         })
        //     })
        // })
    })

    describe(`GET /api/nurses/:nurse_id/rooms`, () => {
        context(`Given no nurses`, () => {

            it(`responds with 404`, () => {
                const nurseId = 123456
                return supertest(app)
                    .get(`/api/nurses/${nurseId}/rooms`)
                    //.set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(404, { error: `Nurse doesn't exist` })
            })
        })

        context('Given there are rooms for nurse in the database', () => {
            beforeEach('insert nurses', () =>
                helpers.seedRoomsTables(
                    db,
                    testNurses,
                    testRooms,
                )
            )

            it('responds with 200 and the specified rooms', () => {
                const nurseId = 1
                const expectedRooms = helpers.makeExpectedNurseRooms(
                    testNurses, nurseId, testRooms
                )

                return supertest(app)
                    .get(`/api/nurses/${nurseId}/rooms`)
                    //.set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(200, expectedRooms)
            })
        })
    })
})