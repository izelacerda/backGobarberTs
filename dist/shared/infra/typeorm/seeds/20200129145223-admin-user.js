"use strict";

const bcrypt = require('bcryptjs');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert('users', [{
      name: 'Adminyarn de FastFeet',
      email: 'admin@fastfeet.com',
      password_hash: bcrypt.hashSync('123456', 8),
      profile: 0,
      avatar_id: null,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },
  down: () => {}
};