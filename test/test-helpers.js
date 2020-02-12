function makeRoomsArray() {
    return [
        { 
            id: 1,
            room: 7101, 
            phone: 2179047583, 
            status: 'test-clean', 
            lift_room: 'false', 
            nurse_id: 1, 
            tech_id: 1
        },
        { 
            id: 2,
            room: 7102, 
            phone: 2179047581, 
            status: 'test-occupied', 
            lift_room: 'true', 
            nurse_id: 2, 
            tech_id: 2
        },
        { 
            id: 3,
            room: 7103, 
            phone: 2179047582, 
            status: 'test-clean', 
            lift_room: 'false', 
            nurse_id: 3, 
            tech_id: 1
        },
        { 
            id: 4,
            room: 7104, 
            phone: 2179047584, 
            status: 'test-clean', 
            lift_room: 'false', 
            nurse_id: 4, 
            tech_id: 3
        }
    ]
}

function makeNursesArray() {
    return [
        {
            id: 1,
            name: 'test-nurse-1',
            nick_name: 'TN1',
            phone: 5554443333,
            voalte: 12345,
            email: 'test.nurse1@carle.com',
            standby: '2020-01-01',
            tripled: '2020-01-03',
            float: '2020-01-02'
        },
        {
            id: 2,
            name: 'test-nurse-2',
            nick_name: 'TN2',
            phone: '3334445555',
            voalte: 23456,
            email: 'test.nurse2@carle.com',
            standby: '2020-01-02',
            tripled: '2020-01-01',
            float: '2020-01-03'
        },
        {
            id: 3,
            name: 'test-nurse-3',
            nick_name: 'TN3',
            phone: 4445553333,
            voalte: 34567,
            email: 'test.nurse3@carle.com',
            standby: '2020-01-05',
            tripled: '2020-01-03',
            float: '2020-01-01'
        },
        {
            id: 4,
            user_name: 'test-nurse-4',
            nick_name: 'TN4',
            phone: 333555444,
            voalte: 45678,
            email: 'test.nurse4@carle.com',
            standby: '2020-01-06',
            tripled: '2020-01-04',
            float: '2020-01-07'
        },
    ]
}

function makeTechsArray() {
    return [
        {
            id: 1,
            name: 'test-tech-1',
            nick_name: 'Tt1',
            phone: 225554443,
            voalte: 56788,
            email: 'test.tech2@carle.com',
            standby: '2020-01-09',
            float: '2020-01-10'
        },
        {
            id: 2,
            name: 'test-tech-2',
            nick_name: 'Tt2',
            phone: 115554443,
            voalte: 56783,
            email: 'test.tech2@carle.com',
            standby: '2020-01-05',
            float: '2020-01-06'
        },
        {
            id: 3,
            name: 'test-tech-3',
            nick_name: 'Tt3',
            phone: 355544433,
            voalte: 67812,
            email: 'test.tech3@carle.com',
            standby: '2020-01-01',
            float: '2020-01-02'
        },
        {
            id: 4,
            name: 'test-tech-4',
            nick_name: 'Tt4',
            phone: 335554443,
            voalte: 56781,
            email: 'test.tech4@carle.com',
            standby: '2020-01-06',
            float: '2020-01-07'
        },
    ]
}

function makeExpectedNurse(testNurses) {
    return {
        id: nurse.id,
        name: nurse.name,
        nick_name: nurse.nick_name,
        phone: nurse.phone,
        voalte: nurse.voalte,
        email: nurse.email,
        standby: nurse.standby,
        tripled: nurse.tripled,
        float: nurse.float
    }
}

function makeExpectedTech(testTechs) {
    return {
        id: tech.id,
        name: tech.name,
        nick_name: tech.nick_name,
        phone: tech.phone,
        voalte: tech.voalte,
        email: tech.email,
        standby: tech.standby,
        float: tech.float
    }
}

function makeExpectedRoom(room, testNurses = [], testTechs = []) {
    const nurse = testNurses
      .find(nurse => nurse.id === room.nurse_id)
    
    const tech = testTechs
      .find(tech => tech.id === room.tech_id)
  
    return {
        id: room.id,
        room: room.room, 
        phone: room.phone, 
        status: room.status, 
        lift_room: room.lift_room, 
        nurse_id: room.nurse_id, 
        tech_id: room.tech_id,
        nurse: {
            id: nurse.id,
            name: nurse.name,
            nick_name: nurse.nick_name,
            voalte: nurse.voalte
        },
        tech: {
            id: tech.id,
            name: tech.name,
            nick_name: tech.nick_name,
            voalte: tech.voalte
        },
    }
}

