const bcrypt = require('bcryptjs');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Adminyarn de gobarber',
          email: 'admin@gobarber.com',
          password_hash: bcrypt.hashSync('123456', 8),
          profile: 0,
          avatar_id: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
