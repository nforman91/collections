exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { username: "nathanadmin", password: "collections" },
        { username: "testusername", password: "testpassword" },
      ]);
    });
};