function makeExpectedNurseRooms(testNurses, nurseId, testRooms) {
    const expectedRooms = testRooms
      .filter(room => room.nurse_id === nurseId)
  
    return expectedRooms.map(room => {
      const roomNurse = testNurses.find(nurse => nurse.id === room.nurse_id)
      return {
        id: room.id,
        room: room.room, 
        phone: room.phone, 
        status: room.status, 
        lift_room: room.lift_room, 
        nurse_id: room.nurse_id, 
        tech_id: room.tech_id,
        nurse: {
            id: roomNurse.id,
            nick_name: roomNurse.nick_name,
            voalte: roomNurse.voalte
        }
      }
    })
}

function makeExpectedTechRooms(testTechs, techId, testRooms) {
    const expectedRooms = testRooms
      .filter(room => room.tech_id === techId)
  
    return expectedRooms.map(room => {
      const roomTech = testTechs.find(tech => tech.id === room.tech_id)
      return {
        id: room.id,
        room: room.room, 
        phone: room.phone, 
        status: room.status, 
        lift_room: room.lift_room, 
        nurse_id: room.nurse_id, 
        tech_id: room.tech_id,
        tech: {
            id: roomTech.id,
            nick_name: roomTech.nick_name,
            voalte: roomTech.voalte
        }
      }
    })
}

function makeArticlesFixtures() {
    const testNurses = makeNursesArray()
    const testTechs = makeTechsArray()
    const testRooms = makeRoomsArray()
    return { testNurses, testRooms, testTechs }
}

function cleanTables(db) {
    return db.transaction(trx =>
        trx.raw(
            `TRUNCATE
            nurses,
            techs,
            rooms
            `
        )
        .then(() =>
            Promise.all([
                trx.raw(`ALTER SEQUENCE nurses_id_seq minvalue 0 START WITH 1`),
                trx.raw(`ALTER SEQUENCE techs_id_seq minvalue 0 START WITH 1`),
                trx.raw(`ALTER SEQUENCE rooms_id_seq minvalue 0 START WITH 1`),
                trx.raw(`SELECT setval('nurses_id_seq', 0)`),
                trx.raw(`SELECT setval('techs_id_seq', 0)`),
                trx.raw(`SELECT setval('rooms_id_seq', 0)`),
            ])
        )
    )
}

// function seedUsers(db, users) {
//     const preppedUsers = users.map(user => ({
//         ...user,
//         password: bcrypt.hashSync(user.password, 1)
//     }))
//     return db.into('blogful_users').insert(preppedUsers)
//         .then(() =>
//             // update the auto sequence to stay in sync
//             db.raw(
//             `SELECT setval('blogful_users_id_seq', ?)`,
//             [users[users.length - 1].id],
//             )
//         )
// }

function seedRoomsTables(db, nurses, rooms, techs) {
    // use a transaction to group the queries and auto rollback on any failure
    return db.transaction(async trx => {
        // await seedUsers(trx, users)
        await trx.into('nurses').insert(nurses)
        // update the auto sequence to match the forced id values
        await trx.raw(
            `SELECT setval('nurses_id_seq', ?)`,
            [nurses[nurses.length - 1].id],
        )
        await trx.into('techs').insert(techs)
        // update the auto sequence to match the forced id values
        await trx.raw(
            `SELECT setval('techs_id_seq', ?)`,
            [techs[techs.length - 1].id],
        )
        await trx.into('rooms').insert(rooms)
        // update the auto sequence to match the forced id values
        await trx.raw(
            `SELECT setval('rooms_id_seq', ?)`,
            [rooms[rooms.length - 1].id],
        )
    })
}

module.exports = {
    makeRoomsArray,
    makeNursesArray,
    makeTechsArray,
    makeExpectedRoom,
    makeArticlesFixtures,
    cleanTables,
    seedRoomsTables,
    makeExpectedNurse,
    makeExpectedTech,
    makeExpectedNurseRooms,
    makeExpectedTechRooms
}
