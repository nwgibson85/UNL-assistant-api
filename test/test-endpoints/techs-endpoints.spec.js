const knex = require('knex')
const app = require('../../src/app')
const helpers = require('../test-helpers')

describe('Techs Endpoints', function() {
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

    describe(`GET /api/techs`, () => {
        context(`Given no techs`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/techs')
                    .expect(200, [])
            })
        })

        context('Given there are techs in the database', () => {
            beforeEach('insert techs', () =>
                    helpers.seedRoomsTables(
                        db,
                        testNurses,
                        testTechs,
                        testRooms,
                    )
            )

            it('responds with 200 and all of the techs', () => {
                const expectedTechs = testTechs.map(tech =>
                    helpers.makeExpectedTech(
                        testTechs,
                    )
                )
                return supertest(app)
                    .get('/api/techs')
                    .expect(200, expectedTechs)
            })
        })

    // context(`Given an XSS attack tech`, () => {
    //   const testUser = helpers.makeUsersArray()[1]
    //   const {
    //     maliciousTech,
    //     expectedTech,
    //   } = helpers.makeMaliciousTech(testUser)

    //   beforeEach('insert malicious tech', () => {
    //     return helpers.seedMaliciousTech(
    //       db,
    //       testUser,
    //       maliciousTech,
    //     )
    //   })

    //   it('removes XSS attack content', () => {
    //     return supertest(app)
    //       .get(`/api/techs`)
    //       .expect(200)
    //       .expect(res => {
    //         expect(res.body[0].name).to.eql(expectedTech.name)
    //         expect(res.body[0].nick_name).to.eql(expectedTech.nick_name)
    //       })
    //   })
    // })
    })

    describe(`GET /api/techs/:tech_id`, () => {
        context(`Given no techs`, () => {
            it(`responds with 404`, () => {
                const techId = 123456
                return supertest(app)
                    .get(`/api/techs/${techId}`)
                    //.set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(404, { error: `Tech doesn't exist` })
            })
        })

        context('Given there are techs in the database', () => {
            beforeEach('insert techs', () =>
                    helpers.seedRoomsTables(
                        db,
                        testNurses,
                        testTechs,
                        testRooms,
                    )
            )

            it('responds with 200 and the specified tech', () => {
                const techId = 2
                const expectedTech = helpers.makeExpectedTech(
                    testTech[techId - 1],
                )

                return supertest(app)
                    .get(`/api/techs/${techId}`)
                    //.set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(200, expectedTech)
            })
        })

        // context(`Given an XSS attack tech`, () => {
        //     const testUser = helpers.makeUsersArray()[1]
        //     const {
        //         maliciousTech,
        //         expectedTech,
        //     } = helpers.makeMaliciousTech(testUser)

        //     beforeEach('insert malicious tech', () => {
        //         return helpers.seedMaliciousTech(
        //             db,
        //             testUser,
        //             maliciousTech,
        //         )
        //     })

        //     it('removes XSS attack content', () => {
        //         return supertest(app)
        //         .get(`/api/techs/${maliciousTech.id}`)
        //         // use the testUser seeded above
        //         .set('Authorization', helpers.makeAuthHeader(testUser))
        //         .expect(200)
        //         .expect(res => {
        //             expect(res.body.name).to.eql(expectedTech.name)
        //             expect(res.body.nick_name).to.eql(expectedTech.nick_name)
        //         })
        //     })
        // })
    })

    describe(`GET /api/techs/:tech_id/rooms`, () => {
        context(`Given no techs`, () => {

            it(`responds with 404`, () => {
                const techId = 123456
                return supertest(app)
                    .get(`/api/techs/${techId}/rooms`)
                    //.set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(404, { error: `Tech doesn't exist` })
            })
        })

        context('Given there are rooms for tech in the database', () => {
            beforeEach('insert techs', () =>
                helpers.seedRoomsTables(
                    db,
                    testTechs,
                    testRooms,
                )
            )

            it('responds with 200 and the specified rooms', () => {
                const techId = 1
                const expectedRooms = helpers.makeExpectedTechRooms(
                    testTechs, techId, testRooms
                )

                return supertest(app)
                    .get(`/api/techs/${testId}/rooms`)
                    //.set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(200, expectedRooms)
            })
        })
    })
})