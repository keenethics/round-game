/* global UserStatus */

UserStatus.events.on('connectionLogin', (fields) => {
  console.log(`Login: ${fields.userId}`);
});

UserStatus.events.on('connectionLogout', (fields) => {
  console.log(`Logout: ${fields.userId}`);
});
